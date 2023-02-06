import * as React from "react";
import { TextInputProps, ViewStyle, StyleProp, TextStyle } from "react-native";
export interface DialogCodeInputProps extends TextInputProps {
    autoFocus?: boolean;
    style?: StyleProp<ViewStyle>;
    wrapperStyle?: StyleProp<ViewStyle>;
    digitContainerStyle?: StyleProp<ViewStyle>;
    digitContainerFocusedStyle?: StyleProp<ViewStyle>;
    digitStyle?: StyleProp<TextStyle>;
    codeLength?: number;
    onCodeChange?: (code: string) => void;
}
declare const DialogCodeInput: React.FC<DialogCodeInputProps>;
export default DialogCodeInput;
