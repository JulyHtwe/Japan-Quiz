import { StyleSheet, ImageBackground, Text, View } from 'react-native';
export default function HomeScreen() {
  return (
    <ImageBackground
      source={require('../../assets/images/bg_1.png')}
      style={styles.bgImage}
    >
      <View>
        <Text style={[styles.header, {marginTop: '20%'}]}>Hello Japan</Text>
        <Text style={styles.header}>Quiz</Text>
      </View>
      <View>
        <Text style= {[styles.middleText,{marginTop: '10%'}]}>Let's Learn</Text>
        <Text style= {styles.middleText}>Japanese Vocab</Text>
        <Text style= {styles.middleText}>The Fun Way!</Text>
        <Text style= {[styles.middleText,{marginTop: '15%'}]}>Ready it test your</Text>
        <Text style= {styles.middleText}>Brain</Text>

        <View style= {[styles.btn]}>
          <Text style= {[styles.middleText,{color: 'black', fontSize: 30}]}>Start Quiz</Text>
        </View>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  header: {
    fontSize : 50,
    color: 'black',
    fontFamily: 'Kavoon',
    textDecorationColor: 'white',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    textShadowColor: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  middleText: {
    fontSize : 35,
    color: 'white',
    fontFamily: 'Kavoon',
    textDecorationColor: 'pink',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    fontWeight: 'bold',
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
    fontWeight: 'bold',
  },
  btn:{
    width: 300,
    height: 70,
    backgroundColor: 'white',
    borderColor: 'pink',
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 30,
    alignSelf: 'center'
  }
});
