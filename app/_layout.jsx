import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@/context/ThemeContext";
import { createStaticNavigation } from "@react-navigation/native";
import "@/global.css";
import "@/styles/index.css";
import { useEffect } from "react";
import loadFonts from "@/styles/fonts";

export default function RootLayout() {
    useEffect(() => {
        const load = async () => {
            await loadFonts();
        };
        load();
    }, []);

    return (
        <ThemeProvider>
            <SafeAreaProvider>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen
                        name="index"
                        options={{
                            title: "Koka Portfolio",
                        }}
                    />
                </Stack>
            </SafeAreaProvider>
        </ThemeProvider>
    );
}
