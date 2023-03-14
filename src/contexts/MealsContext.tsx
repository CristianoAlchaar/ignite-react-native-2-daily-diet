import { createContext, ReactNode, useState } from "react";

import { isEqual } from 'lodash';

import { getMealsList } from "./../storage/mealList/getMealsList"
import { storeMealList } from "./../storage/mealList/storeMealList";

export interface MealProps {
    hour: string,
    name: string,
    description: string,
    isOnDiet: boolean,
}

export interface DateProps{
    date: string,
    meals : MealProps[],
}

interface ListByDayProps{
    mealList: DateProps[]
}

interface MealsListContextProviderProps {
    children: ReactNode
}

interface MealsListContextProps{
    mealList: DateProps[],
    loadList: () => void,
    addMeal: ({date, meals} : DateProps) => void,
    deleteMeal: (date : string, mealToBeRemoved : MealProps) => void,
    editMeal: (dateMealToBeDeleted: string, mealToBeDeleted: MealProps, dateMealToBeAdded: string, mealToBeAdded: MealProps) => void,
}

export const MealListContext = createContext<MealsListContextProps>({} as MealsListContextProps)

const temporaryList : DateProps[] = [
    {
        date: '1/03/2023',
        meals: [
            {
                name: 'Hamburger',
                description: 'Hamburguer do BK',
                hour: '08:00',
                isOnDiet: false
            },
            {
                name: 'Salada',
                description: 'Saladinha de alface com tomate',
                hour: '12:00',
                isOnDiet: true
            },
            {
                name: 'Whey Protein',
                description: 'Whey com leite.',
                hour: '15:00',
                isOnDiet: true
            },
            {
                name: 'Ovo cozido',
                description: 'Ovo cozido com linhaça',
                hour: '21:00',
                isOnDiet: true
            },
        ]
    },
    {
        date: '2/03/2023',
        meals: [
            {
                name: 'Salada',
                description: 'Saladinha de alface com tomate',
                hour: '08:00',
                isOnDiet: true,
            },
            {
                name: 'Whey Protein',
                description: 'Whey com leite.',
                hour: '12:00',
                isOnDiet: true
            },
            {
                name: 'Ovo cozido',
                description: 'Ovo cozido com linhaça',
                hour: '15:00',
                isOnDiet: true
            },
            {
                name: 'Chocolateo',
                description: 'Chocolate cacau show',
                hour: '22:00',
                isOnDiet: false
            },
        ]
    },
    {
        date: '3/03/2023',
        meals: [
            {
                name: 'Pão com Nescau',
                description: 'Pão francês com achocolatado',
                hour: '07:00',
                isOnDiet: false
            },
            {
                name: 'Arroz com carne',
                description: 'Arroz integral com batata e bife',
                hour: '13:00',
                isOnDiet: false,
            },
            {
                name: 'Whey Birl',
                description: 'Whey com leite.',
                hour: '16:00',
                isOnDiet: true
            },
            {
                name: 'Pipoca',
                description: 'Pipoca doce',
                hour: '18:00',
                isOnDiet: false
            },
            {
                name: 'Shake Herbalife',
                description: 'Shake sabor cookies batido com banana e proteina',
                hour: '23:00',
                isOnDiet: true
            },
        ]
    },
]

export function MealsListContextProvider({children} : MealsListContextProviderProps){
    const [list, setList] = useState<DateProps[]>([])
    
    async function loadList(){
        try{
            const list = await getMealsList()
            
            setList(list)
        }catch(error){
            throw error
        }
    }

    async function addMeal({date, meals} : DateProps){ 

        const existingDayIndex = list.findIndex((day) => day.date === date); 
        
        try{ 
            if (existingDayIndex !== -1){
                const updatedList = [...list]
                updatedList[existingDayIndex] = {
                    ...updatedList[existingDayIndex],
                    meals: [...updatedList[existingDayIndex].meals, ...meals],
                }

                sortMealsOnDay(existingDayIndex, updatedList)
                
            } else{
                const newDay = { date, meals }
                const updatedList = [...list, newDay]
            
                sortDailyList(updatedList)
            } 
        } catch(error){
            throw error
        }
    }

    function sortDailyList( listToOrder : DateProps[]){
        const updatedList = listToOrder.sort((a, b) => b.date.localeCompare(a.date))

        setList(updatedList)

        //StoreNewSortedList
        try{
            saveListChanges(updatedList)
        }catch(error){
            throw error
        }
    }

    function sortMealsOnDay(index : number, listToOrder : DateProps[]){
        // Sort meals on day by hour
        const updatedDay = {
            ...listToOrder[index],
            meals: listToOrder[index].meals.sort((a, b) => {
                //This value 2000-01-01T doesnt matter, 
                //its just used so i can create a Date and check wich one came first
                const timeA = new Date(`2000-01-01T${a.hour}`)
                const timeB = new Date(`2000-01-01T${b.hour}`)
                return timeB.getTime() - timeA.getTime()
            }),
          }
        
        const updatedList = [
            ...listToOrder.slice(0, index),
            updatedDay,
            ...listToOrder.slice(index + 1),
        ]
        
        //Updates the list with the modified day
        setList(updatedList)

        //StoreNewSortedList
        try{
            saveListChanges(updatedList)
        }catch(error){
            throw error
        }  
    }

    async function saveListChanges(listToSave : DateProps[]){
        try{
            await storeMealList(listToSave)
        }
        catch(error){
            throw error
        }
    }

    async function deleteMeal(date : string, mealToBeRemoved : MealProps){
       
        const dayIndex = list.findIndex((day) => day.date === date)
        
        const day = list[dayIndex]

        const mealIndex = day.meals.findIndex((meal) => isEqual(meal, mealToBeRemoved));

        const updatedMeals = [...day.meals.slice(0, mealIndex), ...day.meals.slice(mealIndex + 1)]

        const updatedDay = {
            ...day,
            meals: updatedMeals,
        }

        const updatedList = [...list.slice(0, dayIndex), updatedDay, ...list.slice(dayIndex + 1)]

        try{
            saveListChanges(updatedList)
            setList(updatedList)
        }catch(error){
            throw error
        }
    }

    async function editMeal(dateMealToBeDeleted: string, mealToBeDeleted: MealProps, dateMealToBeAdded: string, mealToBeAdded: MealProps){

        try{
            //REMOVE    
            const dayIndex = list.findIndex((day) => day.date === dateMealToBeDeleted)
            
            const day = list[dayIndex]

            const mealIndex = day.meals.findIndex((meal) => isEqual(meal, mealToBeDeleted));

            const updatedMeals = [...day.meals.slice(0, mealIndex), ...day.meals.slice(mealIndex + 1)]

            const updatedDay = {
                ...day,
                meals: updatedMeals,
            }

            const updatedListWithRemovedOne = [...list.slice(0, dayIndex), updatedDay, ...list.slice(dayIndex + 1)]

            //ADD MEAL WITH MODIFICATIONS
            const existingDayIndex = updatedListWithRemovedOne.findIndex((day) => day.date === dateMealToBeAdded); 
        
            if (existingDayIndex !== -1){
                const updatedList = [...updatedListWithRemovedOne]
                updatedList[existingDayIndex] = {
                    ...updatedList[existingDayIndex],
                    meals: [...updatedList[existingDayIndex].meals, ...[mealToBeAdded]],
                }

                sortMealsOnDay(existingDayIndex, updatedList)
                
            } else{
                const newDay : DateProps = {
                    date: dateMealToBeAdded,
                    meals: [
                        mealToBeAdded
                    ]
                }
                const updatedList = [...updatedListWithRemovedOne, newDay]
            
                sortDailyList(updatedList)
            } 
    
        } catch (error){
            throw error
        }
    }

    return(
        <MealListContext.Provider value={{
            mealList: list,
            loadList,
            addMeal,
            deleteMeal,
            editMeal,
        }}>
            {children}
        </MealListContext.Provider>
    )
}