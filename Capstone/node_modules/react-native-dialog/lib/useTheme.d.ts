import { ColorSchemeName, StyleSheet } from "react-native";
export declare type StyleBuilder = (isDark: boolean) => StyleSheet.NamedStyles<any>;
export interface UseTheme {
    theme: ColorSchemeName;
    isDark: boolean;
    styles: StyleSheet.NamedStyles<any>;
}
declare const useTheme: (buildStyles: StyleBuilder) => UseTheme;
export default useTheme;
