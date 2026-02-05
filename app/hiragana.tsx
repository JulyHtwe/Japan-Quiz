import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  Pressable,
  Dimensions,
  ScrollView,
} from "react-native";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
const JSON_URL =
  "https://raw.githubusercontent.com/JulyHtwe/japan_quiz/main/hiragana.json";

const { width } = Dimensions.get("window");
const numColumns = 5;
const cardSize = width / numColumns - 12;

type HiraganaItem = {
  hiragana: string;
  romaji: string;
  audio?: string;
};

import { useRouter } from "expo-router";

const createExactGridStructure = () => {
  return [
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
};

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

  const gridData = createExactGridStructure();

  return (
    <ImageBackground
      source={require("../assets/images/bg_3.png")}
      style={styles.bgImage}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Pressable
          onPress={() =>
            router.push("/question?category=Hiragana&index=0&score=0")
          }
          style={({ pressed }) => [
            styles.quizBtn,
            { backgroundColor: pressed ? "#ffe6f0" : "white" },
          ]}
        >
          <Text style={styles.quizBtnText}>Start Hiragana Quiz</Text>
        </Pressable>

 
        <View style={styles.gridContainer}>
          {gridData.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((item, colIndex) => {
       
                if (!item.hiragana) {
                  return (
                    <View
                      key={`${rowIndex}-${colIndex}`}
                      style={[styles.card, styles.emptyCard]}
                    />
                  );
                }

                return (
                  <View key={`${rowIndex}-${colIndex}`} style={styles.card}>
                    <Text style={styles.hiragana}>{item.hiragana}</Text>
                    <Text style={styles.romaji}>{item.romaji}</Text>
                  </View>
                );
              })}
            </View>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bgImage: { flex: 1, width: "100%", height: "100%" },
  scrollContainer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  gridContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  card: {
    width: cardSize,
    height: cardSize,
    margin: 5,
    borderRadius: 8,
    backgroundColor: "#ffe6f0",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  emptyCard: {
    backgroundColor: "transparent",
    shadowOpacity: 0,
    elevation: 0,
    borderWidth: 0,
  },
  hiragana: {
    fontSize: 28,
    fontFamily: "Kavoon",
    fontWeight: "bold",
    color: "#333",
  },
  romaji: {
    fontSize: 14,
    marginTop: 5,
    fontFamily: "Margarine",
    color: "#555",
  },
  quizBtn: {
    width: 200,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "pink",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    elevation: 5,
  },
  quizBtnText: {
    fontSize: 20,
    fontFamily: "Kavoon",
    color: "#333",
  },
});
