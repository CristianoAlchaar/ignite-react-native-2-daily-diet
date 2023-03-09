import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { ArrowLeft } from "phosphor-react-native";

import { useTheme } from 'styled-components'

import { HeaderContainer } from "./styles";

import { NewMealForm } from "./../../components/NewMealForm";


export function RegisterNewMeal(){
    const {COLORS, FONT_FAMILY, FONT_SIZE} = useTheme()

    const navigation = useNavigation();

    function handleGoBack(){
        navigation.goBack();
    }

    return (
        <SafeAreaView style={{backgroundColor:COLORS["GRAY-400"], flex: 1}}>
            <HeaderContainer>
                <TouchableOpacity onPress={handleGoBack} style={{position: "absolute", left: 24}}>
                    <ArrowLeft style={{width: 24, height: 24}} color={COLORS["GRAY-700"]}/>
                </TouchableOpacity>
                <Text style={{
                    fontFamily: FONT_FAMILY.BOLD,
                    fontSize: FONT_SIZE.LG,    
                }}>Nova Refeição</Text>
            </HeaderContainer>
            <NewMealForm />
        </SafeAreaView>
    )
}