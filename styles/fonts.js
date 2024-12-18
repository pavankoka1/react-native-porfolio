// fontLoader.js
import * as Font from "expo-font"; // Make sure to install expo-font if you're using Expo
import MONTSERRAT_REGULAR from "@/assets/fonts/Montserrat-Regular.ttf";
import MONTSERRAT_THIN from "@/assets/fonts/Montserrat-Thin.ttf";
import MONTSERRAT_MEDIUM from "@/assets/fonts/Montserrat-Medium.ttf";
import MONTSERRAT_SEMIBOLD from "@/assets/fonts/Montserrat-SemiBold.ttf";
import MONTSERRAT_BOLD from "@/assets/fonts/Montserrat-Bold.ttf";
import MONTSERRAT_EXTRABOLD from "@/assets/fonts/Montserrat-ExtraBold.ttf";

const loadFonts = async () => {
    await Font.loadAsync({
        "Montserrat-ExtraBold": MONTSERRAT_EXTRABOLD,
        "Montserrat-Bold": MONTSERRAT_BOLD,
        "Montserrat-SemiBold": MONTSERRAT_SEMIBOLD,
        "Montserrat-Medium": MONTSERRAT_MEDIUM,
        "Montserrat-Regular": MONTSERRAT_REGULAR,
        "Montserrat-Thin": MONTSERRAT_THIN,
    });
};

export default loadFonts;
