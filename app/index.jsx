import React, { useEffect, useState, useRef } from "react";
import {
    Button,
    Platform,
    ScrollView,
    StatusBar,
    Text,
    View,
    Dimensions,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import LogoIcon from "@/icons/LogoIcon";
import TilesBgIcon from "@/icons/TilesBgIcon";
import dynamicStyles from "@/styles/styleGenerator";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Summary from "@/components/home/Summary";
import Benefits from "@/components/home/Benefits";
import JugglingList from "@/components/home/JugglingList";
import ConcentricCircles from "@/components/home/ConcentricCircles";
import RadialAnimation from "@/components/home/RadialAnimation";

const { height, width } = Dimensions.get("window");

const App = () => {
    const [benefitsYPosition, setBenefitsYPosition] = useState(0);
    const [isBenefitsVisible, setIsBenefitsVisible] = useState(false);

    const handleBenefitsLayout = (event) => {
        const { y } = event.nativeEvent.layout;
        setBenefitsYPosition(y);
    };

    const handleScroll = (event) => {
        const scrollY = event.nativeEvent.contentOffset.y;

        // Check if the Benefits component is in view
        const isInView =
            scrollY + height * 0.6 >= benefitsYPosition &&
            scrollY < benefitsYPosition + 400; // Adjust 400 based on the height of Benefits component
        setIsBenefitsVisible(isInView);
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView className="bg-[#231F20] w-screen h-screen overflow-y-scroll">
                <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
                    <StatusBar
                        backgroundColor="#231F20"
                        barStyle="light-content"
                    />
                    <View className="relative bg-[#e9e9e5] pt-14 mt-2 rounded-t-[40px] h-fit">
                        <Summary />
                        {/* Add onLayout event to detect when Benefits comes into view */}
                        <View onLayout={handleBenefitsLayout}>
                            <Benefits isVisible={isBenefitsVisible} />
                        </View>
                        <View className="mt-24 px-6 pb-24">
                            <Text
                                style={dynamicStyles["mont-r-32"]}
                                className="text-[#231f20] tracking-tight leading-[48px]"
                            >
                                Our Software
                            </Text>
                            <Text
                                style={dynamicStyles["mont-r-32"]}
                                className="text-[#231f20] tracking-tight leading-[48px]"
                            >
                                development services
                            </Text>
                            <Text
                                style={dynamicStyles["mont-r-18"]}
                                className="mt-6 text-[#525252] leading-8"
                            >
                                We offer both mobile and web app development and
                                consulting services to help you realize your
                                app.
                            </Text>
                        </View>
                    </View>
                    <JugglingList />
                    <ConcentricCircles />
                    <RadialAnimation />
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default App;
