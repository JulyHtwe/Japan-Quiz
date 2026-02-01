import { StyleSheet, ImageBackground, Text, View, Image, Pressable } from "react-native";
import { useFonts } from "expo-font";
import { useState } from "react";
import { router } from "expo-router";

export default function CategoriesScreen() {
  const [selected, setSelected] = useState<string | null>(null);

  const [fontLoaded] = useFonts({
    Kavoon: require("../assets/fonts/Kavoon-Regular.ttf"),
  });

  if (!fontLoaded) return null;

  const categories = [
    { name: "Animals", image: require("../assets/images/cate_foot.png") },
    { name: "Numbers", image: require("../assets/images/cate_number.png") },
    { name: "Countries", image: require("../assets/images/cate_countries.png") },
    { name: "Foods", image: require("../assets/images/cate_food.png") },
  ];

  return (
    <ImageBackground
      source={require("../assets/images/bg_1.png")}
      style={styles.bgImage}
    >
      <Text style={[styles.header, { marginTop: "20%" }]}>Categories</Text>
      <View style={styles.container}>
        {categories.map((cat) => (
          <Pressable
            key={cat.name}
            style={[
              styles.cat_btn,
              { backgroundColor: selected === cat.name ? "pink" : "white" },
            ]}
            onPress={() => setSelected(cat.name)}
          >
            <Image source={cat.image} style={styles.cate_png} />
            <Text style={[styles.cat_middleText, { color: "black", fontSize: 30 }]}>
              {cat.name}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        style={[
          styles.btn,
          { backgroundColor: selected ? "pink" : "gray" },
        ]}
        onPress={() => {
          if (selected) router.push(`/question?category=${selected}`);
        }}
      >
        <Text style={[styles.middleText, { color: "black", fontSize: 30 }]}>
          Comfirm
        </Text>
      </Pressable>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bgImage: { flex: 1, width: "100%", height: "100%" },
  header: {
    fontSize: 50,
    color: "black",
    fontFamily: "Kavoon",
    textShadowColor: "white",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    textAlign: "center",
    marginBottom:30,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    gap: 60,
    marginTop: 20,
  },
  cat_btn: {
    flexDirection: "row",
    gap: 30,
    width: 300,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    alignSelf: "center",
  },
  cat_middleText: {
    fontSize: 35,
    fontFamily: "Kavoon",
    textAlign: "center",
  },
  cate_png: { width: 50, height: 50 },
  btn: {
    position: "absolute",
    bottom: 50,
    width: 250,
    height: 80,
    borderColor: "pink",
    borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    alignSelf: "center",
  },
  middleText: { fontSize: 35, fontFamily: "Kavoon", textAlign: "center" },
});
