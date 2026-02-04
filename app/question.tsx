import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import { useFonts } from "expo-font";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { useQuizResult } from "../components/quizResultContext";

type Category = "Animals" | "Numbers" | "Countries" | "Foods";
type QuizItem = { name: string; image: string; audio: string };
type QuizData = Record<Category, QuizItem[]>;

const JSON_URL =
  "https://raw.githubusercontent.com/JulyHtwe/japan_quiz/main/quiz.json";
const IMAGE_BASE_URL =
  "https://raw.githubusercontent.com/JulyHtwe/japan_quiz/main/images/";
const AUDIO_BASE_URL =
  "https://raw.githubusercontent.com/JulyHtwe/japan_quiz/main/audio/";

const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);

export default function QuestionScreen() {
  const router = useRouter();
  const {
    category,
    index = "0",
    score = "0",
  } = useLocalSearchParams<{
    category: Category;
    index?: string;
    score?: string;
  }>();

  const currentIndex = Number(index);
  const currentScore = Number(score);
  const TOTAL_QUESTIONS = 10;
  const [quizList, setQuizList] = useState<QuizItem[]>([]);
  const [question, setQuestion] = useState<QuizItem | null>(null);
  const [options, setOptions] = useState<QuizItem[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  const [fontLoaded] = useFonts({
    Kavoon: require("../assets/fonts/Kavoon-Regular.ttf"),
    Margarine: require("../assets/fonts/Margarine-Regular.ttf"),
  });
  const { addResult } = useQuizResult();

  useEffect(() => {
    fetch(JSON_URL)
      .then((res) => res.json())
      .then((data: QuizData) => {
        setQuizList(shuffle(data[category]).slice(0, 10));
      });
  }, []);

  useEffect(() => {
    if (!quizList.length) return;

    const correct = quizList[currentIndex];
    const wrong = shuffle(
      quizList.filter((i) => i.image !== correct.image),
    ).slice(0, 3);

    setQuestion(correct);
    setOptions(shuffle([...wrong, correct]));
    setSelected(null);
  }, [quizList, currentIndex]);

  const playAudio = async () => {
    if (!question) return;
    const { sound } = await Audio.Sound.createAsync({
      uri: AUDIO_BASE_URL + question.audio,
    });
    await sound.playAsync();
  };

  if (!fontLoaded || !question) {
    return (
      <View style={styles.loading}>
        <Text style={{ fontFamily: "Kavoon", fontSize: 20 }}>Loading...</Text>
      </View>
    );
  }
  const progressPercent = ((currentIndex + 1) / 10) * 100;

  return (
    <ImageBackground
      source={require("../assets/images/bg_3.png")}
      style={styles.bgImage}
    >
      <Text style={styles.question_no}>Question {currentIndex + 1} of 10</Text>

      {/* Progress Bar */}
      <View style={styles.progressBg}>
        <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
      </View>

      <View style={[styles.complete_btn, { marginTop: "30%" }]}>
        <Text style={[styles.cat_middleText, { color: "black", fontSize: 30 }]}>
          What does this japanese word mean?
        </Text>
      </View>

      <Text style={styles.word}>{question.name}</Text>

      <Pressable style={styles.soundBtn} onPress={playAudio}>
        <Image
          source={require("../assets/images/volume.png")}
          style={{ width: 30, height: 30 }}
        ></Image>
        <Text style={styles.middleText}> Hear it!</Text>
      </Pressable>

      <View style={styles.answerContainer}>
        {options.map((item) => (
          <Pressable
            key={item.image}
            style={[
              styles.circle,
              selected === item.image && {
                backgroundColor: "gray",
                borderColor: "pink",
                borderWidth: 3,
              },
            ]}
            onPress={() => setSelected(item.image)}
          >
            <Image
              source={{ uri: IMAGE_BASE_URL + item.image }}
              style={{ width: 60, height: 60 }}
            />
          </Pressable>
        ))}
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.btn,
          {
            backgroundColor: pressed ? "#ffe6f0" : "white",
            transform: [{ scale: pressed ? 0.97 : 1 }],
          },
        ]}
        disabled={!selected}
        onPress={() => {
          if (!question || !selected) return;

          const isCorrect = selected === question.image;
          const newScore = isCorrect ? currentScore + 1 : currentScore;

          addResult({
            question: question.name,
            options: options.map((o) => o.image),
            correctAnswer: question.image,
            correctAudio: question.audio,
            selectedAnswer: selected,
            isCorrect,
          });
          router.replace({
            pathname: isCorrect ? "/correct" : "/incorrect",
            params: {
              name: question.name,
              image: question.image,
              audio: question.audio,
              category,
              index: currentIndex.toString(),
              score: newScore,
              total: TOTAL_QUESTIONS.toString(),
            },
          });
        }}
      >
        <Text style={[styles.middleText, { fontSize: 30 }]}>Comfirm</Text>
      </Pressable>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  bgImage: { flex: 1 },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  question_no: {
    marginTop: 60,
    fontFamily: "Kavoon",
    fontSize: 20,
    marginLeft: 35,
  },
  progressBg: {
    width: "80%",
    height: 10,
    backgroundColor: "#eee",
    borderRadius: 10,
    marginTop: 10,
    alignSelf: "center",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FFE066",
    borderRadius: 10,
  },
  word: {
    fontSize: 60,
    fontFamily: "Kavoon",
    textAlign: "center",
    marginTop: 20,
  },
  soundBtn: {
    flexDirection: "row",
    marginTop: 20,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 20,
    width: 130,
    alignSelf: "center",
    marginBottom: 30,
  },
  answerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  btn: {
    // position: "absolute",
    // bottom: 70,
    marginTop:50,
    width: 250,
    height: 80,
    backgroundColor: "white",
    borderColor: "pink",
    borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    alignSelf: "center",
  },
  middleText: { fontFamily: "Kavoon", fontSize: 20, textAlign: "center" },
  complete_btn: {
    flexDirection: "row",
    gap: 30,
    width: 329,
    height: 120,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 75,
    alignSelf: "center",
  },
  cat_middleText: {
    fontSize: 35,
    color: "white",
    fontFamily: "Margarine",
    textShadowRadius: 8,
    textAlign: "center",
  },
});
