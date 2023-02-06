import * as React from "react";
import { ReactNode } from "react";
import { TextProps, ColorValue } from "react-native";
export interface DialogButtonProps extends TextProps {
    label: ReactNode;
    color?: ColorValue;
    bold?: boolean;
    disabled?: boolean;
    onPress: () => void;
}
declare const DialogButton: React.FC<DialogButtonProps>;
export default DialogButton;
