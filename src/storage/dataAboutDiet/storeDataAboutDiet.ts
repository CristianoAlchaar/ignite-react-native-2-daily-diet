import AsyncStorage from "@react-native-async-storage/async-storage"

import { DataAboutDietProps } from "../../contexts/MealsContext"

import { DATA_ABOUT_DIET } from '../storageconfig'

export async function storeDataAboutDiet(data: DataAboutDietProps){
    try {
      const jsonValue = JSON.stringify(data)

      await AsyncStorage.setItem(DATA_ABOUT_DIET, jsonValue)

    } catch (error) {
      throw error
    }
}