import * as React from "react";
import { PropsWithChildren, ReactNode } from "react";
import { ViewStyle, StyleProp } from "react-native";
export declare type DialogContainerProps = PropsWithChildren<{
    blurComponentIOS?: ReactNode;
    buttonSeparatorStyle?: StyleProp<ViewStyle>;
    contentStyle?: StyleProp<ViewStyle>;
    footerStyle?: StyleProp<ViewStyle>;
    headerStyle?: StyleProp<ViewStyle>;
    blurStyle?: StyleProp<ViewStyle>;
    visible?: boolean;
    verticalButtons?: boolean;
    onBackdropPress?: () => void;
    onRequestClose?: () => void;
    keyboardVerticalOffset?: number;
    useNativeDriver?: boolean;
}>;
declare const DialogContainer: React.FC<DialogContainerProps>;
export default DialogContainer;
