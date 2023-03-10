import { useContext } from 'react'

import { MealListContext } from './../contexts/MealsContext'

export function useMealList(){
    const context = useContext(MealListContext)

    return context
}