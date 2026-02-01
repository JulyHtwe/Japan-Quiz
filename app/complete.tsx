import { StyleSheet, ImageBackground, Text, View, Image } from "react-native";
import { useFonts } from "expo-font";
export default function HomeScreen() {
  const [fontLoaded] = useFonts({
    Kavoon: require("../assets/fonts/Kavoon-Regular.ttf"),
    Margarine: require("../assets/fonts/Margarine-Regular.ttf"),
  });
  if (!fontLoaded) {
    return null;
  }
  return (
    <ImageBackground
      source={require("../assets/images/bg_5.png")}
      style={styles.bgImage}
    >
      <View style={[styles.complete_btn, { marginTop: "20%" }]}>
        <Text style={[styles.cat_middleText, { color: "black", fontSize: 30 }]}>
          Quiz Complete
        </Text>
      </View>
      <Text style= {{color: 'white', fontSize: 40, textAlign: 'center', marginTop: 10, fontWeight: 'bold',paddingTop: 10,textShadowColor:"black",
          textShadowOffset: { width: 3, height: 3 },
          textShadowRadius: 7,}}>You got</Text>
          <View style= {{flexDirection:'row',gap: 40,width:'100%',alignItems:"center",justifyContent:'center'}}>
      <Text style={[styles.score,{color:"yellow"}]} >
        7
      </Text>
      <Text style={[styles.score,{fontSize:30,fontFamily:'Margarine'}]} >
        out
      </Text>
      <Text style={[styles.score,{color:"yellow"}]} >
        10
      </Text>
      </View>
       <Text style= {{color: 'white', fontSize: 20, textAlign: 'center', marginTop: 10, fontWeight: 'bold',textShadowColor:"black", fontFamily: 'Kavoon' ,
          textShadowOffset: { width: 3, height: 3 },
          textShadowRadius: 7,}}>Great Job!</Text>
          <Text style= {{color: 'white', fontSize: 20, textAlign: 'center', marginTop: 10,textShadowColor:"black", fontFamily: 'Kavoon', 
          textShadowOffset: { width: 3, height: 3 },
          textShadowRadius: 7,}}>Japanese is proud of you!</Text> 
          <Text style= {{color: 'white', fontSize: 30, textAlign: 'center', marginTop: 50,textShadowColor:"black", fontFamily: 'Kavoon', 
          textShadowOffset: { width: 3, height: 3 },
          textShadowRadius: 7,}}>Practice makes perfect!</Text>   

          <View style={{flexDirection: 'row', gap:20, alignItems: 'center', justifyContent: 'center'}}>
            <View style={styles.btn}>
            <Image source = {require("../assets/images/refresh.png")} style={[styles.icon,{width:40,height:40}]}></Image>
              <Text style={[styles.middleText, { color: "black", fontSize: 21 }]}>
                Play Again
              </Text>
            </View>
            <View style={styles.btn}>
            <Image source = {require("../assets/images/wave.png")} style={styles.icon}></Image>
              <Text style={[styles.middleText, { color: "black", fontSize: 21 }]}>
                Exit
              </Text>
              <Image source = {require("../assets/images/wave.png")} style={styles.icon}></Image>
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
  question_no: {
    paddingTop: 50,
    fontSize: 20,
    color: "black",
    fontFamily: "Kavoon",
    textShadowColor: "white",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    textAlign: "left",
    paddingLeft: 0,
    marginLeft: 0,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  complete_btn: {
    flexDirection: "row",
    gap: 30,
    width: 300,
    height: 100,
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
    textShadowRadius: 8,
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
    borderColor: "yellow",
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
    flexDirection:'row',
    gap:15,
    marginTop: 100,
    width: 180,
    height: 60,
    backgroundColor: "white",
    borderColor: "pink",
    borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    alignSelf: "center",
  },
  icon: {
    width:50,
    height:50
  },
  score: {
    color: "white",
          fontSize: 80,
          textAlign: "center",
          fontFamily: "Kavoon",
          textShadowColor:"black",
          textShadowOffset: { width: 3, height: 3 },
          textShadowRadius: 7,
  },
});
