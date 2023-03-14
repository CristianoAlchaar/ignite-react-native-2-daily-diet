import { useRoute } from "@react-navigation/native";
import { Alert, View } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { MealListContext } from "./../../contexts/MealsContext"

import { ScreenTemplate } from "./../../components/ScreenTemplate";
import { DietTag } from "./../../components/DietTag"
import { BlackButton } from "./../../components/BlackButton"
import { TransparentButton } from "./../../components/TransparentButton"

import { DataAndHourDescription, DateAndHour, Description, InfoContainer, Title } from "./styles";
import { useContext } from "react";

interface RouteParams{
    name: string;
    description: string;
    hour: string;
    isOnDiet: boolean;
    date: string;
}

export function Meal(){
    const route = useRoute()

    const {description, hour, isOnDiet, name, date} = route.params as RouteParams
    
    const { deleteMeal } = useContext(MealListContext)

    const navigation = useNavigation()

    function handleEditMeal(){
        navigation.navigate("editmeal", {
            description,
            hour,
            isOnDiet,
            name,
            date,
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
                  return;
                },
                style: "cancel"
              },
              {
                text: "Sim, excluir",
                onPress: () => {
                    try{
                        deleteMeal(date, {description, hour, isOnDiet, name})
                        Alert.alert("Excluído", "Refeição excluída com sucesso!")
                        navigation.navigate("home")
                    }catch(error){
                        console.log(error)
                        Alert.alert("Falha na exclusão", "Não foi possível excluir a refeição.")
                    }
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
                <DateAndHour>{date} às {hour}</DateAndHour>

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