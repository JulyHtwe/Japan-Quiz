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
            source={require("../assets/images/bg_4.png")}
            style={styles.bgImage}
        >
            <View style={styles.container}>
                <Image style={styles.icon} source={require('../assets/images/check.png')}>
                </Image>
                <Text style={{ fontSize: 50, fontFamily: 'Kavoon', color: 'black', textShadowColor: 'white', textShadowOffset: { width: 3, height: 3 }, textShadowRadius: 10 }}>Correct</Text>
                <Text style={{ fontSize: 20, fontFamily: 'Kavoon', color: 'black', textShadowColor: 'white', textShadowOffset: { width: 3, height: 3 }, textShadowRadius: 10 }}>You are Awesome!</Text>
                <Text style={{ fontSize: 25, fontFamily: 'Kavoon', color: 'black', textShadowColor: 'white', textShadowOffset: { width: 3, height: 3 }, textShadowRadius: 10 }}>Nailed it!</Text>
                <View style={[styles.cat_btn, { marginTop: "20%" }]}>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <Text style={[styles.cat_middleText, { color: "black", fontSize: 30 }]}>
                            The right answer is:
                        </Text>
                        <Text style={{ fontSize: 50, fontFamily: 'Kavoon', color: 'black', textShadowColor: 'white', textShadowOffset: { width: 3, height: 3 }, textShadowRadius: 10 }}>
                            Dog
                        </Text>
                    </View>
                </View>
                <Text style={{ fontSize: 20, fontFamily: 'Kavoon', color: 'black', textShadowColor: 'white', textShadowOffset: { width: 3, height: 3 }, textShadowRadius: 10 }}>Let's move on</Text>
                <View style={[styles.btn]}>
                    <Text style={[styles.middleText, { color: "black", fontSize: 30 }]}>
                        Next Word
                    </Text>
                </View>
            </View>


        </ImageBackground >
    );
}
const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    container: {
        top: 70,
        gap: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        width: 80,
        height: 80,
        elevation: 80,
        backgroundColor: 'black',
        paddingHorizontal: 30,
        paddingVertical: 20,
        borderRadius: 50,
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
        textShadowRadius: 8,
        textAlign: "center",
    },
    btn: {
        position: "absolute",
        bottom: -120,
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
        fontSize: 20,
        color: "black",
        fontFamily: "Kavoon",
        textAlign: "center",
    },
});
