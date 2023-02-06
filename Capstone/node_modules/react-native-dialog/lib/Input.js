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
import { Platform, StyleSheet, Text, TextInput, View, PlatformColor, } from "react-native";
import useTheme from "./useTheme";
const DialogInput = (props) => {
    const { label, style, wrapperStyle, textInputRef, multiline, numberOfLines, unstableLabelStyle } = props, nodeProps = __rest(props, ["label", "style", "wrapperStyle", "textInputRef", "multiline", "numberOfLines", "unstableLabelStyle"]);
    const lines = (multiline && numberOfLines) || 1;
    const height = 18 + Platform.select({ ios: 14, android: 22, default: 0 }) * lines;
    const { styles, isDark } = useTheme(buildStyles);
    return (React.createElement(View, { style: [styles.textInputWrapper, wrapperStyle] },
        label && React.createElement(Text, { style: [styles.label, unstableLabelStyle] }, label),
        React.createElement(TextInput, Object.assign({ ref: textInputRef, placeholderTextColor: Platform.OS === "ios"
                ? PlatformColor("placeholderText")
                : PlatformColor(`@android:color/${isDark ? "hint_foreground_dark" : "hint_foreground_light"}`), underlineColorAndroid: PlatformColor(`@android:color/${isDark ? "hint_foreground_dark" : "hint_foreground_light"}`), style: [styles.textInput, style, { height }], multiline: multiline, numberOfLines: numberOfLines }, nodeProps))));
};
DialogInput.displayName = "DialogInput";
const buildStyles = (isDark) => StyleSheet.create({
    textInputWrapper: Platform.select({
        ios: {
            backgroundColor: PlatformColor("systemGray5"),
            borderWidth: StyleSheet.hairlineWidth,
            borderRadius: 6,
            borderColor: PlatformColor("separator"),
            marginHorizontal: 20,
            marginBottom: 20,
            paddingHorizontal: 8,
        },
        android: {
            marginHorizontal: 10,
            marginBottom: 20,
        },
        default: {},
    }),
    label: Platform.select({
        ios: {
            color: PlatformColor("label"),
        },
        android: {
            color: PlatformColor(`@android:color/${isDark ? "primary_text_dark" : "primary_text_light"}`),
            fontSize: 14,
        },
        default: {},
    }),
    textInput: Platform.select({
        ios: {
            color: PlatformColor("label"),
        },
        android: {
            color: PlatformColor(`@android:color/${isDark ? "primary_text_dark" : "primary_text_light"}`),
            marginLeft: -4,
            paddingLeft: 4,
        },
        default: {},
    }),
});
export default DialogInput;
