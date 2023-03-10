import { StatusBar } from "react-native";

import { Routes } from "./src/routes";

import { ThemeProvider } from 'styled-components/native'
import theme from "./src/theme";

import {useFonts, NunitoSans_400Regular, NunitoSans_700Bold} from '@expo-google-fonts/nunito-sans'

import { Loading } from './src/components/Loading';

import { MealsListContextProvider } from "./src/contexts/MealsContext";

export default function App() {
  const [fontsLoaded] = useFonts({ NunitoSans_400Regular, NunitoSans_700Bold })

  return(
    <ThemeProvider theme={theme}>
      <StatusBar 
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <MealsListContextProvider>
        { fontsLoaded ? <Routes /> : <Loading />}
      </MealsListContextProvider>
    </ThemeProvider>
  ) 
    
}


