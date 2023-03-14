import AsyncStorage from "@react-native-async-storage/async-storage"

import { DateProps } from "./../../contexts/MealsContext"

import { MEAL_LIST } from '../storageconfig'

export async function storeMealList(list: DateProps[]){
    try {
      const jsonValue = JSON.stringify(list)

      await AsyncStorage.setItem(MEAL_LIST, jsonValue)

    } catch (error) {
      throw error
    }
}