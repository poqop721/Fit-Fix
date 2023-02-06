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
const DialogDescription = (props) => {
    const { style, children } = props, nodeProps = __rest(props, ["style", "children"]);
    const { styles } = useTheme(buildStyles);
    return (React.createElement(Text, Object.assign({ style: [styles.text, style] }, nodeProps), children));
};
DialogDescription.displayName = "DialogDescription";
const buildStyles = (isDark) => StyleSheet.create({
    text: Platform.select({
        ios: {
            textAlign: "center",
            color: PlatformColor("label"),
            fontSize: 13,
            marginTop: 4,
        },
        android: {
            color: PlatformColor(`@android:color/${isDark ? "secondary_text_dark" : "secondary_text_light"}`),
            fontSize: 16,
            marginTop: 10,
        },
        web: {
            color: "#33383D",
            fontSize: 16,
            marginTop: 10,
        },
        default: {},
    }),
});
export default DialogDescription;
