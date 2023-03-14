import AsyncStorage from "@react-native-async-storage/async-storage"
import { MEAL_LIST } from './../storageconfig'
export async function addDay(day: string){
    try {
      const jsonValue = JSON.stringify(day)

      await AsyncStorage.setItem(MEAL_LIST, jsonValue)

    } catch (error) {
      throw error
    }
}