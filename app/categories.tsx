import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  Image,
  Pressable,
  Dimensions,
  FlatList,
} from "react-native";
import { useFonts } from "expo-font";
import { useState } from "react";
import { useRouter } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function CategoriesScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const { width, height } = Dimensions.get("window");
  const isSmallScreen = height < 700;
  const isTablet = width >= 768;

  const [fontLoaded] = useFonts({
    Kavoon: require("../assets/fonts/Kavoon-Regular.ttf"),
  });
  if (!fontLoaded) return null;

  const categories = [
    { name: "Hiragana", image: require("../assets/images/hiragana.png") },
    { name: "Animals", image: require("../assets/images/cate_foot.png") },
    { name: "Numbers", image: require("../assets/images/cate_number.png") },
    { name: "Fruits", image: require("../assets/images/fruit.png") },
    { name: "Foods", image: require("../assets/images/cate_food.png") },
  ];

  const renderItem = ({ item }: { item: typeof categories[0] }) => {
    const isSelected = selected === item.name;
    return (
      <Pressable
        onPress={() => setSelected(item.name)}
        style={({ pressed }) => [
          styles.catBtn,
          isSmallScreen && styles.catBtnSmall,
          isTablet && styles.catBtnTablet,
          {
            borderWidth: wp("1%"),
            borderColor: isSelected ? "pink" : "white",
            backgroundColor: pressed
              ? "#ffe6f0"
              : isSelected
              ? "#ffd6ea"
              : "white",
            transform: [{ scale: pressed ? 1.05 : 1 }],
            shadowColor: isSelected ? "pink" : "#000",
            shadowOpacity: isSelected ? 0.3 : 0.1,
            shadowRadius: isSelected ? wp("2%") : wp("1%"),
            elevation: isSelected ? 8 : 3,
            marginBottom: hp("2%"),
            marginRight: wp("3%"),
          },
        ]}
      >
        <Image
          source={item.image}
          style={[
            styles.catePng,
            isSmallScreen && styles.catePngSmall,
            isTablet && styles.catePngTablet,
          ]}
        />
        <Text
          style={[
            styles.catMiddleText,
            isSmallScreen && styles.catMiddleTextSmall,
            isTablet && styles.catMiddleTextTablet,
          ]}
        >
          {item.name}
        </Text>
      </Pressable>
    );
  };

  return (
    <ImageBackground
      source={require("../assets/images/bg_1.png")}
      style={styles.bgImage}
      resizeMode="cover"
    >
      <View
        style={[
          styles.headerContainer,
          { marginTop: isSmallScreen ? hp("10%") : hp("11%") },
        ]}
      >
        <Text style={[styles.header, isTablet && styles.headerTablet]}>
          Categories
        </Text>
      </View>

      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={isTablet ? 2 : 1}
        contentContainerStyle={{
          alignItems: "center",
          paddingVertical: hp("2%"),
          paddingHorizontal: wp("5%"),
        }}
      />

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
              shadowRadius: selected ? wp("2%") : wp("1%"),
              elevation: selected ? 8 : 3,
            },
          ]}
          onPress={() => {
            if (!selected) return;
            if (selected === "Hiragana") router.push(`/hiragana`);
            else router.push(`/question?category=${selected}&index=0&score=0`);
          }}
        >
          <Text
            style={[
              styles.btnText,
              isSmallScreen && styles.btnTextSmall,
              isTablet && styles.btnTextTablet,
              !selected && styles.btnTextDisabled,
            ]}
          >
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
    fontSize: wp("11%"),
    color: "black",
    fontFamily: "Kavoon",
    textShadowColor: "white",
    textShadowOffset: { width: wp("0.5%"), height: wp("0.5%") },
    textShadowRadius: wp("1.5%"),
    textAlign: "center",
    includeFontPadding: false,
  },
  headerTablet: {
    fontSize: wp("12%"),
    marginBottom: hp("2%"),
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: hp("2%"),
    paddingHorizontal: wp("5%"),
    justifyContent: "flex-start",
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  containerTablet: {
    gap: wp("6%"),
    marginTop: hp("3%"),
  },
  catBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: wp("80%"),
    height: hp("8%"),
    borderRadius: wp("50%"),
    marginVertical: hp("1.5%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: wp("0.5%") },
    shadowOpacity: 0.2,
    shadowRadius: wp("1%"),
    elevation: 4,
  },
  catBtnSmall: {
    width: wp("85%"),
    height: hp("7%"),
    marginVertical: hp("1%"),
  },
  catBtnTablet: {
    width: wp("35%"),
    height: hp("10%"),
    margin: hp("1.5%"),
    borderRadius: wp("25%"),
  },
  catePng: {
    width: wp("12%"),
    height: wp("12%"),
    resizeMode: "contain",
  },
  catePngSmall: {
    width: wp("10%"),
    height: wp("10%"),
  },
  catePngTablet: {
    width: wp("8%"),
    height: wp("8%"),
  },
  catMiddleText: {
    fontSize: wp("6%"),
    fontFamily: "Kavoon",
    textAlign: "center",
    color: "#333",
    marginLeft: wp("4%"),
    includeFontPadding: false,
  },
  catMiddleTextSmall: {
    fontSize: wp("5.5%"),
    marginLeft: wp("3%"),
  },
  catMiddleTextTablet: {
    fontSize: wp("5%"),
    marginLeft: wp("2%"),
  },
  buttonContainer: {
    position: "absolute",
    bottom: hp("10%"),
    left: 0,
    right: 0,
    alignItems: "center",
    paddingHorizontal: wp("5%"),
  },
  btn: {
    width: wp("70%"),
    height: hp("8%"),
    borderWidth: wp("1%"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp("50%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: wp("0.5%") },
    shadowOpacity: 0.25,
    shadowRadius: wp("1%"),
    elevation: 5,
  },
  btnSmall: {
    width: wp("75%"),
    height: hp("7%"),
  },
  btnTablet: {
    width: wp("50%"),
    height: hp("7%"),
  },
  btnText: {
    fontSize: wp("6%"),
    fontFamily: "Kavoon",
    textAlign: "center",
    color: "#333",
    includeFontPadding: false,
  },
  btnTextSmall: {
    fontSize: wp("5.5%"),
  },
  btnTextTablet: {
    fontSize: wp("7%"),
  },
  btnTextDisabled: {
    color: "#999",
  },
});
