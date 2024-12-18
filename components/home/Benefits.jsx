import React, { useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated"; // Properly using Animated from react-native-reanimated
import generateDynamicStyles from "@/styles/styleGenerator";

const styles = generateDynamicStyles();

// AnimatedText component for text animations
const AnimatedText = ({ children, delay }) => {
    const opacity = useSharedValue(0); // Start with invisible
    const translateY = useSharedValue(20); // Start below the final position

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [{ translateY: translateY.value }],
        };
    });

    useEffect(() => {
        // Start the animation with a delay
        opacity.value = withTiming(1, { duration: 400, delay }); // Fade in
        translateY.value = withTiming(0, { duration: 400, delay }); // Move to original position
    }, [opacity, translateY, delay]);

    return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};

const Benefits = () => {
    return (
        <ScrollView className="bg-[#231F20] relative px-6 py-24 rounded-[40px]">
            <AnimatedText delay={0}>
                <Text style={styles["mont-sb-16"]} className="mb-6 text-white">
                    Benefits
                </Text>
            </AnimatedText>
            <AnimatedText delay={100}>
                <Text
                    style={styles["mont-r-32"]}
                    className="text-white leading-10"
                >
                    What we bring
                </Text>
            </AnimatedText>
            <AnimatedText delay={200}>
                <Text
                    style={styles["mont-r-32"]}
                    className="mb-6 text-white leading-10"
                >
                    to your project
                </Text>
            </AnimatedText>
            <AnimatedText delay={300}>
                <Text
                    style={styles["mont-r-18"]}
                    className="text-[#D4D4D4] mt-6 leading-8 tracking-wide"
                >
                    We're agile remote custom app developers, combining our
                    corporate experience with a collaborative and flexible
                    approach. All without skipping on quality. Here’s what you
                    can expect when you hire us for your software development
                    project:
                </Text>
            </AnimatedText>

            <View className="mt-24 flex-col gap-10">
                {[
                    {
                        title: "Quality.",
                        description:
                            "Affordable coding projects with expert quality",
                    },
                    {
                        title: "Responsiveness.",
                        description: "Flexibility to adapt to your schedule",
                    },
                    {
                        title: "Communication.",
                        description: "Responsive and effective communication",
                    },
                    {
                        title: "Efficiency.",
                        description:
                            "Increase your company’s efficiency with custom apps or modify and evolve existing apps",
                    },
                    {
                        title: "Customization.",
                        description:
                            "A true coder that can create a tailored app from scratch to fit your needs",
                    },
                    {
                        title: "Collaboration.",
                        description:
                            "A seamless developing experience across time zones",
                    },
                    {
                        title: "Skills.",
                        description: "Focus on problem-solving",
                    },
                ].map((item, index) => (
                    <AnimatedText key={index} delay={400 + index * 100}>
                        <View className="relative pl-8">
                            <View className="absolute left-0 top-0 h-6 w-px bg-teal-500" />
                            <View className="absolute left-0 top-8 h-6 bottom-0 w-px bg-white opacity-10" />

                            <Text
                                style={styles["mont-r-14"]}
                                className="text-[#d4d4d4] leading-7"
                            >
                                <Text
                                    style={styles["mont-m-14"]}
                                    className="text-white mb-[14px]"
                                >
                                    {item.title}
                                </Text>
                                <Text>{" " + item.description}</Text>
                            </Text>
                        </View>
                    </AnimatedText>
                ))}
            </View>
        </ScrollView>
    );
};

export default Benefits;
