import React, { useEffect, useState } from "react";
import {
    View,
    Modal,
    TouchableWithoutFeedback,
    StyleSheet,
    Animated,
    Pressable,
} from "react-native";
import PropTypes from "prop-types";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const BottomSheet = ({
    isOpen,
    onClose,
    children,
    closeOnOverlayClick = true,
}) => {
    const [isVisible, setIsVisible] = useState(isOpen);
    const [translateY] = useState(new Animated.Value(300)); // Start off-screen

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            Animated.timing(translateY, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(translateY, {
                toValue: 300,
                duration: 300,
                useNativeDriver: true,
            }).start(() => setIsVisible(false));
        }
    }, [isOpen]);

    const handleOverlayClick = () => {
        if (closeOnOverlayClick) {
            onClose();
        }
    };

    return (
        <Modal
            transparent
            visible={isVisible}
            animationType="none"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={handleOverlayClick}>
                <View style={styles.overlay}>
                    <Animated.View
                        style={[styles.sheet, { transform: [{ translateY }] }]}
                    >
                        <Pressable onPress={onClose} style={styles.closeIcon}>
                            <MaterialCommunityIcons
                                name="close"
                                size={24}
                                color="#010101"
                                selectable={undefined}
                            />
                        </Pressable>
                        {children}
                    </Animated.View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

BottomSheet.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node,
    closeOnOverlayClick: PropTypes.bool,
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    sheet: {
        backgroundColor: "white",
        width: "100%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    closeIcon: {
        position: "absolute",
        top: 15,
        right: 15,
        cursor: "pointer",
    },
});

export default BottomSheet;
