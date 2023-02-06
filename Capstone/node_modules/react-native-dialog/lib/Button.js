var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, PlatformColor, } from "react-native";
import useTheme from "./useTheme";
const COLOR = Platform.OS === "ios" ? "#007ff9" : "#169689";
const DialogButton = (props) => {
    const { label, color = COLOR, disabled = false, bold, onPress, style } = props, nodeProps = __rest(props, ["label", "color", "disabled", "bold", "onPress", "style"]);
    const fontWeight = bold ? "600" : "normal";
    const { styles } = useTheme(buildStyles);
    return (React.createElement(TouchableOpacity, { style: [styles.button], onPress: onPress, disabled: disabled },
        React.createElement(Text, Object.assign({ style: [styles.text, { color: color, fontWeight: fontWeight }, style] }, nodeProps), label)));
};
DialogButton.displayName = "DialogButton";
const buildStyles = (isDark) => StyleSheet.create({
    button: Platform.select({
        ios: {
            flexGrow: 1,
            flexShrink: 1,
            height: 46,
            justifyContent: "center",
            alignItems: "center",
        },
        android: {
            justifyContent: "center",
            alignItems: "center",
        },
        web: {
            justifyContent: "center",
            alignItems: "center",
        },
        default: {},
    }),
    text: Platform.select({
        ios: {
            color: PlatformColor("link"),
            textAlign: "center",
            fontSize: 17,
            backgroundColor: "transparent",
        },
        android: {
            color: PlatformColor(`@android:color/${isDark ? "link_text_dark" : "link_text_dark_light"}`),
            textAlign: "center",
            backgroundColor: "transparent",
            padding: 8,
            fontSize: 14,
            textTransform: "uppercase",
        },
        web: {
            textAlign: "center",
            backgroundColor: "transparent",
            padding: 8,
            fontSize: 14,
            textTransform: "uppercase",
        },
        default: {},
    }),
});
export default DialogButton;
