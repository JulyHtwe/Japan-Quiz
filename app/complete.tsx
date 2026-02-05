import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  Image,
  Pressable,
  Dimensions,
  PixelRatio
} from "react-native";
import { useFonts } from "expo-font";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useQuizResult } from "../components/quizResultContext";

/* ---------- Responsive Helpers ---------- */

const { width, height } = Dimensions.get("window");

const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

const scale = (size: number) => (width / BASE_WIDTH) * size;
const verticalScale = (size: number) =>
  (height / BASE_HEIGHT) * size;
export const scaleFont = (size: number) => {
  const scale = width / BASE_WIDTH;

  // reduce font slightly on small phones
  const adjusted =
    width < 350
      ? scale * 0.85
      : width < 400
      ? scale * 0.95
      : scale;

  return Math.round(PixelRatio.roundToNearestPixel(size * adjusted));
};

/* ======================================= */

export default function CompleteScreen() {
  const router = useRouter();
  const { resetResults } = useQuizResult();

  const { score = "0", total = "10", category } =
    useLocalSearchParams<{
      score?: string;
      total?: string;
      category?: string;
    }>();

  const [fontLoaded] = useFonts({
    Kavoon: require("../assets/fonts/Kavoon-Regular.ttf"),
    Margarine: require("../assets/fonts/Margarine-Regular.ttf"),
  });

  if (!fontLoaded) return null;

  return (
    <ImageBackground
      source={require("../assets/images/bg_5.png")}
      style={styles.bgImage}
    >
      {/* Title */}
      <View
        style={[
          styles.completeBtn,
          { marginTop: verticalScale(60) },
        ]}
      >
        <Image
          style={styles.icon}
          source={require("../assets/images/firework.png")}
        />

        <Text
          style={[
            styles.catMiddleText,
            { fontSize: scaleFont(30), color: "black" },
          ]}
        >
          Quiz Complete
        </Text>

        <Image
          style={styles.icon}
          source={require("../assets/images/firework.png")}
        />
      </View>

      {/* Score Text */}
      <Text style={styles.youGot}>You got</Text>

      {/* Score */}
      <View style={styles.scoreRow}>
        <Text style={[styles.score, { color: "yellow" }]}>
          {score}
        </Text>

        <Text
          style={[
            styles.score,
            { fontSize: scaleFont(30), fontFamily: "Margarine" },
          ]}
        >
          out
        </Text>

        <Text style={[styles.score, { color: "yellow" }]}>
          {total}
        </Text>
      </View>

      {/* Results Button */}
      <Pressable
        onPress={() => router.push("/result")}
        style={({ pressed }) => [
          styles.btn,
          {
            marginTop: verticalScale(10),
            backgroundColor: pressed
              ? "#ffe6f0"
              : "white",
            transform: [{ scale: pressed ? 0.97 : 1 }],
          },
        ]}
      >
        <Image
          style={styles.icon}
          source={require("../assets/images/search.png")}
        />
        <Text style={styles.middleText}>See Results</Text>
      </Pressable>

      <Text style={styles.greatJob}>Great Job!</Text>

      <Text style={styles.proudText}>
        Japanese is proud of you!
      </Text>

      <Text style={styles.practiceText}>
        Practice makes perfect!
      </Text>

      {/* Buttons Row */}
      <View style={styles.bottomBtns}>
        {/* Play Again */}
        <Pressable
          style={({ pressed }) => [
            styles.btn,
            {
              backgroundColor: pressed
                ? "#ffe6f0"
                : "white",
              transform: [{ scale: pressed ? 0.97 : 1 }],
            },
          ]}
          onPress={() => {
            resetResults();
            router.replace({
              pathname: "/question",
              params: {
                category,
                index: "0",
                score: "0",
              },
            });
          }}
        >
          <Image
            source={require("../assets/images/refresh.png")}
            style={[
              styles.icon,
              { width: scale(40), height: scale(40) },
            ]}
          />

          <Text style={styles.middleText}>
            Play Again
          </Text>
        </Pressable>

        {/* Exit */}
        <Pressable
          style={({ pressed }) => [
            styles.btn,
            {
              backgroundColor: pressed
                ? "#ffe6f0"
                : "white",
              transform: [{ scale: pressed ? 0.97 : 1 }],
            },
          ]}
          onPress={() => {
            resetResults();
            router.replace("/categories");
          }}
        >
          <Image
            source={require("../assets/images/wave.png")}
            style={styles.icon}
          />

          <Text style={styles.middleText}>Exit</Text>

          <Image
            source={require("../assets/images/wave.png")}
            style={styles.icon}
          />
        </Pressable>
      </View>
    </ImageBackground>
  );
}

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  bgImage: { flex: 1 },

  completeBtn: {
    flexDirection: "row",
    gap: scale(10),
    width: scale(360),
    height: verticalScale(100),
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(50),
    alignSelf: "center",
    elevation: 20,
  },

  catMiddleText: {
    fontFamily: "Margarine",
    textAlign: "center",
  },

  icon: {
    width: scale(30),
    height: scale(30),
  },

  btn: {
    flexDirection: "row",
    gap: scale(15),
    width: scale(180),
    height: verticalScale(60),
    backgroundColor: "white",
    borderColor: "pink",
    borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(30),
    alignSelf: "center",
    elevation: 20,
  },

  middleText: {
    fontSize: scaleFont(20),
    color: "black",
    fontFamily: "Kavoon",
    textAlign: "center",
  },

  score: {
    fontSize: scaleFont(80),
    textAlign: "center",
    fontFamily: "Kavoon",
    textShadowColor: "black",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 7,
  },

  scoreRow: {
    flexDirection: "row",
    gap: scale(40),
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(20),
  },

  youGot: {
    color: "white",
    fontSize: scaleFont(40),
    textAlign: "center",
    marginTop: verticalScale(20),
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 7,
  },

  greatJob: {
    color: "white",
    fontSize: scaleFont(30),
    textAlign: "center",
    marginTop: verticalScale(40),
    fontFamily: "Kavoon",
    textShadowColor: "black",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 7,
  },

  proudText: {
    color: "white",
    fontSize: scaleFont(30),
    textAlign: "center",
    marginTop: verticalScale(30),
    fontFamily: "Kavoon",
    textShadowColor: "black",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 7,
  },

  practiceText: {
    color: "white",
    fontSize: scaleFont(25),
    textAlign: "center",
    marginTop: verticalScale(30),
    fontFamily: "Kavoon",
    textShadowColor: "black",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 7,
  },

  bottomBtns: {
    flexDirection: "row",
    gap: scale(20),
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(30),
  },
});
