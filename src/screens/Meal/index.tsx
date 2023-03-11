import { useRoute } from "@react-navigation/native";
import { Alert, View } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { ScreenTemplate } from "./../../components/ScreenTemplate";
import { DietTag } from "./../../components/DietTag"
import { BlackButton } from "./../../components/BlackButton"
import { TransparentButton } from "./../../components/TransparentButton"

import { DataAndHourDescription, DateAndHour, Description, InfoContainer, Title } from "./styles";

interface RouteParams{
    name: string;
    description: string;
    hour: string;
    isOnDiet: boolean;
}

export function Meal(){
    const route = useRoute()

    const {description, hour, isOnDiet, name} = route.params as RouteParams
    
    const navigation = useNavigation()

    function handleEditMeal(){
        navigation.navigate("editmeal", {
            description,
            hour,
            isOnDiet,
            name,
        })
    }

    function handleDeleteMeal(){
        return Alert.alert(
            "",
            "Deseja realmente excluir o registro da refeição?",
            [
              {
                text: "Cancelar",
                onPress: () => {
                  console.log("Cancelar");
                },
                style: "cancel"
              },
              {
                text: "Sim, excluir",
                onPress: () => {
                    console.log('Excluir')
                },
              },
            ]
          );
    }

    return (
        <ScreenTemplate headerColor={isOnDiet ? "GREEN" : "RED"} title="Refeição">
            <InfoContainer>
                <Title>{name}</Title>
                <Description>{description}</Description>
                <DataAndHourDescription>Data e hora</DataAndHourDescription>
                <DateAndHour>16/04/2023 às {hour}</DateAndHour>

                <View style={{marginTop: 24}}>
                    <DietTag isOnDiet/>
                </View>

                <View style={{marginTop: "auto", gap: 9}}>
                    <BlackButton value="Editar Refeição" handlePress={handleEditMeal}/>
                    <TransparentButton value="Excluir Refeição" handlePress={handleDeleteMeal}/>
                </View>
            </InfoContainer>
        </ScreenTemplate>
    )
}