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
import { Platform, StyleSheet, Text, PlatformColor, } from "react-native";
import useTheme from "./useTheme";
const DialogTitle = (props) => {
    const { style, children } = props, nodeProps = __rest(props, ["style", "children"]);
    const { styles } = useTheme(buildStyles);
    return (React.createElement(Text, Object.assign({ style: [styles.text, style] }, nodeProps), children));
};
DialogTitle.displayName = "DialogTitle";
const buildStyles = (isDark) => StyleSheet.create({
    text: Platform.select({
        ios: {
            color: PlatformColor("label"),
            textAlign: "center",
            fontSize: 18,
            fontWeight: "600",
        },
        android: {
            color: PlatformColor(`@android:color/${isDark ? "primary_text_dark" : "primary_text_light"}`),
            fontWeight: "500",
            fontSize: 18,
        },
        web: {
            fontWeight: "500",
            fontSize: 18,
        },
        default: {},
    }),
});
export default DialogTitle;
