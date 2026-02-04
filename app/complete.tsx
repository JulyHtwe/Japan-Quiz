import { StyleSheet, ImageBackground, Text, View, Image, Pressable } from "react-native";
import { useFonts } from "expo-font";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useQuizResult } from "../components/quizResultContext";

export default function CompleteScreen() {
  const router = useRouter();
    const { resetResults } = useQuizResult();
  const { score = "0", total = "10", category } = useLocalSearchParams<{
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
      <View style={[styles.completeBtn, { marginTop: "20%" }]}>
        <Image style= {styles.icon} source={require('../assets/images/firework.png')}></Image>
        <Text style={[styles.catMiddleText, { color: "black", fontSize: 30 }]}>
          Quiz Complete
        </Text>
        <Image style= {styles.icon} source={require('../assets/images/firework.png')}></Image>
      </View>

      <Text style={{
        color: 'white',
        fontSize: 40,
        textAlign: 'center',
        marginTop: 20,
        fontWeight: 'bold',
        paddingTop: 10,
        textShadowColor: "black",
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 7,
      }}>
        You got
      </Text>

      {/* Score */}
      <View style={{ flexDirection: 'row', gap: 40, width: '100%', alignItems: "center", justifyContent: 'center' }}>
        <Text style={[styles.score, { color: "yellow" }]}>{score}</Text>
        <Text style={[styles.score, { fontSize: 30, fontFamily: 'Margarine' }]}>out</Text>
        <Text style={[styles.score, { color: "yellow" }]}>{total}</Text>
      </View>
<Pressable
        onPress={() => router.push("/result")}
 style={({ pressed }) => [
          styles.btn,
          {
            marginTop:10,
            backgroundColor: pressed ? "#ffe6f0" : "white",
            transform: [{ scale: pressed ? 0.97 : 1 }],
          },
        ]}      >
        <Image style={styles.icon} source={require('../assets/images/search.png')}></Image>
        <Text style={styles.middleText}>See Results</Text>
      </Pressable>
      <Text style={{
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
        marginTop: 40,
        fontWeight: 'bold',
        textShadowColor: "black",
        fontFamily: 'Kavoon',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 7,
      }}>
        Great Job!
      </Text>

      <Text style={{
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
        marginTop: 30,
        textShadowColor: "black",
        fontFamily: 'Kavoon',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 7,
      }}>
        Japanese is proud of you!
      </Text>

      <Text style={{
        color: 'white',
        fontSize: 25,
        textAlign: 'center',
        marginTop: 30,
        textShadowColor: "black",
        fontFamily: 'Kavoon',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 7,
      }}>
        Practice makes perfect!
      </Text>

      {/* Buttons */}
      <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
        {/* Play Again */}
        <Pressable
           style={({ pressed }) => [
          styles.btn,
          {
            backgroundColor: pressed ? "#ffe6f0" : "white",
            transform: [{ scale: pressed ? 0.97 : 1 }],
          },
        ]}
          onPress={() => {
            resetResults();
            router.replace({
              pathname: "/question",
              params: { category, index: "0", score: "0" },
            });
          }}
        >
          <Image source={require("../assets/images/refresh.png")} style={[styles.icon, { width: 40, height: 40 }]} />
          <Text style={[styles.middleText, { color: "black", fontSize: 21 }]}>Play Again</Text>
        </Pressable>

        {/* Exit */}
        <Pressable
           style={({ pressed }) => [
          styles.btn,
          {
            backgroundColor: pressed ? "#ffe6f0" : "white",
            transform: [{ scale: pressed ? 0.97 : 1 }],
          },
        ]}
          onPress={() => {
            resetResults();
            // router.back()
            router.replace("/categories");
          }}
        >
          <Image source={require("../assets/images/wave.png")} style={styles.icon} />
          <Text style={[styles.middleText, { color: "black", fontSize: 21 }]}>Exit</Text>
          <Image source={require("../assets/images/wave.png")} style={styles.icon} />
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bgImage: { flex: 1, width: "100%", height: "100%" },
  completeBtn: {
    flexDirection: "row",
    gap: 10,
    width: 360,
    height: 100,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    alignSelf: "center",
    elevation:20
  },
  catMiddleText: { fontSize: 35, color: "white", fontFamily: "Margarine", textShadowRadius: 8, textAlign: "center" },
  btn: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 50,
    width: 180,
    height: 60,
    backgroundColor: "white",
    borderColor: "pink",
    borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    alignSelf: "center",
    // Shadow (Android)
    elevation:20
  },
  icon: { width: 30, height: 30 },
  middleText: { fontSize: 20, color: "black", fontFamily: "Kavoon", textAlign: "center" },
  score: {
    color: "white",
    fontSize: 80,
    textAlign: "center",
    fontFamily: "Kavoon",
    textShadowColor: "black",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 7,
  },
});
