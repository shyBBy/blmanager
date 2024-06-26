import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {useFonts} from "expo-font";
import {NavigationContainer} from "@react-navigation/native";
import {theme} from "./src/theme";
import {PaperProvider} from "react-native-paper";
import {SafeAreaProvider} from "react-native-safe-area-context";
import React, {useEffect, useState} from 'react';
import * as SplashScreen from 'expo-splash-screen';

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [fontsLoaded] = useFonts({
    'RobotoLight': require('./assets/fonts/Roboto-Light.ttf'),
    'RobotoRegular': require('./assets/fonts/Roboto-Regular.ttf'),
    'RobotoMedium': require('./assets/fonts/Roboto-Medium.ttf'),
    'RobotoBold': require('./assets/fonts/Roboto-Bold.ttf'),
    'AsapLight': require('./assets/fonts/Asap-Light.ttf'),
    'AsapRegular': require('./assets/fonts/Asap-Regular.ttf'),
    'AsapMedium': require('./assets/fonts/Asap-Medium.ttf'),
    'AsapBold': require('./assets/fonts/Asap-Bold.ttf'),
    'BebasNeu': require('./assets/fonts/BebasNeue-Regular.ttf'),
    'OswaldBold': require('./assets/fonts/Oswald-Bold.ttf'),
    'OswaldLight': require('./assets/fonts/Oswald-Light.ttf'),
    'OswaldMedium': require('./assets/fonts/Oswald-Medium.ttf'),
    'OswaldRegular': require('./assets/fonts/Oswald-Regular.ttf'),
    'OswaldExtraLight': require('./assets/fonts/Oswald-ExtraLight.ttf'),
    'OswaldSemiBold': require('./assets/fonts/Oswald-SemiBold.ttf'),
  })

  useEffect(() => {
    // Ukryj ekran startowy po załadowaniu czcionek
    if (fontsLoaded) {
      SplashScreen.hideAsync();
      setFontLoaded(true);
    }
  }, [fontsLoaded]);

  if (!fontLoaded) {
    return null; // Zwróć null, aby nic nie wyświetlać w trakcie ładowania czcionek
  }


  return (
      <SafeAreaProvider>
        <StatusBar style="auto"/>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <AuthProvider>
              <>
                <StatusBar style="light" />
                <RemoveRefundAndOrderProvider>
                  <AppContent/>
                </RemoveRefundAndOrderProvider>
              </>
            </AuthProvider>
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
  );
};

function AppContent() {

  const {user} = useAuth();

  return (
      <>
        {user ? <AuthenticatedApp/> : <UnauthenticatedApp/>}
      </>
  );
}

export default App;