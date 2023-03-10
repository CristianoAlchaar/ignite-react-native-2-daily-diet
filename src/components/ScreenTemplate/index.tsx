import { useNavigation } from "@react-navigation/native";

import { ArrowLeft } from "phosphor-react-native";
import { ReactNode } from "react";

import { SafeAreaView, Text, TouchableOpacity } from "react-native";

import {useTheme} from "styled-components"

import { HeaderContainer } from "./styles";

interface headerProps{
    headerColor: "DEFAULT" | "GREEN" | "RED",
    title: string,
    children:  ReactNode
}

export function ScreenTemplate({headerColor, title, children} : headerProps){
    const {COLORS, FONT_FAMILY, FONT_SIZE} = useTheme()

    const navigation = useNavigation();

    function handleGoBack(){
        navigation.navigate('home');
    }
    return(
        <SafeAreaView style={{
            backgroundColor:
                headerColor === "DEFAULT" ?
                    COLORS["GRAY-400"]:
                        headerColor === "GREEN" ?
                            COLORS.GREEN_LIGHT :
                                COLORS.RED_LIGHT,          
            flex: 1}}>
            <HeaderContainer>
                <TouchableOpacity onPress={handleGoBack} style={{position: "absolute", left: 24}}>
                    <ArrowLeft style={{width: 24, height: 24}} color={COLORS["GRAY-700"]}/>
                        </TouchableOpacity>
                    <Text style={{
                        fontFamily: FONT_FAMILY.BOLD,
                        fontSize: FONT_SIZE.LG,    
                    }}>{title}</Text>
            </HeaderContainer>
            {children}
        </SafeAreaView>
    )
}