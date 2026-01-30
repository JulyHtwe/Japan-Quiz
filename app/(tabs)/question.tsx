import { StyleSheet, ImageBackground, Text, View, Image } from "react-native";
import { useFonts } from "expo-font";
export default function HomeScreen() {
  const [fontLoaded] = useFonts({
    Kavoon: require("../../assets/fonts/Kavoon-Regular.ttf"),
    Margarine: require("../../assets/fonts/Margarine-Regular.ttf"),
  });
  if (!fontLoaded) {
    return null;
  }
  return (
    <ImageBackground
      source={require("../../assets/images/bg_3.png")}
      style={styles.bgImage}
    >
      <View style={styles.container}>
        <Text style={styles.question_no}>Questions 3 of 10</Text>
      </View>
      <View style={[styles.cat_btn, { marginTop: "20%" }]}>
        <Text style={[styles.cat_middleText, { color: "black", fontSize: 30 }]}>
          What does this japanese word mean?
        </Text>
      </View>
      <Text
        style={{
          color: "black",
          fontSize: 100,
          textAlign: "center",
          marginTop: 10,
          fontFamily: "Kavoon",
        }}
      >
        いぬ
      </Text>
      <View style={[styles.sound_btn]}>
        <Image
          source={require("../../assets/images/volume.png")}
          style={{ width: 30, height: 30 }}
        />
        <Text style={[styles.middleText, { color: "black" }]}>Hear it!</Text>
      </View>
      <View style= {[styles.answerContainer]}>
        <View style= {[styles.circle]}>
            {/* <Image source={require("../../assets/images/answer.png")} style={{ width: 30, height: 30 }} /> */}
        </View>
        <View style= {[styles.circle]}>
            {/* <Image source={require("../../assets/images/answer.png")} style={{ width: 30, height: 30 }} /> */}
        </View>
        <View style= {[styles.circle]}>
            {/* <Image source={require("../../assets/images/answer.png")} style={{ width: 30, height: 30 }} /> */}
        </View>
        <View style= {[styles.circle]}>
            {/* <Image source={require("../../assets/images/answer.png")} style={{ width: 30, height: 30 }} /> */}
        </View>
      </View>
      <View style={[styles.btn]}>
                  <Text style={[styles.middleText, { color: "black", fontSize: 30 }]}>
                    Comfirm
                  </Text>
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
  question_no: {
    paddingTop: 50,
    fontSize: 20,
    color: "black",
    fontFamily: "Kavoon",
    textShadowColor: "white",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    // textShadowColor: 'white',
    // fontWeight: 'bold',
    textAlign: "left",
    paddingLeft: 0,
    marginLeft: 0,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  cat_btn: {
    flexDirection: "row",
    gap: 30,
    width: 350,
    height: 130,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 75,
    alignSelf: "center",
  },
  cat_middleText: {
    fontSize: 35,
    color: "white",
    fontFamily: "Margarine",
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
  sound_btn: {
    flexDirection: "row",
    gap: 10,
    width: 150,
    height: 50,
    backgroundColor: "white",
    borderColor: "pink",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    alignSelf: "center",
  },
  middleText: {
    fontSize: 20,
    color: "black",
    fontFamily: "Kavoon",
    // textShadowColor: "pink",
    // textShadowOffset: { width: 2, height: 2 },
    // textShadowRadius: 8,
    // fontWeight: 'bold',
    textAlign: "center",
  },
  circle:{
    width:80,
    height:80,
    borderRadius:50,
    backgroundColor:'white',
    justifyContent:'center',
  },
  answerContainer:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30
  },
    btn: {
    position: "absolute",
    bottom: 0,
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
});
