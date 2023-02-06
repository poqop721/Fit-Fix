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
import { Platform, StyleSheet, Text, TextInput, View, Pressable, PlatformColor, } from "react-native";
import useTheme from "./useTheme";
const DialogCodeInput = (props) => {
    const { autoFocus = false, style, wrapperStyle, digitContainerStyle, digitContainerFocusedStyle, digitStyle, codeLength = 4, onCodeChange } = props, nodeProps = __rest(props, ["autoFocus", "style", "wrapperStyle", "digitContainerStyle", "digitContainerFocusedStyle", "digitStyle", "codeLength", "onCodeChange"]);
    const { styles } = useTheme(buildStyles);
    const codeRef = React.useRef(null);
    const [containerIsFocused, setContainerIsFocused] = React.useState(autoFocus);
    const [code, setCode] = React.useState("");
    const codeDigitsArray = new Array(codeLength).fill(0);
    const emptyInputChar = " ";
    const handleContainerPress = () => {
        var _a;
        setContainerIsFocused(true);
        (_a = codeRef === null || codeRef === void 0 ? void 0 : codeRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    };
    const onCodeChangePress = (t) => {
        var _a;
        setCode(t);
        typeof onCodeChange === "function" && onCodeChange(t);
        if (t.length === codeLength) {
            setContainerIsFocused(false);
            (_a = codeRef === null || codeRef === void 0 ? void 0 : codeRef.current) === null || _a === void 0 ? void 0 : _a.blur();
        }
    };
    const handleOnBlur = () => setContainerIsFocused(false);
    const toDigitInput = (_value, idx) => {
        const digit = code[idx] || emptyInputChar;
        const isCurrentDigit = idx === code.length;
        const isLastDigit = idx === codeLength - 1;
        const isCodeFull = code.length === codeLength;
        const isFocused = isCurrentDigit || (isLastDigit && isCodeFull);
        const containerStyle = containerIsFocused && isFocused
            ? [
                styles.inputContainer,
                digitContainerStyle,
                styles.inputContainerFocused,
                digitContainerFocusedStyle,
            ]
            : [styles.inputContainer, digitContainerStyle];
        return (React.createElement(View, { key: idx, style: containerStyle },
            React.createElement(Text, { style: [styles.inputText, digitStyle] }, digit)));
    };
    return (React.createElement(View, { style: [styles.textInputWrapper, wrapperStyle] },
        React.createElement(Pressable, { onPress: handleContainerPress, style: [styles.codeContainer, style] }, codeDigitsArray.map(toDigitInput)),
        React.createElement(TextInput, Object.assign({ ref: codeRef, style: styles.hiddenInput, keyboardType: "number-pad", returnKeyType: "done", textContentType: "oneTimeCode", onSubmitEditing: handleOnBlur, maxLength: codeLength, onChangeText: onCodeChangePress }, nodeProps))));
};
DialogCodeInput.displayName = "DialogCodeInput";
const buildStyles = (isDark) => StyleSheet.create({
    codeContainer: {
        width: "90%",
        flexDirection: "row",
        alignSelf: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    inputContainer: Object.assign({ flex: 1, borderColor: PlatformColor("separator"), borderBottomWidth: 3, paddingBottom: 5, marginHorizontal: 5, alignItems: "center" }, Platform.select({
        ios: {
            borderColor: PlatformColor("separator"),
        },
        android: {
            //borderColor: PlatformColor(`@android:color/${isDark ? "secondary_text_dark" : "secondary_text_light"}`),
            borderColor: isDark ? "#efefef" : "#8d8d8d",
        },
        default: {},
    })),
    inputContainerFocused: Platform.select({
        ios: {
            borderColor: PlatformColor("label"),
        },
        android: {
            /* borderColor: PlatformColor(
              `@android:color/${
                isDark ? "primary_text_dark" : "primary_text_light"
              }`
            ),*/
            borderColor: isDark ? "#58c7b9" : "#169689",
        },
        default: {},
    }),
    inputText: Platform.select({
        ios: {
            fontSize: 20,
            color: PlatformColor("label"),
        },
        android: {
            color: PlatformColor(`@android:color/${isDark ? "primary_text_dark" : "primary_text_light"}`),
            fontSize: 20,
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
    hiddenInput: {
        position: "absolute",
        height: 0,
        width: 0,
        opacity: 0,
    },
});
export default DialogCodeInput;
