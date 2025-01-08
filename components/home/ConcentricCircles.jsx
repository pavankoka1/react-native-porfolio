import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import anime from "animejs/lib/anime.es.js"; // Import anime.js

const CircleAnimation = () => {
    const circleRef1 = useRef(null);
    const circleRef2 = useRef(null);
    const circleRef3 = useRef(null);

    useEffect(() => {
        const animateCircles = () => {
            anime({
                targets: [
                    circleRef1.current,
                    circleRef2.current,
                    circleRef3.current,
                ],
                scale: [
                    { value: 2, duration: 800, easing: "easeOutQuad" },
                    { value: 1, duration: 800, easing: "easeInQuad" },
                ],
                opacity: [
                    { value: 1, duration: 800, easing: "easeOutQuad" },
                    { value: 0, duration: 800, easing: "easeInQuad" },
                ],
                borderColor: [
                    {
                        value: "rgba(35, 31, 32, 0.5)",
                        duration: 800,
                        easing: "easeOutQuad",
                    }, // Fading in color
                    { value: "rgba(35, 31, 32, 0)", duration: 0 }, // Reset to transparent
                ],
                duration: 1600,
                loop: true,
                delay: anime.stagger(200), // Stagger the start of each circle's animation
            });
        };

        animateCircles(); // Start the animation
    }, []);

    return (
        <View className="flex h-[300px] justify-center items-center bg-[#e9e9e5]">
            <View
                ref={circleRef1}
                className="absolute rounded-full w-24 h-24 shadow-lg" // Smaller size
                style={{ borderColor: "rgba(35, 31, 32, 0)" }} // Start with transparent border
            />
            <View
                ref={circleRef2}
                className="absolute rounded-full w-28 h-28 shadow-lg" // Smaller size
                style={{ borderColor: "rgba(233, 233, 229, 0)" }} // Start with transparent border
            />
            <View
                ref={circleRef3}
                className="absolute rounded-full w-32 h-32 shadow-lg" // Smaller size
                style={{ borderColor: "rgba(35, 31, 32, 0)" }} // Start with transparent border
            />
        </View>
    );
};

export default CircleAnimation;
