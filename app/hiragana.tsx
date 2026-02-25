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
import { Audio, AVPlaybackStatus, AVPlaybackStatusError  } from "expo-av";
import { useRouter } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const { width } = Dimensions.get("window");
const isTablet = width >= 768;

const numColumns = 5;
const cardSize = wp(isTablet ? "12%" : "16%");

// local json
const gridData = [
  [
    { hiragana: "あ", romaji: "a", audio: require("../assets/audio/a.mp3") },
    { hiragana: "い", romaji: "i", audio: require("../assets/audio/i.mp3") },
    { hiragana: "う", romaji: "u", audio: require("../assets/audio/u.mp3") },
    { hiragana: "え", romaji: "e", audio: require("../assets/audio/e.mp3") },
    { hiragana: "お", romaji: "o", audio: require("../assets/audio/o.mp3") },
  ],
  [
    { hiragana: "か", romaji: "ka", audio: require("../assets/audio/ka.mp3") },
    { hiragana: "き", romaji: "ki", audio: require("../assets/audio/ki.mp3") },
    { hiragana: "く", romaji: "ku", audio: require("../assets/audio/ku.mp3") },
    { hiragana: "け", romaji: "ke", audio: require("../assets/audio/ke.mp3") },
    { hiragana: "こ", romaji: "ko", audio: require("../assets/audio/ko.mp3") },
  ],
  [
    { hiragana: "さ", romaji: "sa", audio: require("../assets/audio/sa.mp3") },
    { hiragana: "し", romaji: "shi", audio: require("../assets/audio/shi.mp3") },
    { hiragana: "す", romaji: "su", audio: require("../assets/audio/su.mp3") },
    { hiragana: "せ", romaji: "se", audio: require("../assets/audio/se.mp3") },
    { hiragana: "そ", romaji: "so", audio: require("../assets/audio/so.mp3") },
  ],
  [
    { hiragana: "た", romaji: "ta", audio: require("../assets/audio/ta.mp3") },
    { hiragana: "ち", romaji: "chi", audio: require("../assets/audio/chi.mp3") },
    { hiragana: "つ", romaji: "tsu", audio: require("../assets/audio/tsu.mp3") },
    { hiragana: "て", romaji: "te", audio: require("../assets/audio/te.mp3") },
    { hiragana: "と", romaji: "to", audio: require("../assets/audio/to.mp3") },
  ],
  [
    { hiragana: "な", romaji: "na", audio: require("../assets/audio/na.mp3") },
    { hiragana: "に", romaji: "ni", audio: require("../assets/audio/ni.mp3") },
    { hiragana: "ぬ", romaji: "nu", audio: require("../assets/audio/nu.mp3") },
    { hiragana: "ね", romaji: "ne", audio: require("../assets/audio/ne.mp3") },
    { hiragana: "の", romaji: "no", audio: require("../assets/audio/no.mp3") },
  ],
  [
    { hiragana: "は", romaji: "ha", audio: require("../assets/audio/ha.mp3") },
    { hiragana: "ひ", romaji: "hi", audio: require("../assets/audio/hi.mp3") },
    { hiragana: "ふ", romaji: "fu", audio: require("../assets/audio/fu.mp3") },
    { hiragana: "へ", romaji: "he", audio: require("../assets/audio/he.mp3") },
    { hiragana: "ほ", romaji: "ho", audio: require("../assets/audio/ho.mp3") },
  ],
  [
    { hiragana: "ま", romaji: "ma", audio: require("../assets/audio/ma.mp3") },
    { hiragana: "み", romaji: "mi", audio: require("../assets/audio/mi.mp3") },
    { hiragana: "む", romaji: "mu", audio: require("../assets/audio/mu.mp3") },
    { hiragana: "め", romaji: "me", audio: require("../assets/audio/me.mp3") },
    { hiragana: "も", romaji: "mo", audio: require("../assets/audio/mo.mp3") },
  ],
  [
    { hiragana: "や", romaji: "ya", audio: require("../assets/audio/ya.mp3") },
    { hiragana: "", romaji: "", audio: undefined },
    { hiragana: "ゆ", romaji: "yu", audio: require("../assets/audio/yu.mp3") },
    { hiragana: "", romaji: "", audio: undefined },
    { hiragana: "よ", romaji: "yo", audio: require("../assets/audio/yo.mp3") },
  ],
  [
    { hiragana: "ら", romaji: "ra", audio: require("../assets/audio/ra.mp3") },
    { hiragana: "り", romaji: "ri", audio: require("../assets/audio/ri.mp3") },
    { hiragana: "る", romaji: "ru", audio: require("../assets/audio/ru.mp3") },
    { hiragana: "れ", romaji: "re", audio: require("../assets/audio/re.mp3") },
    { hiragana: "ろ", romaji: "ro", audio: require("../assets/audio/ro.mp3") },
  ],
  [
    { hiragana: "わ", romaji: "wa", audio: require("../assets/audio/wa.mp3") },
    { hiragana: "", romaji: "", audio: undefined },
    { hiragana: "", romaji: "", audio: undefined },
    { hiragana: "", romaji: "", audio: undefined },
    { hiragana: "を", romaji: "wo", audio: require("../assets/audio/wo.mp3") },
  ],
  [
    { hiragana: "", romaji: "", audio: undefined },
    { hiragana: "", romaji: "", audio: undefined },
    { hiragana: "", romaji: "", audio: undefined },
    { hiragana: "", romaji: "", audio: undefined },
    { hiragana: "ん", romaji: "n", audio: require("../assets/audio/n.mp3") },
  ],
];

export default function HiraganaScreen() {
  const router = useRouter();
  const [fontLoaded] = useFonts({
    Kavoon: require("../assets/fonts/Kavoon-Regular.ttf"),
    Margarine: require("../assets/fonts/Margarine-Regular.ttf"),
  });

  if (!fontLoaded) return null;

const playAudio = async (audio?: number) => {
  if (!audio) return;

  try {
    const { sound } = await Audio.Sound.createAsync(audio);

    await sound.playAsync();

    sound.setOnPlaybackStatusUpdate(async (status) => {
      if (status.isLoaded && status.didJustFinish) {
        await sound.unloadAsync();
      }
    });

  } catch (error) {
    console.log("Audio error:", error);
  }
};
  const startQuiz = () => {
    router.push("/question?category=Hiragana&index=0&score=0");
  };

  return (
    // <SafeAreaView style={styles.safeArea}>
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
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },

  headerContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: hp("6%"),
    marginBottom: hp("3%"),
  },

  quizButton: {
    width: wp(isTablet ? "40%" : "70%"),
    height: hp("8%"),
    borderRadius: wp("10%"),
    borderWidth: wp("1%"),
    borderColor: "#ff69b4",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },

  quizButtonPressed: {
    backgroundColor: "#fff0f6",
    transform: [{ scale: 0.97 }],
  },

  quizButtonText: {
    fontSize: wp(isTablet ? "3.5%" : "5%"),
    fontFamily: "Kavoon",
    color: "#333",
    textAlign: "center",
  },

  scrollContent: {
    flexGrow: 1,
    paddingVertical: hp("2%"),
    alignItems: "center",
  },

  gridContainer: {
    width: "100%",
    maxWidth: 600,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: wp("4%"),
    padding: wp("3%"),
    elevation: 4,
  },

  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: hp("0.5%"),
  },

  card: {
    width: cardSize,
    height: cardSize,
    margin: wp("1%"),
    borderRadius: wp("3%"),
    backgroundColor: "#ffe6f2",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },

  hiraganaText: {
    fontSize: wp(isTablet ? "4%" : "6%"),
    fontFamily: "Kavoon",
    color: "#2c3e50",
  },

  romajiText: {
    fontSize: wp(isTablet ? "2.5%" : "3.5%"),
    fontFamily: "Margarine",
    color: "#7f8c8d",
    marginTop: hp("0.5%"),
  },

  bottomSpacing: {
    height: hp("5%"),
  },
});
