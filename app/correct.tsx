import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  Image,
  Pressable,
  BackHandler,
  Dimensions,
} from "react-native";
import { useFonts } from "expo-font";
import { Audio } from "expo-av";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";

const { width, height } = Dimensions.get("window");

// Responsive helpers
const wp = (percent: string) => (width * parseFloat(percent)) / 100;
const hp = (percent: string) => (height * parseFloat(percent)) / 100;

const AUDIO_BASE_URL =
  "https://raw.githubusercontent.com/JulyHtwe/japan_quiz/main/audio/";
const IMAGE_BASE_URL =
  "https://raw.githubusercontent.com/JulyHtwe/japan_quiz/main/images/";

export default function Correct() {
  const router = useRouter();

  const { name, romaji, image, audio, category, index, score } =
    useLocalSearchParams<{
      name: string;
      romaji?: string;
      image?: string;
      audio?: string;
      category: string;
      index: string;
      score: string;
    }>();

  const currentIndex = Number(index);
  const totalQuestions = 10;
  const isLastQuestion = currentIndex + 1 === totalQuestions;

  const [fontLoaded] = useFonts({
    Kavoon: require("../assets/fonts/Kavoon-Regular.ttf"),
    Margarine: require("../assets/fonts/Margarine-Regular.ttf"),
  });

  // Disable Android back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);

  // Audio safe play
  const playAudio = async () => {
    if (!audio) return;
    try {
      const { sound } = await Audio.Sound.createAsync({
        uri: AUDIO_BASE_URL + audio,
      });
      await sound.playAsync();
    } catch (err) {
      console.log("Audio error:", err);
    }
  };

  if (!fontLoaded) return null;

  return (
    <ImageBackground
      source={require("../assets/images/bg_4.png")}
      style={styles.bgImage}
    >
      <View style={styles.container}>
        <Image
          style={styles.icon}
          source={require("../assets/images/check.png")}
        />

        <Text style={styles.title}>Correct</Text>
        <Text style={styles.subtitle}>The correct answer is:</Text>

        {/* Image OR romaji */}
        {image ? (
          <View style={styles.imageShadow}>
            <Image
              source={{ uri: IMAGE_BASE_URL + image }}
              style={styles.answerImage}
            />
          </View>
        ) : (
          <Text style={styles.correctText}>{romaji}</Text>
        )}

        {/* Name always */}
        {name && <Text style={styles.correctText}>{name}</Text>}

        {/* Audio button */}
        <Pressable style={styles.soundBtn} onPress={playAudio}>
          <Text style={styles.middleText}>🔊 Hear it!</Text>
        </Pressable>

        {/* Next button */}
        <Pressable
          style={({ pressed }) => [
            styles.btn,
            {
              backgroundColor: pressed ? "#ffe6f0" : "white",
              transform: [{ scale: pressed ? 0.97 : 1 }],
            },
          ]}
          onPress={() => {
            if (isLastQuestion) {
              router.replace({
                pathname: "/complete",
                params: { score, category },
              });
            } else {
              router.replace({
                pathname: "/question",
                params: {
                  category,
                  index: (currentIndex + 1).toString(),
                  score,
                },
              });
            }
          }}
        >
          <Text style={styles.btnText}>
            {isLastQuestion ? "Complete" : "Next Word"}
          </Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    width: wp("100%"),
    height: hp("100%"),
  },

  container: {
    top: hp("10%"),
    gap: hp("2%"),
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    width: wp("20%"),
    height: wp("20%"),
    borderRadius: wp("10%"),
    elevation: 10,
  },

  title: {
    fontSize: wp("12%"),
    fontFamily: "Kavoon",
    color: "black",
    textShadowColor: "white",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 10,
  },

  subtitle: {
    fontSize: wp("4.5%"),
    fontFamily: "Kavoon",
    color: "black",
    marginTop: hp("2%"),
  },

  correctText: {
    fontSize: wp("10%"),
    fontFamily: "Kavoon",
    color: "black",
    marginTop: hp("1%"),
  },

  btn: {
    marginTop: hp("6%"),
    width: wp("60%"),
    height: hp("8%"),
    backgroundColor: "white",
    borderColor: "pink",
    borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp("12%"),
  },

  btnText: {
    fontSize: hp("4%"),
    fontFamily: "Kavoon",
  },

  imageShadow: {
    width: wp("30%"),
    height: wp("30%"),
    marginTop: hp("3%"),
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 30,
    borderRadius: wp("15%"),
    justifyContent: "center",
    alignItems: "center",
  },

  answerImage: {
    width: wp("25%"),
    height: wp("25%"),
    borderRadius: wp("10%"),
  },

  middleText: {
    fontFamily: "Kavoon",
    textAlign: "center",
    fontSize: hp("2%"),
  },

  soundBtn: {
    padding: hp("1%"),
    backgroundColor: "white",
    borderRadius: wp("5%"),
    borderColor: "pink",
    borderWidth: 1,
    marginTop: hp("2%"),
  },
});
