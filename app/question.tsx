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
  audio: string;
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

  //audio play
const playAudio = async (audio?: any) => {
  if (!audio) return;

  let sound:any;
  try {
    sound = new Audio.Sound();

    // Load the audio first
    await sound.loadAsync({ uri: AUDIO_BASE_URL + audio });

    // Play after it's fully loaded
    await sound.playAsync();

    // Unload exactly when finished
    sound.setOnPlaybackStatusUpdate(async (status:any) => {
      if (!("didJustFinish" in status)) return;
      if (status.didJustFinish) {
        await sound.unloadAsync();
      }
    });
  } catch (e) {
    console.log("Audio error:", e);
    if (sound) {
      try {
        await sound.unloadAsync();
      } catch {}
    }
  }
};


const correctSound = new Audio.Sound();
const wrongSound = new Audio.Sound();

const loadSounds = async () => {
  await correctSound.loadAsync(require("../assets/audio/correct.mp3"));
  await wrongSound.loadAsync(require("../assets/audio/wrong.mp3"));
};
useEffect(() => {
  loadSounds();

  return () => {
    correctSound.unloadAsync();
    wrongSound.unloadAsync();
  };
}, []);

const playResultSound = async (isCorrect: boolean) => {
  const sound = isCorrect ? correctSound : wrongSound;
  await sound.replayAsync(); // plays instantly
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
      <Text style={styles.questionNo}>
        Question {currentIndex + 1} of {TOTAL_QUESTIONS}
      </Text>
      <View style={styles.progressBg}>
        <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
      </View>

      <View style={[styles.completeBtn, { marginTop: "30%" }]}>
        <Text
          style={[
            styles.catMiddleText,
            { color: "black", fontSize: scaleFont(30) },
          ]}
        >
          What does this {isHiragana ? "Hiragana" : "Japanese word"} mean?
        </Text>
      </View>

      {/* question */}
      <Text style={styles.word}>
        {"hiragana" in question ? question.hiragana : question.name}
      </Text>

      {/* audio btn */}
      {"audio" in question && (
        <Pressable style={styles.soundBtn} onPress={() => playAudio(question.audio)}>
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

      {/* answers */}
      <View style={styles.answerContainer}>
        {options.map((item, idx) => {
          const id = "image" in item ? item.image : item.romaji;
          return (
            <Pressable
              key={idx}
              onPress={() => setSelected(id)}
              style={({ pressed }) => [
                {
                  width: scale(80),
                  height: scale(80),
                  borderRadius: scale(40),
                  justifyContent: "center",
                  alignItems: "center",
                  transform: [{ scale: pressed ? 0.97 : 1 }], //smooth press animation
                  backgroundColor: pressed
                    ? "#ffe6f0"
                    : selected === id
                      ? "#ffd6ea"
                      : "white",
                  borderWidth: 3,
                  borderColor: selected === id ? "pink" : "white",
                  shadowColor: selected === id ? "pink" : "#000",
                  shadowOpacity: selected === id ? 0.3 : 0.08,
                  shadowRadius: selected === id ? 6 : 2,
                  elevation: selected === id ? 8 : 2,
                },
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
      <Pressable
        disabled={!selected}
        style={({ pressed }) => [
          styles.btn,
          {
            borderColor: selected ? "pink" : "#cccccc",
            opacity: selected ? 1 : 0.6,
            backgroundColor: pressed ? "#ffe6f0" : "white",
            transform: [{ scale: pressed ? 0.97 : 1 }],
            shadowColor: selected ? "pink" : "#000",
            shadowOpacity: selected ? 0.3 : 0.1,
            shadowRadius: selected ? 30 : 50,
            elevation: selected ? 8 : 3,
          },
        ]}
        onPress={() => {
          if (!question || !selected) return;
          // image or romaji
          const correctAnswer =
            "image" in question ? question.image : question.romaji;
          const isCorrect = selected === correctAnswer;
          playResultSound(isCorrect);

          const newScore = isCorrect ? currentScore + 1 : currentScore;
          // quizResultContext
          addResult({
            question:
              "hiragana" in question ? question.hiragana : question.name,

            options: options.map((o) => ("hiragana" in o ? o.romaji : o.image)),
            correctAnswer,
            correctAudio: "audio" in question ? question.audio : "",
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
  questionNo: {
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
    marginTop: verticalScale(35),
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
  completeBtn: {
    flexDirection: "row",
    width: scale(329),
    height: verticalScale(120),
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(75),
    alignSelf: "center",
  },
  catMiddleText: {
    fontSize: scaleFont(35),
    color: "white",
    fontFamily: "Margarine",
    textShadowRadius: 8,
    textAlign: "center",
  },
});
