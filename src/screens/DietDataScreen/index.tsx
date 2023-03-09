import { SafeAreaView, Text, View } from "react-native";
import { useTheme } from "styled-components";

import { DataHeader } from "./../../components/DataHeader";
import { DataPanel } from "./../../components/DataPanel";
import { SquarePanel } from "./../../components/SquarePanel";

import { DietDataContainer } from "./styles";

export function DietDataScreen(){
    const {COLORS, FONT_FAMILY, FONT_SIZE} = useTheme()

    return (  
        //i have to work on this background later
        <SafeAreaView style={{backgroundColor: COLORS.GREEN_LIGHT, flex: 1}}>
          <DataHeader value={82.2}/>
          <DietDataContainer>
            <Text style={{
              marginTop: 33, 
              fontFamily: FONT_FAMILY.BOLD,
              fontSize: FONT_SIZE.MD,
            }}>Estátisticas Gerais</Text>
            <View style={{gap:12, marginTop:23}}>
              <DataPanel value={22} description="melhor sequência de pratos dentro da dieta"/>
              <DataPanel value={109} description="refeições registradas"/>
              <View style={{flexDirection: "row", gap: 12}}>
                <SquarePanel value={32} description="refeições dentro da dieta"/>
                <SquarePanel value={77} description="refeições fora da dieta" type="RED"/>         
              </View>
            </View>
          </DietDataContainer>
        </SafeAreaView> 
    )
}