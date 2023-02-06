import { Component } from "react";
import { Animated, ModalProps as ReactNativeModalProps, StyleProp, ViewStyle } from "react-native";
export interface ModalProps extends ReactNativeModalProps {
    onBackdropPress?: () => void;
    onHide?: () => void;
    visible?: boolean;
    contentStyle?: StyleProp<ViewStyle>;
    useNativeDriver?: boolean;
}
interface ModalState {
    visible: boolean;
    currentAnimation: "none" | "in" | "out";
}
export declare class Modal extends Component<ModalProps, ModalState> {
    static defaultProps: Partial<ModalProps>;
    state: ModalState;
    animVal: Animated.Value;
    _isMounted: boolean;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: ModalProps): void;
    show: () => void;
    hide: () => void;
    render(): JSX.Element;
}
export default Modal;
