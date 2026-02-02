import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import { useFonts } from "expo-font";
import { Audio } from "expo-av";
import { useLocalSearchParams, useRouter } from "expo-router";

const AUDIO_BASE_URL =
  "https://raw.githubusercontent.com/JulyHtwe/japan_quiz/main/audio/";
const IMAGE_BASE_URL =
  "https://raw.githubusercontent.com/JulyHtwe/japan_quiz/main/images/";

export default function Incorrect() {
  const router = useRouter();

  const { name, image, audio, category, index ,score} =
  useLocalSearchParams<{
    name: string;
    image: string;
    audio: string;
    category: string;
    index: string;
    score:string;
  }>();


  const [fontLoaded] = useFonts({
    Kavoon: require("../assets/fonts/Kavoon-Regular.ttf"),
    Margarine: require("../assets/fonts/Margarine-Regular.ttf"),
  });

  const playAudio = async () => {
    const { sound } = await Audio.Sound.createAsync({
      uri: AUDIO_BASE_URL + audio,
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
        <Image
          style={styles.icon}
          source={require("../assets/images/cross.png")}
        />

        <Text style={styles.title}>Incorrect</Text>
        <Text style={styles.subtitle}>The correct answer is:</Text>

        <View style={styles.imageShadow}>
        <Image
          source={{ uri: IMAGE_BASE_URL + image }}
          style={{ width: 100, height: 100,marginTop:30 ,borderRadius:40,alignItems:"center",justifyContent:"center"}}
        />
        </View>

        <Text style={styles.correctText}>{name}</Text>

        <Pressable style={styles.soundBtn} onPress={playAudio}>
          <Text style={styles.middleText}>🔊 Hear it!</Text>
        </Pressable>

        <Pressable
  style={styles.btn}
  onPress={() => {
    const nextIndex = Number(index) + 1;

if (nextIndex === 10) {
  router.replace({
    pathname: "/complete",
    params: { score },
  });
} else {
  router.replace({
    pathname: "/question",
    params: {
      category,
      index: nextIndex.toString(),
      score,
    },
  });
}
  }}
>
  <Text style={[styles.middleText, { fontSize: 30}]}>
    Next Word
  </Text>
</Pressable>

      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  bgImage: { flex: 1, width: "100%", height: "100%" },
  container: {
    top: 70,
    gap: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: { width: 80, height: 80, elevation: 10, borderRadius: 40,},
  title: {
    fontSize: 50,
    fontFamily: "Kavoon",
    color: "black",
    textShadowColor: "white",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 10,
  },
  subtitle: { fontSize: 20, fontFamily: "Kavoon", color: "black",marginTop:30 },
  correctText: { fontSize: 50, fontFamily: "Kavoon", color: "black" ,marginTop:50},
  btn: {
    position: "absolute",
    bottom: -150,
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
  imageShadow: {
  width: 80,
  height: 80,
  marginTop: 30,
 shadowColor: "#000",
  shadowOffset: { width: 2, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 3,
  elevation: 30,
  borderRadius:50,
},
  middleText: { fontFamily: "Kavoon", textAlign: "center" },
  soundBtn: { padding: 10, backgroundColor: "white", borderRadius: 20,borderColor:'pink', },
});
