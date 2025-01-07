// styleGenerator.js
import { StyleSheet } from "react-native";

const typography = {
    fontSizes: {
        8: 8,
        10: 10,
        12: 12,
        14: 14,
        16: 16,
        18: 18,
        20: 20,
        24: 24,
        28: 28,
        32: 32,
        34: 34,
        36: 36,
        38: 38,
        40: 40,
        44: 44,
        48: 48,
    },
    fontWeights: {
        eb: "Montserrat-ExtraBold",
        b: "Montserrat-Bold",
        sb: "Montserrat-SemiBold",
        m: "Montserrat-Medium",
        r: "Montserrat-Regular",
        t: "Montserrat-Thin",
    },
    fontFamilies: {
        mont: "Montserrat", // Reference here, actual names defined in global.css or applied through styling method
        denton: "Denton", // Optional: Add more fonts as needed
    },
};

const generateDynamicStyles = () => {
    const styles = {};

    // Generate styles for each combination of font-family, weight, and size
    Object.keys(typography.fontFamilies).forEach((family) => {
        Object.keys(typography.fontWeights).forEach((weight) => {
            Object.keys(typography.fontSizes).forEach((size) => {
                const styleName = `${family}-${weight}-${size}`;
                styles[styleName] = {
                    fontFamily: typography.fontWeights[weight],
                    fontSize: typography.fontSizes[size],
                };
            });
        });
    });

    return StyleSheet.create(styles);
};

const dynamicStyles = generateDynamicStyles();

export default dynamicStyles;
