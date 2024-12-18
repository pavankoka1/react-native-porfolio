import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";
import generateDynamicStyles from "@/styles/styleGenerator";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const styles = generateDynamicStyles();

// Animated text component
const AnimatedText = ({ children, startDelay, animationDuration }) => {
    const translateY = useSharedValue(10); // Start position (10 px down)
    const opacity = useSharedValue(0); // Start with invisible

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
            opacity: opacity.value,
        };
    });

    useEffect(() => {
        const delayAnimation = async () => {
            // Introduce a delay before starting the animation
            await new Promise((resolve) => setTimeout(resolve, startDelay));
            translateY.value = withTiming(0, { duration: animationDuration }); // Slide up to position
            opacity.value = withTiming(1, { duration: animationDuration }); // Fade in
        };

        delayAnimation();
    }, [startDelay, translateY, opacity, animationDuration]);

    return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};

const Summary = () => {
    return (
        <View className="relative px-6 pt-6 py-20 rounded-t-[40px]">
            <View className="flex gap-4 items-center flex-row mb-8">
                <FontAwesome5 name="chess-pawn" size={64} color="#343432" />
                <View>
                    <Text
                        style={styles["mont-b-28"]}
                        className="text-[#343432]"
                    >
                        Koka
                    </Text>
                    <Text
                        style={styles["mont-m-12"]}
                        className="text-[#343432]"
                    >
                        Partners in Quality, Committed to Loyalty
                    </Text>
                </View>
            </View>
            <AnimatedText startDelay={300} animationDuration={500}>
                <Text
                    style={styles["mont-r-38"]}
                    className="tracking-tight text-[#343432]"
                >
                    Empowering Your
                </Text>
            </AnimatedText>
            <AnimatedText startDelay={300} animationDuration={500}>
                <Text
                    style={styles["mont-r-38"]}
                    className="tracking-tight text-[#343432]"
                >
                    Digital Vision
                </Text>
            </AnimatedText>
            <AnimatedText startDelay={700} animationDuration={500}>
                <Text
                    style={styles["mont-r-18"]}
                    className="mt-8 text-[#525252] leading-8"
                >
                    We are a team of passionate software developers and expert
                    consultants based in Krabi, Thailand, driven by experience,
                    dedication, and adaptability.
                </Text>
            </AnimatedText>
            <AnimatedText startDelay={1200} animationDuration={500}>
                <Text
                    style={styles["mont-r-18"]}
                    className="mt-4 text-[#525252] leading-8"
                >
                    With a focus on mobile and web applications, including
                    cross-platform development, we collaborate remotely with
                    global teams to ensure seamless project execution from
                    ideation to launch.
                </Text>
            </AnimatedText>
            <AnimatedText startDelay={1700} animationDuration={500}>
                <Text
                    style={styles["mont-r-18"]}
                    className="mt-4 text-[#525252] leading-8"
                >
                    Let us empower your venture with cutting-edge solutions and
                    unmatched expertise.
                </Text>
            </AnimatedText>
        </View>
    );
};

export default Summary;
