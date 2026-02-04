import { StyleSheet, ImageBackground, Text, View, Image, Pressable } from 'react-native';
import { useFonts } from 'expo-font';
import { router } from 'expo-router';
import { 
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function HomeScreen() {
  const [fontLoaded] = useFonts({
    Kavoon: require('../assets/fonts/Kavoon-Regular.ttf'),
  });

  if(!fontLoaded) {
    return null;
  }

  return (
    <ImageBackground
      source={require('../assets/images/bg_1.png')}
      style={styles.bgImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerSection}>
          <Text style={styles.mainTitle}>Hello Japan</Text>
          <View style={styles.flagRow}>
            <Image 
              source={require('../assets/images/japan-flag.png')} 
              style={styles.flag}
            />
            <Text style={styles.quizTitle}>Quiz</Text>
            <Image 
              source={require('../assets/images/japan-flag.png')} 
              style={styles.flag}
            />
          </View>
        </View>

        {/* Content */}
        <View style={styles.contentSection}>
          <View style={styles.textBlock}>
            <Text style={styles.contentText}>Let's Learn</Text>
            <Text style={styles.contentText}>Japanese Vocab</Text>
            <Text style={styles.contentText}>The Fun Way!</Text>
          </View>
          
          <View style={styles.textBlock}>
            <Text style={styles.contentText}>Ready to test your</Text>
            <Text style={styles.contentText}>Brain</Text>
          </View>

          <Image 
            source={require('../assets/images/b1_girl.png')} 
            style={styles.girlImage}
          />
        </View>

        {/* Button */}
        <View style={styles.buttonSection}>
          <Pressable 
            style={({ pressed }) => [
              styles.startButton,
              pressed && styles.buttonPressed
            ]} 
            onPress={() => router.push('/categories')}
          >
            <Image 
              source={require('../assets/images/b1-startup.png')} 
              style={styles.buttonIconLeft}
            />
            <Text style={styles.buttonText}>Start Quiz</Text>
            <Image 
              source={require('../assets/images/b1-startup.png')} 
              style={styles.buttonIconRight}
            />
          </Pressable>
        </View>
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
    paddingHorizontal: wp('5%'),
    paddingTop: hp('10%'),
    paddingBottom: hp('5%'),
  },
  headerSection: {
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: wp('11%'),
    color: 'black',
    fontFamily: 'Kavoon',
    textShadowColor: 'white',
    textShadowOffset: { width: wp('0.5%'), height: wp('0.5%') },
    textShadowRadius: wp('1%'),
    textAlign: 'center',
  },
  flagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('1%'),
  },
  flag: {
    width: wp('20%'),
    height: wp('20%'),
    resizeMode: 'contain',
  },
  quizTitle: {
    fontSize: wp('11%'),
    color: 'black',
    fontFamily: 'Kavoon',
    textShadowColor: 'white',
    textShadowOffset: { width: wp('0.5%'), height: wp('0.5%') },
    textShadowRadius: wp('1%'),
    marginHorizontal: wp('4%'),
  },
  contentSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('1%'),
  },
  textBlock: {
    marginTop: hp('2%'),
    alignItems: 'center',
    marginBottom: hp('3%'),
  },
  contentText: {
    fontSize: wp('9%'),
    color: 'white',
    fontFamily: 'Kavoon',
    textShadowColor: 'pink',
    textShadowOffset: { width: wp('0.5%'), height: wp('0.5%') },
    textShadowRadius: wp('2%'),
    textAlign: 'center',
    lineHeight: hp('7%'),
  },
  girlImage: {
    position: 'absolute',
    bottom: hp('5%'),
    right: wp('2%'),
    width: wp('20%'),
    height: wp('20%'),
    resizeMode: 'contain',
    transform: [{ rotate: '330deg' }],
  },
  buttonSection: {
    alignItems: 'center',
    marginBottom: hp('5%'),
  },
  startButton: {
    width: wp('80%'),
    height: hp('8%'),
    backgroundColor: 'white',
    borderColor: 'pink',
    borderWidth: wp('1%'),
    borderRadius: wp('50%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
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
    fontSize: wp('7%'),
    color: 'black',
    fontFamily: 'Kavoon',
    textAlign: 'center',
  },
  buttonIconLeft: {
    width: wp('8%'),
    height: wp('8%'),
    resizeMode: 'contain',
    position: 'absolute',
    left: wp('5%'),
  },
  buttonIconRight: {
    width: wp('8%'),
    height: wp('8%'),
    resizeMode: 'contain',
    position: 'absolute',
    right: wp('5%'),
  },
});