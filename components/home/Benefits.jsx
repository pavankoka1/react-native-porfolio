import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";
import dynamicStyles from "@/styles/styleGenerator";
import { benefitsList } from "@/constants/benefits";

// AnimatedText component for text animations
const AnimatedText = ({ children, delay, isVisible }) => {
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(20);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [{ translateY: translateY.value }],
        };
    });

    useEffect(() => {
        if (isVisible) {
            const startAnimation = setTimeout(() => {
                opacity.value = withTiming(1, { duration: 600 });
                translateY.value = withTiming(0, { duration: 600 });
            }, delay);

            return () => clearTimeout(startAnimation); // Cleanup timeout on unmount
        } else {
            // Reset animation when not visible
            // opacity.value = withTiming(0, { duration: 600 });
            // translateY.value = withTiming(20, { duration: 600 });
        }
    }, [isVisible, opacity, translateY, delay]);

    return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};

const Benefits = ({ isVisible }) => {
    return (
        <View className="bg-[#231F20] relative px-6 py-24 rounded-[40px]">
            <AnimatedText delay={0} isVisible={isVisible}>
                <Text
                    style={dynamicStyles["mont-m-16"]}
                    className="mb-6 text-white"
                >
                    Benefits
                </Text>
            </AnimatedText>
            <AnimatedText delay={0} isVisible={isVisible}>
                <Text
                    style={dynamicStyles["mont-r-28"]}
                    className="text-white leading-10"
                >
                    What we bring
                </Text>
            </AnimatedText>
            <AnimatedText delay={300} isVisible={isVisible}>
                <Text
                    style={dynamicStyles["mont-r-28"]}
                    className="mb-6 text-white leading-10"
                >
                    to your project
                </Text>
            </AnimatedText>
            <AnimatedText delay={600} isVisible={isVisible}>
                <Text
                    style={dynamicStyles["mont-r-18"]}
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
                {benefitsList.map((item, index) => (
                    <AnimatedText
                        key={index}
                        delay={600 + index * 100}
                        isVisible={isVisible}
                    >
                        <View className="relative pl-8">
                            <View className="absolute left-0 top-0 h-6 w-px bg-teal-500" />
                            <View className="absolute left-0 top-8 h-6 bottom-0 w-px bg-white opacity-10" />

                            <Text
                                style={dynamicStyles["mont-r-14"]}
                                className="text-[#d4d4d4] leading-7"
                            >
                                <Text
                                    style={dynamicStyles["mont-m-14"]}
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
        </View>
    );
};

export default Benefits;
