import React, {useEffect, useState} from 'react';

import {StyleSheet} from 'react-native';
import {Text} from "react-native-paper";

//NAVIGATION
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

//SCREENS
import HomeScreen from '../screens/HomeScreen/HomeScreen';
// import {SingleOrderProfileScreen} from '../screens/OrdersScreen/SingleOrderProfileScreen/SingleOrderProfileScreen';


//ICONS
import {Ionicons} from '@expo/vector-icons';
import {theme} from "../theme";
// import {SingleCouponProfileScreen} from "../screens/CouponsScreen/SingleCouponProfileScreen/SingleCouponProfileScreen";
import {useAuth} from "../hooks/useAuth";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const OrdersStack = () => (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Orders" component={OrdersScreen}/>
        <Stack.Screen name="SingleOrderProfile" component={SingleOrderProfileScreen}/>
    </Stack.Navigator>
);


const AuthenticatedApp = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const {user} = useAuth();

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <>
            <Tab.Navigator screenOptions={({route}) => ({
                headerShown: false,
                tabBarInactiveTintColor: theme.colors.onSurface,
                tabBarStyle: styles.tabBarStyle,
                tabBarActiveTintColor: theme.colors.primary,
                tabBarIcon: ({color, size, focused}) => {
                    let iconName;

                    if (route.name === 'Główna') {
                        iconName = focused ? 'home-sharp' : 'home-outline'
                    } else if (route.name === 'Zamówienia') {
                        iconName = focused ? 'cart-sharp' : 'cart-outline'
                    } else if (route.name === 'Zwroty') {
                        iconName = focused ? 'refresh-sharp' : 'refresh-outline'
                    } else if (route.name === 'Sklep') {
                        iconName = focused ? 'storefront' : 'storefront-outline';
                        // @ts-ignore
                        return <MaterialCommunityIcons name={iconName} size={24} color={focused ? theme.colors.primary : theme.colors.onSurface} />;
                    } else if (route.name === "Klienci") {
                        iconName = focused ? 'ios-people-sharp' : 'ios-people-outline'
                    } else if (route.name === "WpLogin") {
                        iconName = focused ?  'shield-sharp' : 'shield-outline';
                    } else {
                        iconName = focused ? 'pricetags-sharp' : 'pricetags-outline'
                    }

                    // @ts-ignore
                    return <Ionicons name={iconName} size={24}
                                     color={focused ? theme.colors.primary : theme.colors.onSurface}/>;
                },
                tabBarLabel: ({color}) => {
                    let label;
                    if (route.name === 'Główna') {
                        label = 'Główna';
                    } else if (route.name === 'Zamówienia') {
                        label = 'Zamówienia';
                    } else if (route.name === 'Zwroty') {
                        label = 'Zwroty';
                    } else if (route.name === 'Sklep') {
                        label = 'Twój Sklep';
                    } else if (route.name === 'Klienci') {
                        label = 'Klienci'
                    } else if (route.name === 'WpLogin') {
                        label = 'Autoryzacja WordPress'
                    } else {
                        label = 'Kupony';
                    }

                    // Zwracamy komponent Text zawierający tekst zakładki oraz odpowiednie style
                    return (
                        <Text variant="bodyMedium"
                              style={{color, fontSize: 13, fontFamily: "OswaldLight", marginBottom: 5}}>
                            {label}
                        </Text>
                    );
                }
            })}>
                    <>
                        <Tab.Screen name="Główna" component={HomeScreen} />
                        <Tab.Screen name="Zamówienia" component={OrdersStack} />
                    </>
            </Tab.Navigator>
        </>

    );
};

export default AuthenticatedApp;


const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: theme.colors.navigationBackground,
        borderTopWidth: 0,
        height: 72,
    },
});