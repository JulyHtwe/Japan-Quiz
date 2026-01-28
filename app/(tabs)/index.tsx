import { StyleSheet, ImageBackground, Text, View ,Image} from 'react-native';
import { useFonts } from 'expo-font';
export default function HomeScreen() {
const [fontLoaded] = useFonts({
  Kavoon:require('../../assets/fonts/Kavoon-Regular.ttf'),
  // DancingScript:require('../../assets/fonts/DancingScript-VariableFont_wght.ttf'),
})
 if(!fontLoaded){
  return null;
 }
  return (
    <ImageBackground
      source={require('../../assets/images/bg_1.png')}
      style={styles.bgImage}
    >
      <View>
        <Text style={[styles.header, {marginTop: '15%'}]}>Hello Japan</Text>
        <View style= {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20,gap:30}}>
        <Image source={require('../../assets/images/japan-flag.png')} style={{width: 80, height: 80}}></Image>
        <Text style={styles.header}>Quiz</Text>
        <Image source={require('../../assets/images/japan-flag.png')} style={{width: 80, height: 80}}></Image>
        </View>
      </View>
      <View>
        <Text style= {[styles.middleText,{marginTop: '10%'}]}>Let's Learn</Text>
        <Text style= {styles.middleText}>Japanese Vocab</Text>
        <Text style= {styles.middleText}>The Fun Way!</Text>
        <Text style= {[styles.middleText,{marginTop: '15%'}]}>Ready it test your</Text>
        <Text style= {styles.middleText}>Brain</Text>
        <View style= {[styles.btn]}>
          <Image source={require('../../assets/images/b1-startup.png')} style= {{position: 'absolute', left: 15,width: 45, height: 45}}></Image>
          <Text style= {[styles.middleText,{color: 'black', fontSize: 30}]}>Start Quiz</Text>
          <Image source={require('../../assets/images/b1-startup.png')} style= {{position: 'absolute', right: 15,width: 45, height: 45}}></Image>
        </View>
      </View>
      <Image source={require('../../assets/images/b1_girl.png')} style= {{position: 'absolute', bottom: 130, right: 0,width: 80, height: 80,transform:[{rotate: '330deg'}]}}></Image>
      {/* <Image source={require('../../assets/images/b1_boy.png')} style= {{position: 'absolute', bottom: 270, left: 0,width: 80, height: 80,zIndex:0,transform:[{rotate: '10deg'}]}}></Image> */}
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
  header: {
    fontSize : 50,
    color: 'black',
    fontFamily: 'Kavoon',
    textShadowColor: 'white',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    // textShadowColor: 'white',
    // fontWeight: 'bold',
    textAlign: 'center'
  },
  middleText: {
    fontSize : 35,
    color: 'white',
    fontFamily: 'Kavoon',
    textShadowColor: 'pink',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
    // fontWeight: 'bold',
    textAlign: 'center'
  },
  bgImage: {
    flex: 1,           
    width: '100%',
    height: '100%',
  },
  text: {
    color: '#fff',
    fontSize: 24,
    // fontWeight: 'bold',
  },
  btn:{
    position: 'absolute',
    bottom: -140,
    width: 300,
    height: 70,
    backgroundColor: 'white',
    borderColor: 'pink',
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    alignSelf: 'center'
  }
});
