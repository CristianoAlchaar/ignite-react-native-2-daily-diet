import { View } from "react-native";
import { useCallback, useContext, useState } from "react";
import { Text, SectionList, Pressable, Alert } from "react-native";
import { useMealList } from "./../../hooks/useMealList";

import { MealProps, MealListContext } from "./../../contexts/MealsContext"

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";

import { DietStatus } from "./../../components/DietStatus";
import { HomeHeader } from "./../../components/HomeHeader";
import { BlackButton } from "./../../components/BlackButton";
import { Loading } from "./../../components/Loading";
import { MealInfo } from "./../../components/MealInfo";

import { DateTitle, HomeContainer } from "./styles";

export function Home(){
    const [isLoading, setIsLoading] = useState(true)
    const { COLORS, FONT_FAMILY, FONT_SIZE} = useTheme()

    const { loadList } = useContext(MealListContext)

    const { mealList } = useMealList()

    const navigation = useNavigation()

    function addNewMeal(){
        navigation.navigate('registernewmeal')
    }

    function openMealDetail(item : MealProps, title : string){
        navigation.navigate('meal', {
            description: item.description,
            hour: item.hour,
            isOnDiet: item.isOnDiet,
            name: item.name,
            date: title,
        })
    }

    async function fetchMealList(){
        try{
            setIsLoading(true)
            await loadList()
        }catch(error){
            Alert.alert('Refeições','Não foi possível carregar as refeições')
            throw(error)
        }finally{
            setIsLoading(false)
        }
    }

    useFocusEffect(useCallback(() => {
        fetchMealList()
    }, []))

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

            {isLoading ? <Loading/> : 
                <SectionList 
                    sections={mealList.map(({ date, meals }) => ({
                        title: date,
                        data: meals,
                    }))}
                    keyExtractor={(item, index) => item.hour + item.name + index}
                    renderItem={({ item, section: {title} }) => (
                        <Pressable style={{marginBottom: 8}} onPress={() => openMealDetail(item, title)}> 
                            <MealInfo name={item.name} hour={item.hour} isOnDiet={item.isOnDiet}/>
                        </Pressable>
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                        <DateTitle>{title}</DateTitle>
                    )}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent= {
                        <Text style={{
                            fontFamily: FONT_FAMILY.REGULAR,
                            fontSize:FONT_SIZE.MD,
                            textAlign: 'center',
                        }}>Nenhuma refeição cadastrada, bora iniciar uma dieta?</Text>
                    }
                />
            }
        </HomeContainer>
    )
}