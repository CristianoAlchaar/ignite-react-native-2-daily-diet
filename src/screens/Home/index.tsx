import { Text } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";

import { DietStatus } from "./../../components/DietStatus";
import { HomeHeader } from "./../../components/HomeHeader";
import { BlackButton } from "./../../components/BlackButton";

import { HomeContainer } from "./styles";

export function Home(){
    const { COLORS, FONT_FAMILY, FONT_SIZE} = useTheme()

    const navigation = useNavigation()

    function addNewMeal(){
        navigation.navigate('registernewmeal')
    }
    return (
        <HomeContainer>  
            <HomeHeader />
            <DietStatus value={60}/>
            <Text style={{
                fontFamily: FONT_FAMILY.REGULAR,
                fontSize: FONT_SIZE.MD,
                marginBottom: 8
            }}>Refeições</Text>
            <BlackButton handlePress={addNewMeal} value="+ Nova Refeição"/>
        </HomeContainer>
    )
}