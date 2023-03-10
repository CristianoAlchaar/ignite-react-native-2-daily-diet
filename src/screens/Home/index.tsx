import { Text, SectionList, Pressable } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";

import { DietStatus } from "./../../components/DietStatus";
import { HomeHeader } from "./../../components/HomeHeader";
import { BlackButton } from "./../../components/BlackButton";

import { DateTitle, HomeContainer } from "./styles";

import { useMealList } from "./../../hooks/useMealList";

import { MealInfo } from "./../../components/MealInfo";

import { MealProps } from "./../../contexts/MealsContext"
import { View } from "react-native";

export function Home(){
    const { COLORS, FONT_FAMILY, FONT_SIZE} = useTheme()

    const { mealList } = useMealList()

    const navigation = useNavigation()

    function addNewMeal(){
        navigation.navigate('registernewmeal')
    }

    function openMealDetail(item : MealProps){
        navigation.navigate('meal', {
            description: item.description,
            hour: item.hour,
            isOnDiet: item.isOnDiet,
            name: item.name,
        })
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
            <View style={{marginBottom: 20}}>
                <BlackButton handlePress={addNewMeal} value="+ Nova Refeição"/>
            </View>

            <SectionList 
                sections={mealList.map(({ date, meals }) => ({
                    title: date,
                    data: meals,
                  }))}
                keyExtractor={(item, index) => item.hour + item.name + index}
                renderItem={({ item }) => (
                    <Pressable style={{marginBottom: 8}} onPress={() => openMealDetail(item)}>
                        <MealInfo name={item.name} hour={item.hour} isOnDiet={item.isOnDiet}/>
                    </Pressable>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <DateTitle>{title}</DateTitle>
                )}
                showsVerticalScrollIndicator={false}
            />
        </HomeContainer>
    )
}