import * as React from "react";
import { ReactNode } from "react";
import { StyleProp, TextStyle, SwitchProps } from "react-native";
export interface DialogSwitchProps extends SwitchProps {
    label?: ReactNode;
    unstableLabelStyle?: StyleProp<TextStyle>;
}
declare const DialogSwitch: React.FC<DialogSwitchProps>;
export default DialogSwitch;
