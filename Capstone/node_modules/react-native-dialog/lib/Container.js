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
import { KeyboardAvoidingView, Platform, StyleSheet, View, PlatformColor, } from "react-native";
import Modal from "./Modal";
import useTheme from "./useTheme";
import DialogTitle from "./Title";
import DialogDescription from "./Description";
import DialogButton from "./Button";
const iOS = Platform.OS === "ios";
const DialogContainer = (props) => {
    const { blurComponentIOS, buttonSeparatorStyle, children, contentStyle, footerStyle, headerStyle, blurStyle, visible = false, verticalButtons = false, keyboardVerticalOffset = 40 } = props, nodeProps = __rest(props, ["blurComponentIOS", "buttonSeparatorStyle", "children", "contentStyle", "footerStyle", "headerStyle", "blurStyle", "visible", "verticalButtons", "keyboardVerticalOffset"]);
    const titleChildrens = [];
    const descriptionChildrens = [];
    const buttonChildrens = [];
    const otherChildrens = [];
    const { styles } = useTheme(buildStyles);
    React.Children.forEach(children, (child) => {
        var _a, _b;
        if (typeof child === "object" && child !== null && "type" in child) {
            // @ts-expect-error: "Property 'displayName' does not exist on type 'string"
            const displayName = ((_a = child.type) === null || _a === void 0 ? void 0 : _a.displayName) || ((_b = child.type) === null || _b === void 0 ? void 0 : _b.name);
            switch (displayName) {
                case DialogTitle.displayName:
                    titleChildrens.push(child);
                    return;
                case DialogDescription.displayName:
                    descriptionChildrens.push(child);
                    return;
                case DialogButton.displayName:
                    if (Platform.OS === "ios" && buttonChildrens.length > 0) {
                        buttonChildrens.push(React.createElement(View, { style: [
                                verticalButtons
                                    ? styles.buttonSeparatorVertical
                                    : styles.buttonSeparatorHorizontal,
                                buttonSeparatorStyle,
                            ] }));
                    }
                    buttonChildrens.push(child);
                    return;
            }
        }
        otherChildrens.push(child);
    });
    return (React.createElement(Modal, Object.assign({ renderToHardwareTextureAndroid: true, transparent: true, visible: visible }, nodeProps),
        React.createElement(KeyboardAvoidingView, { behavior: iOS ? "padding" : undefined, keyboardVerticalOffset: iOS ? keyboardVerticalOffset : undefined, style: styles.centeredView },
            React.createElement(View, { style: [styles.content, contentStyle] },
                Platform.OS === "ios" && blurComponentIOS,
                Platform.OS === "ios" && !blurComponentIOS && (React.createElement(View, { style: [styles.blur, blurStyle] })),
                React.createElement(View, { style: [styles.header, headerStyle] },
                    titleChildrens,
                    descriptionChildrens),
                otherChildrens,
                Boolean(buttonChildrens.length) && (React.createElement(React.Fragment, null,
                    Platform.OS === "ios" && (React.createElement(View, { style: styles.buttonSeparatorVertical })),
                    React.createElement(View, { style: [
                            styles.footer,
                            verticalButtons ? styles.footerVertical : null,
                            footerStyle,
                        ] }, buttonChildrens.map((x, i) => React.cloneElement(x, {
                        key: `dialog-button-${i}`,
                    })))))))));
};
const buildStyles = () => StyleSheet.create({
    centeredView: {
        marginTop: 22,
    },
    blur: {
        position: "absolute",
        backgroundColor: PlatformColor("systemGray6"),
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    content: Platform.select({
        ios: {
            width: 270,
            //backgroundColor: PlatformColor("systemGray6"),
            flexDirection: "column",
            borderRadius: 13,
            overflow: "hidden",
        },
        android: {
            backgroundColor: PlatformColor("?attr/colorBackgroundFloating"),
            flexDirection: "column",
            borderRadius: 3,
            padding: 16,
            margin: 16,
            overflow: "hidden",
            elevation: 4,
            minWidth: 300,
        },
        web: {
            flexDirection: "column",
            borderRadius: 3,
            padding: 16,
            margin: 16,
            backgroundColor: "white",
            overflow: "hidden",
            elevation: 4,
            minWidth: 300,
        },
        default: {},
    }),
    header: Platform.select({
        ios: {
            margin: 18,
        },
        android: {
            margin: 12,
        },
        web: {
            margin: 12,
        },
        default: {},
    }),
    footer: Object.assign({ flexDirection: "row" }, Platform.select({
        ios: {
            justifyContent: "space-between",
        },
        android: {
            alignItems: "center",
            justifyContent: "flex-end",
            marginTop: 4,
        },
        web: {
            alignItems: "center",
            justifyContent: "flex-end",
            marginTop: 4,
        },
        default: {},
    })),
    footerVertical: {
        flexDirection: "column",
    },
    buttonSeparatorHorizontal: {
        height: "100%",
        backgroundColor: PlatformColor("separator"),
        width: StyleSheet.hairlineWidth,
    },
    buttonSeparatorVertical: {
        width: "100%",
        backgroundColor: PlatformColor("separator"),
        height: StyleSheet.hairlineWidth,
    },
});
export default DialogContainer;
