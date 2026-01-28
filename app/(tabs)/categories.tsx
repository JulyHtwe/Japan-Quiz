import { StyleSheet, ImageBackground, Text, View, Image } from "react-native";
import { useFonts } from "expo-font";
export default function HomeScreen() {
  const [fontLoaded] = useFonts({
    Kavoon: require("../../assets/fonts/Kavoon-Regular.ttf"),
  });
  if (!fontLoaded) {
    return null;
  }
  return (
    <ImageBackground
      source={require("../../assets/images/bg_1.png")}
      style={styles.bgImage}
    >
      <View>
        <Text style={[styles.header, { marginTop: "15%" }]}>Categories</Text>
        <View style={styles.container}>
          <View style={[styles.cat_btn, { marginTop: "10%" }]}>
            <Image
              style={styles.cate_png}
              source={require("../../assets/images/cate_foot.png")}
            ></Image>
            <Text
              style={[styles.cat_middleText, { color: "black", fontSize: 30 }]}
            >
              Animals
            </Text>
          </View>
          <View style={[styles.cat_btn, { marginTop: "10%" }]}>
            <Image
              style={styles.cate_png}
              source={require("../../assets/images/cate_number.png")}
            ></Image>
            <Text
              style={[styles.cat_middleText, { color: "black", fontSize: 30 }]}
            >
              Numbers
            </Text>
          </View>
          <View style={[styles.cat_btn, { marginTop: "10%" }]}>
            <Image
              style={styles.cate_png}
              source={require("../../assets/images/cate_countries.png")}
            ></Image>
            <Text
              style={[styles.cat_middleText, { color: "black", fontSize: 30 }]}
            >
              Countries
            </Text>
          </View>
          <View style={[styles.cat_btn, { marginTop: "10%" }]}>
            <Image
              style={styles.cate_png}
              source={require("../../assets/images/cate_food.png")}
            ></Image>
            <Text
              style={[styles.cat_middleText, { color: "black", fontSize: 30 }]}
            >
              Foods
            </Text>
          </View>
        </View>
        <View style={[styles.btn]}>
            <Text style={[styles.middleText, { color: "black", fontSize: 30 }]}>
              Comfirm
            </Text>
        </View>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  header: {
    fontSize: 50,
    color: "black",
    fontFamily: "Kavoon",
    textShadowColor: "white",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    // textShadowColor: 'white',
    // fontWeight: 'bold',
    textAlign: "center",
  },
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  cat_btn: {
    flexDirection: "row",
    gap: 20,
    width: 300,
    height: 60,
    backgroundColor: "white",
    // borderColor: 'pink',
    // borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    // marginTop: 30,
    alignSelf: "center",
  },
  cat_middleText: {
    fontSize: 35,
    color: "white",
    fontFamily: "Kavoon",
    // textShadowColor: 'pink',
    // textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
    // fontWeight: 'bold',
    textAlign: "center",
  },
  cate_png: {
    width: 50,
    height: 50,
  },
  btn: {
    position: "absolute",
    bottom: -140,
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
  middleText: {
    fontSize: 35,
    color: "white",
    fontFamily: "Kavoon",
    textShadowColor: "pink",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
    // fontWeight: 'bold',
    textAlign: "center",
  },
});
