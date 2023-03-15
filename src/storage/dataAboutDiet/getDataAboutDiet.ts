import AsyncStorage from "@react-native-async-storage/async-storage";
import { DATA_ABOUT_DIET } from "../storageconfig"

import { DataAboutDietProps } from "../../contexts/MealsContext"

export async function getDataAboutDiet() {
    try{
        const storage = await AsyncStorage.getItem(DATA_ABOUT_DIET)

        const data: DataAboutDietProps = storage ? JSON.parse(storage) : {
            bestSequenceOndDiet: 0,
            currentSequenceOnDiet: 0,
            mealsOnDiet: 0,
            mealsOutOfDiet: 0,
            percentageInDiet: 0,
            totalRegisteredMeals: 0,
        }

        return data
    }catch(error){
        throw error
    }    
}