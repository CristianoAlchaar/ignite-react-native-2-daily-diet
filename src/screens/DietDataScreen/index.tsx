import { useContext } from "react"
import { Alert, SafeAreaView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";

import { MealListContext } from "./../../contexts/MealsContext";

import { DataHeader } from "./../../components/DataHeader";
import { DataPanel } from "./../../components/DataPanel";
import { SquarePanel } from "./../../components/SquarePanel";
import { BlackButton } from "./../../components/BlackButton";
import { DietDataContainer } from "./styles";



export function DietDataScreen(){
    const {COLORS, FONT_FAMILY, FONT_SIZE} = useTheme()

    const navigation = useNavigation()

    const { resetDiet, dataAboutDiet } = useContext(MealListContext)

    const { bestSequenceOndDiet, 
      mealsOnDiet, 
      mealsOutOfDiet, 
      percentageInDiet, 
      totalRegisteredMeals} 
      = dataAboutDiet

    function handleReseteDietClick(){
      return Alert.alert(
        "Reset",
        "Tem certeza que deseja resetar a dieta? Ao fazer isso todas as refeições serão excluídas",
        [
          {
            text: "Cancelar",
            onPress: () => {
              return;
            },
            style: "cancel"
          },
          {
            text: "Sim, excluir todos os dados",
            onPress: () => {
                try{
                    resetDiet()
                    Alert.alert("Resetado", "Dieta resetada com sucesso!")
                    navigation.navigate("home")
                }catch(error){
                    console.log(error)
                    Alert.alert("Falha", "Não foi possível resetar a dieta.")
                }
            },
          },
        ]
      );
    }

    return (  
        <SafeAreaView style={{backgroundColor: percentageInDiet > 50 ? COLORS.GREEN_LIGHT : COLORS.RED_LIGHT, flex: 1}}>
          <DataHeader value={percentageInDiet}/>
          <DietDataContainer>
            <Text style={{
              marginTop: 33, 
              fontFamily: FONT_FAMILY.BOLD,
              fontSize: FONT_SIZE.MD,
            }}>Estátisticas Gerais</Text>
            <View style={{gap:12, marginTop:23}}>
              <DataPanel value={bestSequenceOndDiet} description="melhor sequência de pratos dentro da dieta"/>
              <DataPanel value={totalRegisteredMeals} description="refeições registradas"/>
              <View style={{flexDirection: "row", gap: 12}}>
                <SquarePanel value={mealsOnDiet} description="refeições dentro da dieta"/>
                <SquarePanel value={mealsOutOfDiet} description="refeições fora da dieta" type="RED"/>         
              </View>
            </View>

            <View style={{marginTop: 'auto', marginBottom: 10, width: '80%'}}>
              <BlackButton value="Resetar dieta" handlePress={handleReseteDietClick}/>
            </View>
          </DietDataContainer>
        </SafeAreaView> 
    )
}