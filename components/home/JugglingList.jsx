import React, { useEffect, useRef, useState } from "react";
import { View, Animated, Text, Easing } from "react-native";
import dynamicStyles from "@/styles/styleGenerator";

function RowItem({ animateTo, label = "row" }) {
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animate = () => {
            Animated.timing(animatedValue, {
                toValue: animateTo,
                duration: 1000,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: false,
            }).start();
        };

        animate(); // Start the animation
    }, [animatedValue, animateTo]);

    return (
        <Animated.Text
            style={[
                dynamicStyles["mont-r-16"],
                {
                    position: "absolute",
                    top: 50,
                    left: "50%",
                    padding: 24,
                    transform: [
                        {
                            translateY: animatedValue,
                        },
                        {
                            translateX: "-50%",
                        },
                    ],
                    width: 200,
                    borderRadius: 20,
                    height: 80,
                    backgroundColor: "#231f20",
                    color: "#e9e9e5",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                },
            ]}
        >
            {label}
        </Animated.Text>
    );
}

const MyComponent = () => {
    const initialValues = Array.from({ length: 10 }, (_, index) => index * 100);
    const [values, setValues] = useState(initialValues);

    const shuffleValues = () => {
        const keys = Object.keys(values);
        const shuffledValues = [...Object.values(values)];

        for (let i = shuffledValues.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledValues[i], shuffledValues[j]] = [
                shuffledValues[j],
                shuffledValues[i],
            ]; // Swap values
        }

        // Create a new state object with shuffled values
        const newValues = {};
        keys.forEach((key, index) => {
            newValues[key] = shuffledValues[index];
        });

        setValues(newValues);
    };

    useEffect(() => {
        // Shuffle values every 5 seconds
        const interval = setInterval(shuffleValues, 3000);

        // Clean up the interval on component unmount
        return () => clearInterval(interval);
    }, [values]);

    return (
        <View className="bg-[#e9e9e5] py-5 px-4 h-[1100px] relative">
            {Array(10)
                .fill()
                .map((_, index) => (
                    <RowItem
                        key={index}
                        animateTo={values[index]}
                        label={index + 1}
                    />
                ))}
        </View>
    );
};

export default MyComponent;
