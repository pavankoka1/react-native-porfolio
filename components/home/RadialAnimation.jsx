import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import anime from "animejs/lib/anime.es.js"; // Import anime.js

const RadialAnimation = () => {
    const circleRefs = useRef([]);

    useEffect(() => {
        const animateCircles = () => {
            anime({
                targets: circleRefs.current,
                scale: [
                    { value: 1.5, duration: 800, easing: "easeOutQuad" },
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
            {Array.from({ length: 8 }, (_, index) => (
                <View
                    key={index}
                    ref={(el) => (circleRefs.current[index] = el)} // Store references to each circle
                    className="absolute rounded-full shadow-lg"
                    style={{
                        width: `${24 + index * 4}px`, // Increase size for each circle
                        height: `${24 + index * 4}px`,
                        borderColor: "rgba(35, 31, 32, 0)", // Start with transparent border
                        borderWidth: 4,
                    }}
                />
            ))}
        </View>
    );
};

export default RadialAnimation;
