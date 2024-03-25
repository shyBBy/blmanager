import {StackNavigationProp} from "@react-navigation/stack";

export type RootStackParamList = {
    Login: undefined;
    Główna: undefined;
    App: undefined;
    WpLogin: undefined;
    // Dodaj inne ekrany, jeśli są wymagane
};

export type WpLoginNavigationProp = StackNavigationProp<RootStackParamList, "WpLogin">;

export type LoginNavigationProp = StackNavigationProp<RootStackParamList,
    "Login">;

export type HomeNavigationProp = StackNavigationProp<RootStackParamList,
    "Główna">;

