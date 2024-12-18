import React from "react";
import {
    Button,
    Platform,
    ScrollView,
    StatusBar,
    Text,
    View,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import LogoIcon from "@/icons/LogoIcon";
import TilesBgIcon from "@/icons/TilesBgIcon";
import generateDynamicStyles from "@/styles/styleGenerator";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Summary from "@/components/home/Summary";
import Benefits from "@/components/home/Benefits";

const styles = generateDynamicStyles();

const App = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView className="bg-[#231F20] w-screen h-screen overflow-y-scroll">
                <ScrollView>
                    <StatusBar
                        backgroundColor="#231F20"
                        barStyle="light-content"
                    />
                    <View className="relative bg-[#e9e9e5] pt-14 mt-2 rounded-t-[40px] h-fit">
                        <Summary />
                        <Benefits />
                        <View className="mt-24 px-6 pb-24">
                            <Text
                                style={styles["mont-r-32"]}
                                className="text-[#231f20] tracking-tight leading-[48px]"
                            >
                                Our Software
                            </Text>
                            <Text
                                style={styles["mont-r-32"]}
                                className="text-[#231f20] tracking-tight leading-[48px]"
                            >
                                development services
                            </Text>
                            <Text
                                style={styles["mont-r-18"]}
                                className="mt-6 text-[#525252] leading-8"
                            >
                                We offer both mobile and web app development and
                                consulting services to help you realize your
                                app.
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default App;
