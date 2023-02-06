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
import { Component } from "react";
import { Animated, Easing, Modal as ReactNativeModal, Platform, StyleSheet, TouchableWithoutFeedback, } from "react-native";
const MODAL_ANIM_DURATION = 300;
const MODAL_BACKDROP_OPACITY = 0.3;
const CONTENT_ANIMATION_IN = Platform.select({
    ios: {
        opacity: {
            inputRange: [0, 1],
            outputRange: [0, 1],
        },
        scale: {
            inputRange: [0, 0.5, 1],
            outputRange: [1.2, 1.1, 1],
        },
    },
    android: {
        opacity: {
            inputRange: [0, 0.5, 1],
            outputRange: [0, 1, 1],
        },
        scale: {
            inputRange: [0, 1],
            outputRange: [0.3, 1],
        },
    },
    default: {
        opacity: {
            inputRange: [0, 0.5, 1],
            outputRange: [0, 1, 1],
        },
        scale: {
            inputRange: [0, 1],
            outputRange: [0.3, 1],
        },
    },
});
const CONTENT_ANIMATION_OUT = Platform.select({
    default: {
        opacity: {
            inputRange: [0, 1],
            outputRange: [0, 1],
        },
    },
});
export class Modal extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            visible: Boolean(this.props.visible),
            currentAnimation: "none",
        };
        this.animVal = new Animated.Value(0);
        this._isMounted = false;
        this.show = () => {
            this.setState({ visible: true, currentAnimation: "in" }, () => {
                Animated.timing(this.animVal, {
                    easing: Easing.inOut(Easing.quad),
                    useNativeDriver: Boolean(this.props.useNativeDriver),
                    duration: MODAL_ANIM_DURATION,
                    toValue: 1,
                }).start(() => {
                    this.setState({ currentAnimation: "none" });
                });
            });
        };
        this.hide = () => {
            this.setState({ currentAnimation: "out" }, () => {
                Animated.timing(this.animVal, {
                    easing: Easing.inOut(Easing.quad),
                    useNativeDriver: Boolean(this.props.useNativeDriver),
                    duration: MODAL_ANIM_DURATION,
                    toValue: 0,
                }).start(() => {
                    if (this._isMounted) {
                        this.setState({ currentAnimation: "none" });
                        this.setState({ visible: false }, this.props.onHide);
                    }
                });
            });
        };
    }
    componentDidMount() {
        this._isMounted = true;
        if (this.state.visible) {
            this.show();
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    componentDidUpdate(prevProps) {
        if (this.props.visible && !prevProps.visible) {
            this.show();
        }
        else if (!this.props.visible && prevProps.visible) {
            this.hide();
        }
    }
    render() {
        const _a = this.props, { children, onBackdropPress, contentStyle } = _a, otherProps = __rest(_a, ["children", "onBackdropPress", "contentStyle"]);
        const { currentAnimation, visible } = this.state;
        const backdropAnimatedStyle = {
            opacity: this.animVal.interpolate({
                inputRange: [0, 1],
                outputRange: [0, MODAL_BACKDROP_OPACITY],
            }),
        };
        const contentAnimatedStyle = currentAnimation === "in"
            ? {
                opacity: this.animVal.interpolate({
                    inputRange: CONTENT_ANIMATION_IN.opacity.inputRange,
                    outputRange: CONTENT_ANIMATION_IN.opacity.outputRange,
                    extrapolate: "clamp",
                }),
                transform: [
                    {
                        scale: this.animVal.interpolate({
                            inputRange: CONTENT_ANIMATION_IN.scale.inputRange,
                            outputRange: CONTENT_ANIMATION_IN.scale.outputRange,
                            extrapolate: "clamp",
                        }),
                    },
                ],
            }
            : {
                opacity: this.animVal.interpolate({
                    inputRange: CONTENT_ANIMATION_OUT.opacity.inputRange,
                    outputRange: CONTENT_ANIMATION_OUT.opacity.outputRange,
                    extrapolate: "clamp",
                }),
            };
        return (React.createElement(ReactNativeModal, Object.assign({ transparent: true, animationType: "none" }, otherProps, { visible: visible }),
            React.createElement(TouchableWithoutFeedback, { onPress: onBackdropPress },
                React.createElement(Animated.View, { style: [styles.backdrop, backdropAnimatedStyle] })),
            visible && (React.createElement(Animated.View, { style: [styles.content, contentAnimatedStyle, contentStyle], pointerEvents: "box-none", 
                // Setting "needsOffscreenAlphaCompositing" solves a janky elevation
                // animation on android. We should set it only while animation
                // to avoid using more memory than needed.
                // See: https://github.com/facebook/react-native/issues/23090
                needsOffscreenAlphaCompositing: ["in", "out"].includes(currentAnimation) }, children))));
    }
}
Modal.defaultProps = {
    onBackdropPress: () => null,
    onHide: () => null,
    visible: false,
    useNativeDriver: false,
};
const styles = StyleSheet.create({
    backdrop: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "black",
        opacity: 0,
    },
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
export default Modal;
