import { StyleSheet, ImageBackground, Text, View, Image, Pressable } from "react-native";
import { useFonts } from "expo-font";
import { Audio } from "expo-av";

const AUDIO_BASE_URL = "https://raw.githubusercontent.com/JulyHtwe/japan_quiz/main/audio/";

export default function IncorrectScreen({ route, navigation }: any) {
  const { correctAnswer } = route.params; // pass correct answer object

  const [fontLoaded] = useFonts({
    Kavoon: require("../assets/fonts/Kavoon-Regular.ttf"),
    Margarine: require("../assets/fonts/Margarine-Regular.ttf"),
  });

  const playAudio = async () => {
    if (!correctAnswer) return;
    const { sound } = await Audio.Sound.createAsync({
      uri: AUDIO_BASE_URL + correctAnswer.audio,
    });
    await sound.playAsync();
  };

  if (!fontLoaded) return null;

  return (
    <ImageBackground
      source={require("../assets/images/bg_4.png")}
      style={styles.bgImage}
    >
      <View style={styles.container}>
        <Image style={styles.icon} source={require('../assets/images/cross.png')} />
        <Text style={styles.title}>Incorrect</Text>
        <Text style={styles.subtitle}>The correct answer is:</Text>
        <Image
          source={{ uri: correctAnswer.imageUri }}
          style={{ width: 80, height: 80, marginVertical: 10 }}
        />
        <Text style={styles.correctText}>{correctAnswer.name}</Text>
        <Pressable style={styles.soundBtn} onPress={playAudio}>
          <Text style={styles.middleText}>🔊 Hear it!</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={() => navigation.goBack()}>
          <Text style={[styles.middleText, { fontSize: 30 }]}>Next Word</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bgImage: { flex: 1, width: "100%", height: "100%" },
  container: { top: 70, gap: 15, justifyContent: "center", alignItems: "center" },
  icon: { width: 80, height: 80 },
  title: { fontSize: 50, fontFamily: 'Kavoon', color: 'black', textShadowColor: 'white', textShadowOffset: { width: 3, height: 3 }, textShadowRadius: 10 },
  subtitle: { fontSize: 20, fontFamily: 'Kavoon', color: 'black' },
  correctText: { fontSize: 50, fontFamily: 'Kavoon', color: 'black' },
  btn: { position: "absolute", bottom: -120, width: 250, height: 80, backgroundColor: "white", borderColor: "pink", borderWidth: 5, justifyContent: "center", alignItems: "center", borderRadius: 50, alignSelf: "center" },
  middleText: { fontFamily: "Kavoon", textAlign: "center" },
  soundBtn: { padding: 10, backgroundColor: "white", borderRadius: 20 },
});
