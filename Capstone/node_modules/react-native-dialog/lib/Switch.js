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
import { Platform, StyleSheet, Switch, Text, View, PlatformColor, } from "react-native";
import useTheme from "./useTheme";
const DialogSwitch = (props) => {
    const { label, unstableLabelStyle } = props, nodeProps = __rest(props, ["label", "unstableLabelStyle"]);
    const { styles } = useTheme(buildStyles);
    return (React.createElement(View, { style: styles.switchWrapper },
        React.createElement(Text, { style: [styles.label, unstableLabelStyle] }, label),
        React.createElement(Switch, Object.assign({}, nodeProps))));
};
DialogSwitch.displayName = "DialogSwitch";
const buildStyles = (isDark) => StyleSheet.create({
    switchWrapper: Platform.select({
        ios: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 20,
            marginBottom: 14,
            paddingHorizontal: 8,
        },
        android: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 10,
            marginBottom: 20,
        },
        default: {},
    }),
    label: Platform.select({
        ios: {
            flex: 1,
            paddingRight: 8,
            fontSize: 13,
            color: PlatformColor("label"),
        },
        android: {
            flex: 1,
            paddingRight: 8,
            fontSize: 16,
            color: PlatformColor(`@android:color/${isDark ? "primary_text_dark" : "primary_text_light"}`),
        },
        default: {},
    }),
});
export default DialogSwitch;
