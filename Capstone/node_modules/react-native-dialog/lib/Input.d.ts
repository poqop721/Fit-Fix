import * as React from "react";
import { LegacyRef, ReactNode } from "react";
import { TextInput, TextInputProps, TextStyle, ViewStyle, StyleProp } from "react-native";
export interface DialogInputProps extends TextInputProps {
    label?: ReactNode;
    wrapperStyle?: StyleProp<ViewStyle>;
    textInputRef?: LegacyRef<TextInput>;
    unstableLabelStyle?: StyleProp<TextStyle>;
}
declare const DialogInput: React.FC<DialogInputProps>;
export default DialogInput;
