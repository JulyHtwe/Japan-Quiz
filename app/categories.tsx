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

  const { width } = Dimensions.get("window");
  const isTablet = width >= 768;

  const scaleFont = (percent: string) => {
    const value = wp(percent);
    return isTablet ? value * 0.8 : value;
  };

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
          isTablet && styles.catBtnTablet,
          {
            borderColor: isSelected ? "pink" : "white",
            backgroundColor: pressed
              ? "#ffe6f0"
              : isSelected
              ? "#ffd6ea"
              : "white",
            transform: [{ scale: pressed ? 1.05 : 1 }],
            elevation: isSelected ? 8 : 3,
          },
        ]}
      >
        <Image source={item.image} style={styles.catePng} />
        <Text style={[styles.catText, { fontSize: scaleFont("6%") }]}>
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
      <View style={styles.headerContainer}>
        <Text style={[styles.header, { fontSize: scaleFont("11%") }]}>
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
        }}
      />

      <View style={styles.buttonContainer}>
        <Pressable
          disabled={!selected}
          style={({ pressed }) => [
            styles.btn,
            isTablet && styles.btnTablet,
            {
              borderColor: selected ? "pink" : "#ccc",
              opacity: selected ? 1 : 0.6,
              backgroundColor: pressed ? "#ffe6f0" : "white",
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
              { fontSize: scaleFont("6%") },
              !selected && { color: "#999" },
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
  },

  headerContainer: {
    alignItems: "center",
    marginTop: hp("10%"),
  },

  header: {
    fontFamily: "Kavoon",
    color: "black",
    textShadowColor: "white",
    textShadowOffset: { width: wp("0.5%"), height: wp("0.5%") },
    textShadowRadius: wp("1%"),
  },

  catBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: wp("80%"),
    height: hp("8%"),
    borderRadius: wp("50%"),
    marginVertical: hp("1.5%"),
    backgroundColor: "white",
  },

  catBtnTablet: {
    width: wp("40%"),
  },

  catePng: {
    width: wp("12%"),
    height: wp("12%"),
    resizeMode: "contain",
  },

  catText: {
    fontFamily: "Kavoon",
    marginLeft: wp("4%"),
    color: "#333",
  },

  buttonContainer: {
    position: "absolute",
    bottom: hp("8%"),
    left: 0,
    right: 0,
    alignItems: "center",
  },

  btn: {
    width: wp("70%"),
    height: hp("8%"),
    borderWidth: wp("1%"),
    borderRadius: wp("50%"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

  btnTablet: {
    width: wp("50%"),
  },

  btnText: {
    fontFamily: "Kavoon",
    color: "#333",
  },
});