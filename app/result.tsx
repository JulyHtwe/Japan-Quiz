import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import { useQuizResult } from "../components/quizResultContext";
import { Audio } from "expo-av";
import { useRouter } from "expo-router";

const IMAGE_BASE_URL =
  "https://raw.githubusercontent.com/JulyHtwe/japan_quiz/main/images/";
const AUDIO_BASE_URL =
  "https://raw.githubusercontent.com/JulyHtwe/japan_quiz/main/audio/";

export default function Results() {
  const router = useRouter();
  const { results } = useQuizResult();

  const playAudio = async (audio?: string) => {
    if (!audio) return;

    try {
      const { sound } = await Audio.Sound.createAsync({
        uri: AUDIO_BASE_URL + audio,
      });
      await sound.playAsync();

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (e) {
      console.log("Audio error:", e);
    }
  };

  return (
    <View style={{backgroundColor:'black'}}>
    <ScrollView
      style={{ margin: 10 }}
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
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Text style={styles.question}>
              Q{index + 1}: {item.question}
            </Text>

            <Pressable onPress={() => playAudio(item.correctAudio)}>
              <Image
                style={styles.icon}
                source={require("../assets/images/volume.png")}
              />
            </Pressable>
          </View>
          <View style={styles.options}>
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
                  <Image
                    source={{ uri: IMAGE_BASE_URL + opt }}
                    style={styles.image}
                  />
                </View>
              );
            })}
          </View>
        </View>
      ))}
      <Pressable style={styles.btn} onPress={() =>{
        // resetResults();
        router.back();
         }}>
        <Image
          source={require("../assets/images/wave.png")}
          style={styles.icon}
        />
        <Text style={[styles.middleText, { fontSize: 21 }]}>Back</Text>
        <Image
          source={require("../assets/images/wave.png")}
          style={styles.icon}
        />
      </Pressable>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 50, 
  },

  card: {
    padding: 20,
    marginBottom: 30,
    backgroundColor: "lightgray",
    borderRadius: 50,
    borderWidth: 3,
    elevation: 8,
  },

  question: {
    fontSize: 20,
    fontWeight: "bold",
  },

  options: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },

  optionWrapper: {
    padding: 5,
    borderRadius: 50,
  },

  correct: {
    borderWidth: 3,
    borderColor: "green",
    backgroundColor: "lightgreen",
  },

  wrong: {
    borderWidth: 3,
    borderColor: "red",
    backgroundColor: "#fb6f7b",
  },

  image: {
    width: 60,
    height: 60,
  },

  icon: {
    width: 30,
    height: 30,
  },

  btn: {
    flexDirection: "row",
    gap: 15,
    marginTop: 40,
    width: 180,
    height: 60,
    backgroundColor: "white",
    borderColor: "pink",
    borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    alignSelf: "center",
    elevation: 20,
  },

  middleText: {
    fontSize: 20,
    color: "black",
    fontFamily: "Kavoon",
    textAlign: "center",
  },
});
