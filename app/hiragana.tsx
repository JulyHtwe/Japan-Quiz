import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  Pressable,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useFonts } from "expo-font";
import { Audio } from "expo-av";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");
const numColumns = 5;
const cardSize = Math.min(width / numColumns - 16, 80);
const isSmallDevice = height < 365;
const isLargeDevice = width > 768;

// 🔹 Static grid data with audio
const gridData = [
  [
    { hiragana: "あ", romaji: "a", audio: require("../assets/audio/あ.mp3") },
    { hiragana: "い", romaji: "i", audio: require("../assets/audio/い.mp3") },
    { hiragana: "う", romaji: "u", audio: require("../assets/audio/う.mp3") },
    { hiragana: "え", romaji: "e", audio: require("../assets/audio/え.mp3") },
    { hiragana: "お", romaji: "o", audio: require("../assets/audio/お.mp3") },
  ],
  [
    { hiragana: "か", romaji: "ka", audio: require("../assets/audio/か.mp3") },
    { hiragana: "き", romaji: "ki", audio: require("../assets/audio/き.mp3") },
    { hiragana: "く", romaji: "ku", audio: require("../assets/audio/く.mp3") },
    { hiragana: "け", romaji: "ke", audio: require("../assets/audio/け.mp3") },
    { hiragana: "こ", romaji: "ko", audio: require("../assets/audio/こ.mp3") },
  ],
  [
    { hiragana: "さ", romaji: "sa", audio: require("../assets/audio/さ.mp3") },
    { hiragana: "し", romaji: "shi", audio: require("../assets/audio/し.mp3") },
    { hiragana: "す", romaji: "su", audio: require("../assets/audio/す.mp3") },
    { hiragana: "せ", romaji: "se", audio: require("../assets/audio/せ.mp3") },
    { hiragana: "そ", romaji: "so", audio: require("../assets/audio/そ.mp3") },
  ],
  [
    { hiragana: "た", romaji: "ta", audio: require("../assets/audio/た.mp3") },
    { hiragana: "ち", romaji: "chi", audio: require("../assets/audio/ち.mp3") },
    { hiragana: "つ", romaji: "tsu", audio: require("../assets/audio/つ.mp3") },
    { hiragana: "て", romaji: "te", audio: require("../assets/audio/て.mp3") },
    { hiragana: "と", romaji: "to", audio: require("../assets/audio/と.mp3") },
  ],
  [
    { hiragana: "な", romaji: "na", audio: require("../assets/audio/な.mp3") },
    { hiragana: "に", romaji: "ni", audio: require("../assets/audio/に.mp3") },
    { hiragana: "ぬ", romaji: "nu", audio: require("../assets/audio/ぬ.mp3") },
    { hiragana: "ね", romaji: "ne", audio: require("../assets/audio/ね.mp3") },
    { hiragana: "の", romaji: "no", audio: require("../assets/audio/の.mp3") },
  ],
  [
    { hiragana: "は", romaji: "ha", audio: require("../assets/audio/は.mp3") },
    { hiragana: "ひ", romaji: "hi", audio: require("../assets/audio/ひ.mp3") },
    { hiragana: "ふ", romaji: "fu", audio: require("../assets/audio/ふ.mp3") },
    { hiragana: "へ", romaji: "he", audio: require("../assets/audio/へ.mp3") },
    { hiragana: "ほ", romaji: "ho", audio: require("../assets/audio/ほ.mp3") },
  ],
  [
    { hiragana: "ま", romaji: "ma", audio: require("../assets/audio/ま.mp3") },
    { hiragana: "み", romaji: "mi", audio: require("../assets/audio/み.mp3") },
    { hiragana: "む", romaji: "mu", audio: require("../assets/audio/む.mp3") },
    { hiragana: "め", romaji: "me", audio: require("../assets/audio/め.mp3") },
    { hiragana: "も", romaji: "mo", audio: require("../assets/audio/も.mp3") },
  ],
  [
    { hiragana: "や", romaji: "ya", audio: require("../assets/audio/や.mp3") },
    { hiragana: "", romaji: "", audio: undefined },
    { hiragana: "ゆ", romaji: "yu", audio: require("../assets/audio/ゆ.mp3") },
    { hiragana: "", romaji: "", audio: undefined },
    { hiragana: "よ", romaji: "yo", audio: require("../assets/audio/よ.mp3") },
  ],
  [
    { hiragana: "ら", romaji: "ra", audio: require("../assets/audio/ら.mp3") },
    { hiragana: "り", romaji: "ri", audio: require("../assets/audio/り.mp3") },
    { hiragana: "る", romaji: "ru", audio: require("../assets/audio/る.mp3") },
    { hiragana: "れ", romaji: "re", audio: require("../assets/audio/れ.mp3") },
    { hiragana: "ろ", romaji: "ro", audio: require("../assets/audio/ろ.mp3") },
  ],
  [
    { hiragana: "わ", romaji: "wa", audio: require("../assets/audio/わ.mp3") },
    { hiragana: "", romaji: "", audio: undefined },
    { hiragana: "", romaji: "", audio: undefined },
    { hiragana: "", romaji: "", audio: undefined },
    { hiragana: "を", romaji: "wo", audio: require("../assets/audio/を.mp3") },
  ],
  [
    { hiragana: "", romaji: "", audio: undefined },
    { hiragana: "", romaji: "", audio: undefined },
    { hiragana: "", romaji: "", audio: undefined },
    { hiragana: "", romaji: "", audio: undefined },
    { hiragana: "ん", romaji: "n", audio: require("../assets/audio/ん.mp3") },
  ],
];

export default function HiraganaScreen() {
  const router = useRouter();
  const [fontLoaded] = useFonts({
    Kavoon: require("../assets/fonts/Kavoon-Regular.ttf"),
    Margarine: require("../assets/fonts/Margarine-Regular.ttf"),
  });

  if (!fontLoaded) return null;

  const playAudio = async (audio?: any) => {
    if (!audio) return;
    try {
      const { sound } = await Audio.Sound.createAsync(audio);
      await sound.playAsync();
      setTimeout(() => sound.unloadAsync(), 3000);
    } catch (error) {
      console.log("Error playing audio:", error);
    }
  };

  const startQuiz = () => {
    router.push("/question?category=Hiragana&index=0&score=0");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require("../assets/images/bg_3.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.headerContainer}>
          <Pressable
            onPress={startQuiz}
            style={({ pressed }) => [
              styles.quizButton,
              pressed && styles.quizButtonPressed,
            ]}
          >
            <Text style={styles.quizButtonText}>Start Hiragana Quiz</Text>
          </Pressable>
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={true}
        >
          <View style={styles.gridContainer}>
            {gridData.map((row, rowIndex) => (
              <View key={`row-${rowIndex}`} style={styles.row}>
                {row.map((item, colIndex) => (
                  <Pressable
                    key={`cell-${rowIndex}-${colIndex}`}
                    onPress={() => playAudio(item.audio)}
                    style={({ pressed }) => [
                      styles.card,
                      pressed && { transform: [{ scale: 0.95 }] },
                    ]}
                  >
                    <Text style={styles.hiraganaText}>{item.hiragana}</Text>
                    <Text style={styles.romajiText}>{item.romaji}</Text>
                  </Pressable>
                ))}
              </View>
            ))}
          </View>
          <View style={styles.bottomSpacing} />
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  backgroundImage: { flex: 1, width: "100%", height: "100%" },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: isSmallDevice ? 16 : 24,
    paddingHorizontal: isLargeDevice ? 32 : 16,
    alignItems: "center",
  },
  headerContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: isSmallDevice ? 10 : 20,
    marginBottom: isSmallDevice ? 16 : 24,
    paddingHorizontal: 16,
  },
  quizButton: {
    marginTop: isLargeDevice ? 20 : 60,
    width: isLargeDevice ? 280 : width * 0.7,
    height: isSmallDevice ? 56 : 64,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#ff69b4",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  quizButtonPressed: {
    backgroundColor: "#fff0f6",
    transform: [{ scale: 0.98 }],
  },
  quizButtonText: {
    fontSize: isSmallDevice ? 18 : 22,
    fontFamily: "Kavoon",
    color: "#333",
    textAlign: "center",
    paddingHorizontal: 8,
  },
  gridContainer: {
    width: "100%",
    maxWidth: 600,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: 16,
    padding: isSmallDevice ? 8 : 12,
    marginHorizontal: "auto",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  row: { flexDirection: "row", justifyContent: "center", marginVertical: isSmallDevice ? 2 : 4 },
  card: {
    width: cardSize,
    height: cardSize,
    margin: isSmallDevice ? 3 : 4,
    borderRadius: 10,
    backgroundColor: "#ffe6f2",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  hiraganaText: {
    fontSize: isLargeDevice ? 32 : isSmallDevice ? 24 : 28,
    fontFamily: "Kavoon",
    fontWeight: "bold",
    color: "#2c3e50",
  },
  romajiText: {
    fontSize: isSmallDevice ? 12 : 14,
    fontFamily: "Margarine",
    color: "#7f8c8d",
    marginTop: 4,
    letterSpacing: 0.5,
  },
  emptyCard: { backgroundColor: "transparent", elevation: 0, shadowOpacity: 0 },
  bottomSpacing: { height: isSmallDevice ? 30 : 50 },
});
