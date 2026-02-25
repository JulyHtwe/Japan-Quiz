import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";
import { useQuizResult } from "../components/quizResultContext";
import { Audio, AVPlaybackStatus, AVPlaybackStatusError } from "expo-av";
import { useRouter } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const { width } = Dimensions.get("window");
const isTablet = width >= 768;
const scaleFont = (percent: string) => (isTablet ? wp(percent) * 0.8 : wp(percent));

const IMAGE_BASE_URL =
  "https://raw.githubusercontent.com/JulyHtwe/japan_quiz/main/images/";
const AUDIO_BASE_URL =
  "https://raw.githubusercontent.com/JulyHtwe/japan_quiz/main/audio/";

export default function Results() {
  const router = useRouter();
  const { results } = useQuizResult();

  const playAudio = async (audio?: string) => {
    if (!audio) return;

    let sound: Audio.Sound | undefined;

    try {
      sound = new Audio.Sound();
      await sound.loadAsync({ uri: AUDIO_BASE_URL + audio });
      await sound.playAsync();

      sound.setOnPlaybackStatusUpdate(
        async (status: AVPlaybackStatus | AVPlaybackStatusError) => {
          if (!("didJustFinish" in status)) return;
          if (status.didJustFinish) {
            await sound?.unloadAsync();
          }
        }
      );
    } catch (err) {
      console.log("Audio error:", err);
      if (sound) {
        try {
          await sound.unloadAsync();
        } catch {}
      }
    }
  };

  return (
    <View style={{ backgroundColor: "black" }}>
      <ScrollView
        style={{ margin: wp("2%") }}
        contentContainerStyle={styles.container}
      >
        {results.map((item, index) => (
          <View
            key={index}
            style={[
              styles.card,
              { borderColor: item.isCorrect ? "green" : "red" },
            ]}
          >
            <View style={{ flexDirection: "row", gap: wp("2%"), alignItems: "center" }}>
              <Text style={[styles.question, { fontSize: scaleFont("4.5%") }]}>
                Q{index + 1}: {item.question}
              </Text>

              <Pressable onPress={() => playAudio(item.correctAudio)}>
                <Image
                  style={{ width: wp("6%"), height: wp("6%") }}
                  source={require("../assets/images/volume.png")}
                />
              </Pressable>
            </View>

            <View style={{ flexDirection: "row", gap: wp("2%"), marginTop: hp("1%") }}>
              {item.options.map((opt) => {
                const isCorrect = opt === item.correctAnswer;
                const isSelected = opt === item.selectedAnswer;

                return (
                  <View
                    key={opt}
                    style={[
                      styles.optionWrapper,
                      isCorrect && styles.correct,
                      isSelected && !isCorrect && styles.wrong,
                    ]}
                  >
                    {opt.endsWith(".png") || opt.endsWith(".jpg") ? (
                      <Image
                        source={{ uri: IMAGE_BASE_URL + opt }}
                        style={{ width: wp("12%"), height: wp("12%") }}
                      />
                    ) : (
                      <Text style={{ fontSize: scaleFont("4%"), fontWeight: "bold" }}>
                        {opt}
                      </Text>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        ))}

        <Pressable
          style={styles.btn}
          onPress={() => {
            router.back();
          }}
        >
          <Image
            source={require("../assets/images/wave.png")}
            style={{ width: wp("6%"), height: wp("6%") }}
          />
          <Text style={[styles.middleText, { fontSize: scaleFont("4%") }]}>
            Back
          </Text>
          <Image
            source={require("../assets/images/wave.png")}
            style={{ width: wp("6%"), height: wp("6%") }}
          />
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: hp("5%"),
    paddingBottom: hp("5%"),
  },

  card: {
    padding: wp("4%"),
    marginBottom: hp("3%"),
    backgroundColor: "lightgray",
    borderRadius: wp("10%"),
    borderWidth: 3,
    elevation: 8,
  },

  question: {
    fontWeight: "bold",
  },

  optionWrapper: {
    padding: wp("2%"),
    borderRadius: wp("10%"),
    justifyContent: "center",
    alignItems: "center",
  },

  correct: {
    borderWidth: 2,
    borderColor: "green",
    backgroundColor: "lightgreen",
  },

  wrong: {
    borderWidth: 2,
    borderColor: "red",
    backgroundColor: "#fb6f7b",
  },

  btn: {
    flexDirection: "row",
    gap: wp("3%"),
    marginTop: hp("4%"),
    width: wp("50%"),
    height: hp("7%"),
    backgroundColor: "white",
    borderColor: "pink",
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp("10%"),
    alignSelf: "center",
    elevation: 20,
  },

  middleText: {
    fontFamily: "Kavoon",
    color: "black",
    textAlign: "center",
  },
});