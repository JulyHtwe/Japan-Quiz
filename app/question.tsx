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

type Category = "Animals" | "Numbers" | "Countries" | "Foods";
type QuizItem = { name: string; image: string; audio: string };
type QuizData = Record<Category, QuizItem[]>;

const JSON_URL =
  "https://raw.githubusercontent.com/JulyHtwe/japan_quiz/main/quiz.json";
const IMAGE_BASE_URL =
  "https://raw.githubusercontent.com/JulyHtwe/japan_quiz/main/images/";
const AUDIO_BASE_URL =
  "https://raw.githubusercontent.com/JulyHtwe/japan_quiz/main/audio/";

const shuffle = <T,>(arr: T[]) =>
  [...arr].sort(() => Math.random() - 0.5);

export default function QuestionScreen() {
  const { category } = useLocalSearchParams<{ category: Category }>();
  const router = useRouter();

  const [quizList, setQuizList] = useState<QuizItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [question, setQuestion] = useState<QuizItem | null>(null);
  const [options, setOptions] = useState<QuizItem[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  const [fontLoaded] = useFonts({
    Kavoon: require("../assets/fonts/Kavoon-Regular.ttf"),
    Margarine: require("../assets/fonts/Margarine-Regular.ttf"),
  });

  /* 🔹 Fetch JSON and pick random 10 */
  useEffect(() => {
    fetch(JSON_URL)
      .then(res => res.json())
      .then((data: QuizData) => {
        const random10 = shuffle(data[category!]).slice(0, 10);
        setQuizList(random10);
        setCurrentIndex(0);
      });
  }, []);

  /* 🔹 Load question + options */
  useEffect(() => {
    if (!quizList.length) return;

    const correct = quizList[currentIndex];
    const wrong = shuffle(
      quizList.filter(i => i.image !== correct.image)
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

  if (!fontLoaded || !question) return null;

  return (
    <ImageBackground
      source={require("../assets/images/bg_3.png")}
      style={styles.bgImage}
    >
      {/* TOP */}
<View style={styles.container}>
  <Text style={styles.question_no}>
    Question {currentIndex + 1} of 10
  </Text>

  {/* Progress Bar */}
  <View style={styles.progressBg}>
    <View
      style={[
        styles.progressFill,
        { width: `${((currentIndex + 1) / 10) * 100}%` },
      ]}
    />
  </View>
</View>

      {/* QUESTION TEXT */}
      <View style={[styles.cat_btn, { marginTop: "20%" }]}>
        <Text style={[styles.cat_middleText, { color: "black", fontSize: 30 }]}>
          What does this Japanese word mean?
        </Text>
      </View>

      {/* WORD */}
      <Text style={styles.word}>{question.name}</Text>

      {/* AUDIO */}
      <Pressable style={styles.sound_btn} onPress={playAudio}>
        <Image
          source={require("../assets/images/volume.png")}
          style={{ width: 30, height: 30 }}
        />
        <Text style={[styles.middleText, { color: "black" }]}>
          Hear it!
        </Text>
      </Pressable>

      {/* ANSWERS */}
      <View style={styles.answerContainer}>
        {options.map(item => (
          <Pressable
            key={item.image}
            style={[
              styles.circle,
              selected === item.image && {
                backgroundColor: "gray",
                borderColor: "#FFF3B0",
                borderWidth: 4,
              },
            ]}
            onPress={() => setSelected(item.image)}
          >
            <Image
              source={{ uri: IMAGE_BASE_URL + item.image }}
              style={styles.answerImage}
            />
          </Pressable>
        ))}
      </View>

      {/* CONFIRM */}
      <Pressable
        style={styles.btn}
        disabled={!selected}
        onPress={() => {
          if (selected === question.image) {
            router.push({
              pathname: "/correct",
              params: { correctAnswer: question },
            });
          } else {
            router.push({
              pathname: "/incorrect",
              params: { correctAnswer: question },
            });
          }
          
        }}
      >
        <Text style={[styles.middleText, { color: "black", fontSize: 30 }]}>
          Confirm
        </Text>
      </Pressable>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bgImage: { flex: 1, width: "100%", height: "100%" },
  container: { left:25},

  question_no: {
    paddingTop: 50,
    fontSize: 20,
    fontFamily: "Kavoon",
    color: "black",
    textShadowColor: "white",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  progressBg: {
    width: "80%",
    height: 10,
    backgroundColor: "#eee",
    borderRadius: 10,
    marginTop: 10,
    overflow: "hidden",
  },
  
  progressFill: {
    height: "100%",
    backgroundColor: "#FFE066",
    borderRadius: 10,
  },
  

  cat_btn: {
    width: 350,
    height: 130,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 75,
    alignSelf: "center",
  },

  cat_middleText: {
    fontFamily: "Margarine",
    textAlign: "center",
  },

  word: {
    fontSize: 90,
    fontFamily: "Kavoon",
    textAlign: "center",
    marginVertical: 20,
  },

  sound_btn: {
    flexDirection: "row",
    gap: 10,
    width: 150,
    height: 50,
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
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
  },

  answerImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },

  btn: {
    position: "absolute",
    bottom: 0,
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

  middleText: {
    fontFamily: "Kavoon",
    textAlign: "center",
  },
});
