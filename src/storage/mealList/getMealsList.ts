import AsyncStorage from "@react-native-async-storage/async-storage";
import { MEAL_LIST } from "./../storageconfig"

import { DateProps } from "./../../contexts/MealsContext"

export async function getMealsList() {
    try{
        const storage = await AsyncStorage.getItem(MEAL_LIST)

        const mealList: DateProps[] = storage ? JSON.parse(storage) : []

        return mealList
    }catch(error){
        throw error
    }    
}