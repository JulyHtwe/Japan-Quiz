import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  Image,
  Pressable,
  Dimensions,
  TextInput,
} from "react-native";
import { useFonts } from "expo-font";
import { router } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// Helper to scale fonts proportionally
const { width, height } = Dimensions.get("window");
const isTablet = width >= 768;

const scaleFont = (percent: any) => {
  const value = wp(percent);
  if (isTablet) return value * 0.8;
  return value;
};

export default function HomeScreen() {
  const [fontLoaded] = useFonts({
    Kavoon: require("../assets/fonts/Kavoon-Regular.ttf"),
  });

  if (!fontLoaded) return null;

  return (
    <ImageBackground
      source={require("../assets/images/bg_1.png")}
      style={styles.bgImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerSection}>
          <View style={styles.flagRow}>
            <Image
              source={require("../assets/images/japan-flag.png")}
              style={styles.flag}
            />
            <Text style={[styles.mainTitle,{marginTop: hp("1%")}]}>Login</Text>
            <Image
              source={require("../assets/images/japan-flag.png")}
              style={styles.flag}
            />
          </View>
        </View>

        <View style={styles.contentSection}>
          <TextInput
            style={[styles.startButton, styles.buttonText]}
            placeholder="Username"
          ></TextInput>
          <TextInput
            style={[styles.startButton, styles.buttonText]}
            placeholder="Password"
          ></TextInput>
          <View style={[styles.buttonSection, { marginTop: hp("0%") }]}>
          <Pressable
            style={({ pressed }) => [
              styles.startButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => router.push("/categories")}
          >
            <Image
              source={require("../assets/images/b1-startup.png")}
              style={styles.buttonIconLeft}
            />
            <Text style={styles.buttonText}>Login</Text>
            <Image
              source={require("../assets/images/b1-startup.png")}
              style={styles.buttonIconRight}
            />
          </Pressable>
        </View>        
        </View>
                {/*  google auth session*/}
                <Image source={require("../assets/images/google.png")} style={[styles.flag,styles.buttonIconLeft]}></Image>
            <Text style={styles.buttonText}>Login with Google</Text>
        {/* Content */}
        <View style={styles.contentSection}>
          <Image
            source={require("../assets/images/b1_girl.png")}
            style={styles.girlImage}
          />
        </View>

        {/* Button */}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: wp("5%"),
    paddingTop: hp("10%"),
    paddingBottom: hp("5%"),
  },
  headerSection: {
    alignItems: "center",
  },
  mainTitle: {
    fontSize: scaleFont("11%"), // scaled font
    color: "black",
    fontFamily: "Kavoon",
    textShadowColor: "white",
    textShadowOffset: { width: wp("0.5%"), height: wp("0.5%") },
    textShadowRadius: wp("1%"),
    textAlign: "center",
  },
  flagRow: {
    gap: hp("2%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp("1%"),
  },
  flag: {
    width: wp("20%"),
    height: wp("20%"),
    resizeMode: "contain",
  },
  quizTitle: {
    fontSize: scaleFont("11%"),
    color: "black",
    fontFamily: "Kavoon",
    textShadowColor: "white",
    textShadowOffset: { width: wp("0.5%"), height: wp("0.5%") },
    textShadowRadius: wp("1%"),
    marginHorizontal: wp("4%"),
  },
  contentSection: {
    flex: 1,
    gap: hp("5%"),
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp("3%"),
  },
  textBlock: {
    marginTop: hp("2%"),
    alignItems: "center",
    marginBottom: hp("3%"),
  },
  contentText: {
    fontSize: scaleFont("9%"),
    color: "white",
    fontFamily: "Kavoon",
    textShadowColor: "pink",
    textShadowOffset: { width: wp("0.5%"), height: wp("0.5%") },
    textShadowRadius: wp("2%"),
    textAlign: "center",
    lineHeight: hp("7%"),
  },
  girlImage: {
    position: "absolute",
    bottom: hp("5%"),
    right: wp("2%"),
    width: wp("20%"),
    height: wp("20%"),
    resizeMode: "contain",
    transform: [{ rotate: "330deg" }],
  },
  buttonSection: {
    alignItems: "center",
    // marginTop: hp("1%"),
  },
  startButton: {
    width: wp("80%"),
    height: hp("8%"),
    backgroundColor: "white",
    borderColor: "pink",
    borderWidth: wp("1%"),
    borderRadius: wp("50%"),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    fontSize: scaleFont("7%"),
    color: "black",
    fontFamily: "Kavoon",
    textAlign: "center",
  },
  buttonIconLeft: {
    width: wp("8%"),
    height: wp("8%"),
    resizeMode: "contain",
    position: "absolute",
    left: wp("5%"),
  },
  buttonIconRight: {
    width: wp("8%"),
    height: wp("8%"),
    resizeMode: "contain",
    position: "absolute",
    right: wp("5%"),
  },
});
