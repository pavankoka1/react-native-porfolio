import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import { todos as todosList } from "@/constants/todos";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import BottomSheet from "@/components/BottomSheet";
import { ThemeContext } from "@/context/ThemeContext";
import AnimatedModal from "@/components/AnimatedModal";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import Animated, { LinearTransition } from "react-native-reanimated";
import Octicons from "@expo/vector-icons/Octicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";

function Index() {
    const router = useRouter();
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState("");
    const [selectedTodo, setSelectedTodo] = useState({});
    const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);
    const styles = createStyles(theme, colorScheme);

    const [loaded, error] = useFonts({
        Inter_500Medium,
    });

    useEffect(() => {
        (async function () {
            try {
                const jsonValue = await AsyncStorage.getItem("TodoApp");
                const storageTodos =
                    jsonValue != null ? JSON.parse(jsonValue) : null;

                if (storageTodos && storageTodos.length) {
                    setTodos(storageTodos.sort((a, b) => b.id - a.id));
                } else {
                    setTodos(todosList.sort((a, b) => b.id - a.id));
                }
            } catch (e) {
                console.error(e);
            }
        })();
    }, [todosList]);

    useEffect(() => {
        const storeData = async () => {
            try {
                const jsonValue = JSON.stringify(todos);
                await AsyncStorage.setItem("TodoApp", jsonValue);
            } catch (e) {
                console.error(e);
            }
        };

        storeData();
    }, [todos]);

    if (!loaded && !error) return null;

    function addTodo() {
        if (text.trim()) {
            const length = todos.length;
            const id = length ? todos[0].id + 1 : 1;

            setTodos((prev) => [
                { id, title: text.trim(), completed: false },
                ...prev,
            ]);
            setText("");
        }
    }

    function toggleTodo(id) {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    }

    function removeTodo(id) {
        setTodos(todos.filter((todo) => todo.id !== id));
        setSelectedTodo({});
    }

    function renderItem({ item }) {
        return (
            <View style={styles.todoItem}>
                <Pressable
                    style={{ flex: 1 }}
                    onPress={() => router.push("/todos/" + item.id)}
                    onLongPress={() => toggleTodo(item.id)}
                >
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={[
                            styles.todoText,
                            item.completed && styles.completedText,
                        ]}
                    >
                        {item.title}
                    </Text>
                </Pressable>
                <Pressable onPress={() => setSelectedTodo(item)}>
                    <MaterialCommunityIcons
                        name="delete"
                        size={24}
                        color="red"
                        selectable={undefined}
                    />
                </Pressable>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Add a new todo"
                    placeholderTextColor="gray"
                    value={text}
                    onChangeText={setText}
                />
                <Pressable onPress={addTodo} style={styles.addButton}>
                    <Text style={styles.addButtonText}>Add</Text>
                </Pressable>
                <Pressable
                    onPress={() =>
                        setColorScheme(
                            colorScheme === "dark" ? "light" : "dark"
                        )
                    }
                    style={{ marginLeft: 10 }}
                >
                    {colorScheme === "dark" ? (
                        <Octicons
                            name="moon"
                            size={24}
                            color={theme.text}
                            selectable={undefined}
                            style={{ width: 24 }}
                        />
                    ) : (
                        <Octicons
                            name="sun"
                            size={24}
                            color={theme.text}
                            selectable={undefined}
                            style={{ width: 24 }}
                        />
                    )}
                </Pressable>
            </View>

            <Animated.FlatList
                data={todos}
                renderItem={renderItem}
                keyExtractor={(todo) => todo.id}
                contentContainerStyle={{ flexGrow: 1 }}
                itemLayoutAnimation={LinearTransition}
                keyboardDismissMode="on-drag"
            />
            {/* <BottomSheet
                isOpen={!!selectedTodo?.id}
                onConfirm={() => removeTodo(selectedTodo.id)}
                closeOnOverlayClick={false}
                onClose={() => setSelectedTodo({})}
            >
                check
            </BottomSheet> */}
            <AnimatedModal
                isVisible={!!selectedTodo?.id}
                onClose={() => setSelectedTodo({})}
            >
                <Text>Are you sure?</Text>
                <Pressable onPress={() => removeTodo(selectedTodo.id)}>
                    <Text style={styles.confirmButton}>Confirm</Text>
                </Pressable>
            </AnimatedModal>
            <StatusBar color={colorScheme === "dark" ? "light" : "dark"} />
        </SafeAreaView>
    );
}

export default Index;

function createStyles(theme, colorScheme) {
    return StyleSheet.create({
        wrapper: {
            flex: 1,
            backgroundColor: theme.background,
            width: "100%",
            height: "100%",
            overflow: "hidden",
        },
        inputContainer: {
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
            padding: 10,
            width: "100%",
            maxWidth: 1024,
            marginHorizontal: "auto",
            pointerEvents: "auto",
        },
        input: {
            flex: 1,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginRight: 10,
            fontSize: 18,
            minWidth: 0,
            color: theme.text,
            fontFamily: "Inter_500Medium",
            overflow: "hidden",
            textOverflow: "ellipsis",
        },
        addButton: {
            backgroundColor: theme.button,
            borderRadius: 5,
            padding: 10,
        },
        addButtonText: {
            fontSize: 18,
            color: colorScheme === "dark" ? "black" : "white",
        },
        todoItem: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderBottomColor: "gray",
            borderBottomWidth: 1,
            width: "100%",
            maxWidth: 1024,
            marginHorizontal: "auto",
            pointerEvents: "auto",
        },
        todoText: {
            flex: 1,
            fontSize: 18,
            color: theme.text,
            fontFamily: "Inter_500Medium",
            maxWidth: "85%", // Adjusted max width to control text overflow
            overflow: "hidden",
            textOverflow: "ellipsis",
        },
        completedText: {
            textDecorationLine: "line-through",
            color: "gray",
        },
        confirmButton: {
            marginTop: 20,
            borderColor: "#010101",
            borderWidth: 1,
            paddingVertical: 10,
            paddingHorizontal: 32,
            borderRadius: 5,
        },
    });
}
