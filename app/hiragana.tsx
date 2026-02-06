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
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

const JSON_URL =
  "https://raw.githubusercontent.com/JulyHtwe/japan_quiz/main/hiragana.json";
type HiraganaItem = {
  hiragana: string;
  romaji: string;
  audio?: string;
};

const { width, height } = Dimensions.get("window");
const numColumns = 5;
const cardSize = Math.min(width / numColumns - 16, 80); // Responsive card size
const isSmallDevice = height < 365;
const isLargeDevice = width > 768;

export default function HiraganaScreen() {
  const router = useRouter();
  const [hiraganaData, setHiraganaData] = useState<HiraganaItem[]>([]);
  const [fontLoaded] = useFonts({
    Kavoon: require("../assets/fonts/Kavoon-Regular.ttf"),
    Margarine: require("../assets/fonts/Margarine-Regular.ttf"),
  });

  useEffect(() => {
    fetch(JSON_URL)
      .then((res) => res.json())
      .then((data: HiraganaItem[]) => {
        setHiraganaData(data);
      })
      .catch((error) => {
        console.log("Error fetching data, using static structure:", error);
      });
  }, []);

  if (!fontLoaded) return null;

  const gridData = [
    [
      { hiragana: "あ", romaji: "a" },
      { hiragana: "い", romaji: "i" },
      { hiragana: "う", romaji: "u" },
      { hiragana: "え", romaji: "e" },
      { hiragana: "お", romaji: "o" },
    ],
    [
      { hiragana: "か", romaji: "ka" },
      { hiragana: "き", romaji: "ki" },
      { hiragana: "く", romaji: "ku" },
      { hiragana: "け", romaji: "ke" },
      { hiragana: "こ", romaji: "ko" },
    ],
    [
      { hiragana: "さ", romaji: "sa" },
      { hiragana: "し", romaji: "shi" },
      { hiragana: "す", romaji: "su" },
      { hiragana: "せ", romaji: "se" },
      { hiragana: "そ", romaji: "so" },
    ],
    [
      { hiragana: "た", romaji: "ta" },
      { hiragana: "ち", romaji: "chi" },
      { hiragana: "つ", romaji: "tsu" },
      { hiragana: "て", romaji: "te" },
      { hiragana: "と", romaji: "to" },
    ],
    [
      { hiragana: "な", romaji: "na" },
      { hiragana: "に", romaji: "ni" },
      { hiragana: "ぬ", romaji: "nu" },
      { hiragana: "ね", romaji: "ne" },
      { hiragana: "の", romaji: "no" },
    ],
    [
      { hiragana: "は", romaji: "ha" },
      { hiragana: "ひ", romaji: "hi" },
      { hiragana: "ふ", romaji: "fu" },
      { hiragana: "へ", romaji: "he" },
      { hiragana: "ほ", romaji: "ho" },
    ],
    [
      { hiragana: "ま", romaji: "ma" },
      { hiragana: "み", romaji: "mi" },
      { hiragana: "む", romaji: "mu" },
      { hiragana: "め", romaji: "me" },
      { hiragana: "も", romaji: "mo" },
    ],
    [
      { hiragana: "や", romaji: "ya" },
      { hiragana: "", romaji: "" },
      { hiragana: "ゆ", romaji: "yu" },
      { hiragana: "", romaji: "" },
      { hiragana: "よ", romaji: "yo" },
    ],
    [
      { hiragana: "ら", romaji: "ra" },
      { hiragana: "り", romaji: "ri" },
      { hiragana: "る", romaji: "ru" },
      { hiragana: "れ", romaji: "re" },
      { hiragana: "ろ", romaji: "ro" },
    ],
    [
      { hiragana: "わ", romaji: "wa" },
      { hiragana: "", romaji: "" },
      { hiragana: "", romaji: "" },
      { hiragana: "", romaji: "" },
      { hiragana: "を", romaji: "wo" },
    ],
    [
      { hiragana: "", romaji: "" },
      { hiragana: "", romaji: "" },
      { hiragana: "", romaji: "" },
      { hiragana: "", romaji: "" },
      { hiragana: "ん", romaji: "n" },
    ],
  ];

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
                {row.map((item, colIndex) => {
                  const key = `cell-${rowIndex}-${colIndex}`;

                  if (!item.hiragana) {
                    return (
                      <View key={key} style={[styles.card, styles.emptyCard]} />
                    );
                  }

                  return (
                    <View key={key} style={styles.card}>
                      <Text style={styles.hiraganaText}>{item.hiragana}</Text>
                      <Text style={styles.romajiText}>{item.romaji}</Text>
                    </View>
                  );
                })}
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
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
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
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: isSmallDevice ? 2 : 4,
  },
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
  emptyCard: {
    backgroundColor: "transparent",
    elevation: 0,
    shadowOpacity: 0,
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
  bottomSpacing: {
    height: isSmallDevice ? 30 : 50,
  },
});
