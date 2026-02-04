import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  Image,
  Pressable,
  Dimensions,
  ScrollView,
} from "react-native";
import { useFonts } from "expo-font";
import { useState } from "react";
import { router } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function CategoriesScreen() {
  const [selected, setSelected] = useState<string | null>(null);
  const { width, height } = Dimensions.get("window");
  const isSmallScreen = height < 700;
  const isTablet = width >= 768;

  const [fontLoaded] = useFonts({
    Kavoon: require("../assets/fonts/Kavoon-Regular.ttf"),
  });

  if (!fontLoaded) return null;

  const categories = [
    { name: "Animals", image: require("../assets/images/cate_foot.png") },
    { name: "Numbers", image: require("../assets/images/cate_number.png") },
    { name: "Fruits", image: require("../assets/images/fruit.png") },
    { name: "Foods", image: require("../assets/images/cate_food.png") },
  ];

  return (
    <ImageBackground
      source={require("../assets/images/bg_1.png")}
      style={styles.bgImage}
      resizeMode="cover"
    >

      <View style={[styles.headerContainer, {
        marginTop: isSmallScreen ? hp('10%') : hp('11%')
      }]}>
        <Text style={[
          styles.header,
          isTablet && styles.headerTablet
        ]}>
          Categories
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={[
          styles.container,
          isTablet && styles.containerTablet
        ]}>
          {categories.map((cat) => {
            const isSelected = selected === cat.name;

            return (
              <Pressable
                key={cat.name}
                onPress={() => setSelected(cat.name)}
                style={({ pressed }) => [
                  styles.cat_btn,
                  isSmallScreen && styles.cat_btnSmall,
                  isTablet && styles.cat_btnTablet,
                  {
                    borderWidth: wp('1%'),
                    borderColor: isSelected ? "pink" : "white",
                    backgroundColor: pressed
                      ? "#ffe6f0"
                      : isSelected
                      ? "#ffd6ea"
                      : "white",
                    transform: [{ scale: pressed ? 1.05 : 1 }],
                    shadowColor: isSelected ? "pink" : "#000",
                    shadowOpacity: isSelected ? 0.3 : 0.1,
                    shadowRadius: isSelected ? wp('2%') : wp('1%'),
                    elevation: isSelected ? 8 : 3,
                  },
                ]}
              >
                <Image 
                  source={cat.image} 
                  style={[
                    styles.cate_png,
                    isSmallScreen && styles.cate_pngSmall,
                    isTablet && styles.cate_pngTablet
                  ]} 
                />
                <Text style={[
                  styles.cat_middleText,
                  isSmallScreen && styles.cat_middleTextSmall,
                  isTablet && styles.cat_middleTextTablet
                ]}>
                  {cat.name}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Pressable
          disabled={!selected}
          style={({ pressed }) => [
            styles.btn,
            isSmallScreen && styles.btnSmall,
            isTablet && styles.btnTablet,
            {
              borderColor: selected ? "pink" : "#cccccc",
              opacity: selected ? 1 : 0.6,
              backgroundColor: pressed ? "#ffe6f0" : "white",
              transform: [{ scale: pressed ? 0.97 : 1 }],
              shadowColor: selected ? "pink" : "#000",
              shadowOpacity: selected ? 0.3 : 0.1,
              shadowRadius: selected ? wp('2%') : wp('1%'),
              elevation: selected ? 8 : 3,
            },
          ]}
          onPress={() => {
            if (selected) router.push(`/question?category=${selected}`);
          }}
        >
          <Text style={[
            styles.btnText,
            isSmallScreen && styles.btnTextSmall,
            isTablet && styles.btnTextTablet,
            !selected && styles.btnTextDisabled
          ]}>
            Confirm
          </Text>
        </Pressable>
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
  headerContainer: {
    alignItems: "center",
    width: "100%",
  },
  header: {
    fontSize: wp('11%'),
    color: "black",
    fontFamily: "Kavoon",
    textShadowColor: "white",
    textShadowOffset: { width: wp('0.5%'), height: wp('0.5%') },
    textShadowRadius: wp('1.5%'),
    textAlign: "center",
    includeFontPadding: false,
  },
  headerTablet: {
    fontSize: wp('12%'),
    marginBottom: hp('2%'),
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: hp('20%'), 
  },
  container: {
    flex: 1,
    gap: hp('3%'),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp('5%'),
    marginTop: hp('0%'),
  },
  containerTablet: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "flex-start",
    paddingHorizontal: wp('10%'),
  },
  cat_btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: wp('80%'),
    height: hp('8%'),
    borderRadius: wp('50%'),
    marginVertical: hp('1.5%'),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: wp('0.5%') },
    shadowOpacity: 0.2,
    shadowRadius: wp('1%'),
    elevation: 4,
  },
  cat_btnSmall: {
    width: wp('85%'),
    height: hp('7%'),
    marginVertical: hp('1%'),
  },
  cat_btnTablet: {
    width: wp('35%'),
    height: hp('10%'),
    margin: hp('1.5%'),
    borderRadius: wp('25%'),
  },
  cate_png: {
    width: wp('12%'),
    height: wp('12%'),
    resizeMode: "contain",
  },
  cate_pngSmall: {
    width: wp('10%'),
    height: wp('10%'),
  },
  cate_pngTablet: {
    width: wp('8%'),
    height: wp('8%'),
  },
  cat_middleText: {
    fontSize: wp('6%'),
    fontFamily: "Kavoon",
    textAlign: "center",
    color: "#333",
    marginLeft: wp('4%'),
    includeFontPadding: false,
  },
  cat_middleTextSmall: {
    fontSize: wp('5.5%'),
    marginLeft: wp('3%'),
  },
  cat_middleTextTablet: {
    fontSize: wp('5%'),
    marginLeft: wp('2%'),
  },
  buttonContainer: {
    position: "absolute",
    bottom: hp('10%'),
    left: 0,
    right: 0,
    alignItems: "center",
    paddingHorizontal: wp('5%'),
  },
  btn: {
    width: wp('70%'),
    height: hp('8%'),
    borderWidth: wp('1%'),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp('50%'),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: wp('0.5%') },
    shadowOpacity: 0.25,
    shadowRadius: wp('1%'),
    elevation: 5,
  },
  btnSmall: {
    width: wp('75%'),
    height: hp('7%'),
  },
  btnTablet: {
    width: wp('50%'),
    height: hp('7%'),
  },
  btnText: {
    fontSize: wp('6%'),
    fontFamily: "Kavoon",
    textAlign: "center",
    color: "#333",
    includeFontPadding: false,
  },
  btnTextSmall: {
    fontSize: wp('5.5%'),
  },
  btnTextTablet: {
    fontSize: wp('7%'),
  },
  btnTextDisabled: {
    color: "#999",
  },
});