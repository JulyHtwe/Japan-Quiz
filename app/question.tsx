import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  Image,
  Pressable,
  BackHandler,
  Dimensions,
  PixelRatio,
} from "react-native";
import { useFonts } from "expo-font";
import { Audio } from "expo-av";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useQuizResult } from "../components/quizResultContext";

// Responsive
const { width, height } = Dimensions.get("window");
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;
const scale = (size: number) => (width / BASE_WIDTH) * size;
const verticalScale = (size: number) => (height / BASE_HEIGHT) * size;
export const scaleFont = (size: number) => {
  const scale = width / BASE_WIDTH;
  const adjusted =
    width < 350 ? scale * 0.85 : width < 400 ? scale * 0.95 : scale;
  return Math.round(PixelRatio.roundToNearestPixel(size * adjusted));
};

type Category = "Animals" | "Numbers" | "Countries" | "Foods" | "Hiragana";

type QuizItem = {
  name: string;
  image: string;
  audio: string;
};
type HiraganaItem = {
  hiragana: string;
  romaji: string;
};
const JSON_URL =
  "https://raw.githubusercontent.com/JulyHtwe/japan_quiz/main/quiz.json";
const HIRAGANA_URL =
  "https://raw.githubusercontent.com/JulyHtwe/japan_quiz/main/hiragana.json";
const IMAGE_BASE_URL =
  "https://raw.githubusercontent.com/JulyHtwe/japan_quiz/main/images/";
const AUDIO_BASE_URL =
  "https://raw.githubusercontent.com/JulyHtwe/japan_quiz/main/audio/";

const TOTAL_QUESTIONS = 10;
const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);

export default function QuestionScreen() {
  const router = useRouter();
  const { addResult } = useQuizResult();

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
  const [quizList, setQuizList] = useState<QuizItem[]>([]);
  const [hiraganaList, setHiraganaList] = useState<HiraganaItem[]>([]);
  const [question, setQuestion] = useState<QuizItem | HiraganaItem | null>(
    null,
  );
  const [options, setOptions] = useState<(QuizItem | HiraganaItem)[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  const [fontLoaded] = useFonts({
    Kavoon: require("../assets/fonts/Kavoon-Regular.ttf"),
    Margarine: require("../assets/fonts/Margarine-Regular.ttf"),
  });

  const isHiragana = category === "Hiragana";
  useEffect(() => {
    const backAction = () => true;
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  // fetch data
  useEffect(() => {
    if (isHiragana) {
      fetch(HIRAGANA_URL)
        .then((res) => res.json())
        .then((data: HiraganaItem[]) =>
          setHiraganaList(shuffle(data).slice(0, TOTAL_QUESTIONS)),
        );
    } else {
      fetch(JSON_URL)
        .then((res) => res.json())
        .then((data: Record<string, QuizItem[]>) =>
          setQuizList(shuffle(data[category]).slice(0, TOTAL_QUESTIONS)),
        );
    }
  }, [category]);

  useEffect(() => {
    if (isHiragana && hiraganaList.length) {
      const correct = hiraganaList[currentIndex];
      const wrong = shuffle(
        hiraganaList.filter((i) => i.romaji !== correct.romaji),
      ).slice(0, 3);

      setQuestion(correct);
      setOptions(shuffle([...wrong, correct]));
      setSelected(null);
    }

    if (!isHiragana && quizList.length) {
      const correct = quizList[currentIndex];
      const wrong = shuffle(
        quizList.filter((i) => i.image !== correct.image),
      ).slice(0, 3);

      setQuestion(correct);
      setOptions(shuffle([...wrong, correct]));
      setSelected(null);
    }
  }, [hiraganaList, quizList, currentIndex]);

  //Audio
  const playAudio = async () => {
    if (!question || !("image" in question)) return;

    try {
      const { sound } = await Audio.Sound.createAsync({
        uri: AUDIO_BASE_URL + question.audio,
      });
      await sound.playAsync();
    } catch (err) {
      console.log("Audio error:", err);
    }
  };

  if (!fontLoaded || !question) {
    return (
      <View style={styles.loading}>
        <Text style={{ fontFamily: "Kavoon" }}>Loading...</Text>
      </View>
    );
  }
  // progress bar
  const progressPercent = ((currentIndex + 1) / TOTAL_QUESTIONS) * 100;

  return (
    <ImageBackground
      source={require("../assets/images/bg_3.png")}
      style={styles.bgImage}
    >
      <Text style={styles.question_no}>
        Question {currentIndex + 1} of {TOTAL_QUESTIONS}
      </Text>

      {/* Progress */}
      <View style={styles.progressBg}>
        <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
      </View>

      {/* Title */}
      <View style={[styles.complete_btn, { marginTop: "30%" }]}>
        <Text
          style={[
            styles.cat_middleText,
            { color: "black", fontSize: scaleFont(30) },
          ]}
        >
          What does this {isHiragana ? "Hiragana" : "Japanese word"} mean?
        </Text>
      </View>

      {/* Question Text */}
      <Text style={styles.word}>
        {"hiragana" in question ? question.hiragana : question.name}
      </Text>

      {/* Audio Button */}
      {"image" in question && (
        <Pressable style={styles.soundBtn} onPress={playAudio}>
          <Image
            source={require("../assets/images/volume.png")}
            style={{
              width: scale(30),
              height: scale(30),
            }}
          />
          <Text style={styles.middleText}> Hear it!</Text>
        </Pressable>
      )}

      {/* Answers */}
      <View style={styles.answerContainer}>
        {options.map((item, idx) => {
          const id = "image" in item ? item.image : item.romaji;
          return (
            <Pressable
              key={idx}
              onPress={() => setSelected(id)}
              style={({ pressed }) => [
                // base style only contains things that are always the same
                {
                  width: scale(80),
                  height: scale(80),
                  borderRadius: scale(40),
                  justifyContent: "center",
                  alignItems: "center",
                  transform: [{ scale: pressed ? 0.97 : 1 }],
                  backgroundColor: "white", // default background, overridden by selected/unselected
                },
                // conditional styles
                selected === id
                  ? styles.selectedCircle
                  : styles.unselectedCircle,
              ]}
            >
              {"hiragana" in item ? (
                <Text
                  style={{
                    fontSize: scaleFont(25),
                    fontFamily: "Kavoon",
                  }}
                >
                  {item.romaji}
                </Text>
              ) : (
                <Image
                  source={{ uri: IMAGE_BASE_URL + item.image }}
                  style={{ width: scale(60), height: scale(60) }}
                />
              )}
            </Pressable>
          );
        })}
      </View>

      {/* Confirm Button */}
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

          const correctAnswer =
            "image" in question ? question.image : question.romaji;

          const isCorrect = selected === correctAnswer;

          const newScore = isCorrect ? currentScore + 1 : currentScore;

          addResult({
            question: "name" in question ? question.name : question.hiragana,
            options: options.map((o) => ("image" in o ? o.image : o.romaji)),
            correctAnswer,
            correctAudio: "image" in question ? question.audio : "",
            selectedAnswer: selected,
            isCorrect,
          });

          router.replace({
            pathname: isCorrect ? "/correct" : "/incorrect",
            params: {
              name: "name" in question ? question.name : question.hiragana,
              romaji: "romaji" in question ? question.romaji : "",
              image: "image" in question ? question.image : "",
              audio: "audio" in question ? question.audio : "",
              category,
              index: currentIndex.toString(),
              score: newScore,
              total: TOTAL_QUESTIONS.toString(),
            },
          });
        }}
      >
        <Text style={[styles.middleText, { fontSize: scaleFont(30) }]}>
          Confirm
        </Text>
      </Pressable>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bgImage: { flex: 1 },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  question_no: {
    marginTop: verticalScale(60),
    marginLeft: scale(35),
    fontFamily: "Kavoon",
    fontSize: scaleFont(20),
  },
  progressBg: {
    width: "80%",
    height: verticalScale(10),
    backgroundColor: "#eee",
    borderRadius: 10,
    marginTop: verticalScale(10),
    alignSelf: "center",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FFE066",
    borderRadius: 10,
  },
  word: {
    fontSize: scaleFont(60),
    fontFamily: "Kavoon",
    textAlign: "center",
    marginTop: verticalScale(20),
  },
  soundBtn: {
    flexDirection: "row",
    marginTop: verticalScale(20),
    padding: scale(10),
    backgroundColor: "white",
    borderRadius: 20,
    width: scale(130),
    alignSelf: "center",
    marginBottom: verticalScale(30),
  },
  answerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: verticalScale(30),
  },
  circle: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    // elevation: 5,
  },
  selectedCircle: {
    backgroundColor: "#f0f0f0",
    borderColor: "pink",
    borderWidth: 3,
    // elevation: 10,
  },
  unselectedCircle: {
    backgroundColor: "white",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    // elevation:1
  },
  btn: {
    marginTop: verticalScale(50),
    width: scale(250),
    height: verticalScale(80),
    backgroundColor: "white",
    borderColor: "pink",
    borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(50),
    alignSelf: "center",
  },
  middleText: {
    fontFamily: "Kavoon",
    fontSize: scaleFont(20),
    textAlign: "center",
  },
  complete_btn: {
    flexDirection: "row",
    width: scale(329),
    height: verticalScale(120),
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(75),
    alignSelf: "center",
  },
  cat_middleText: {
    fontSize: scaleFont(35),
    color: "white",
    fontFamily: "Margarine",
    textShadowRadius: 8,
    textAlign: "center",
  },
});
