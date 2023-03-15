import { createContext, ReactNode, useState } from "react";

import { isEqual } from 'lodash';

import { getMealsList } from "./../storage/mealList/getMealsList"
import { storeMealList } from "./../storage/mealList/storeMealList"

import { getDataAboutDiet } from "./../storage/dataAboutDiet/getDataAboutDiet"
import { storeDataAboutDiet } from "./../storage/dataAboutDiet/storeDataAboutDiet"

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

export interface DataAboutDietProps{
    percentageInDiet: number,
    currentSequenceOnDiet: number,
    bestSequenceOndDiet: number,
    totalRegisteredMeals: number,
    mealsOnDiet: number,
    mealsOutOfDiet: number,
}

interface MealsListContextProps{
    mealList: DateProps[],
    dataAboutDiet: DataAboutDietProps,
    loadList: () => void,
    addMeal: ({date, meals} : DateProps) => void,
    deleteMeal: (date : string, mealToBeRemoved : MealProps) => void,
    editMeal: (dateMealToBeDeleted: string, mealToBeDeleted: MealProps, dateMealToBeAdded: string, mealToBeAdded: MealProps) => void,
    resetDiet: () => void,
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
   
    const [dataAboutDiet, setDataAboutDiet] = useState<DataAboutDietProps>({
        bestSequenceOndDiet: 0,
        currentSequenceOnDiet: 0,
        mealsOnDiet: 0,
        mealsOutOfDiet: 0,
        percentageInDiet: 0,
        totalRegisteredMeals: 0,
    })
    
    async function loadList(){
        try{
            const list = await getMealsList()
            
            const data = await getDataAboutDiet()

            setList(list)

            setDataAboutDiet(data)

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
                
                meals[0].isOnDiet ? addOnDietCount() : addOutDietCount()
    
            } else{
                const newDay = { date, meals }
                const updatedList = [...list, newDay]
            
                sortDailyList(updatedList)

                meals[0].isOnDiet ? addOnDietCount() : addOutDietCount()
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

            //UPDATE DataAboutDiet
            mealToBeRemoved.isOnDiet ? removeOnDietCount() :  removeOutDietCount()
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

            //editData about meal calling function
            editDietData(mealToBeDeleted.isOnDiet, mealToBeAdded.isOnDiet)
    
        } catch (error){
            throw error
        }
    }

    async function resetDiet(){
        try{ 
            const resetedList : DateProps[] = []
            const resetedData : DataAboutDietProps = {
                bestSequenceOndDiet: 0,
                currentSequenceOnDiet: 0,
                mealsOnDiet: 0,
                mealsOutOfDiet: 0,
                percentageInDiet: 0,
                totalRegisteredMeals: 0,
            }

            saveListChanges(resetedList)
            storeDataAboutDiet(resetedData)

            setList(resetedList)
            setDataAboutDiet(resetedData)

        }catch(error){
            throw(error)
        }
    }

    async function addOnDietCount(){
        const updatedDataAboutDiet = { ...dataAboutDiet } 

        updatedDataAboutDiet.currentSequenceOnDiet += 1 

        if(updatedDataAboutDiet.currentSequenceOnDiet > updatedDataAboutDiet.bestSequenceOndDiet){
            updatedDataAboutDiet.bestSequenceOndDiet = updatedDataAboutDiet.currentSequenceOnDiet
        }  

        updatedDataAboutDiet.mealsOnDiet += 1

        updatedDataAboutDiet.totalRegisteredMeals += 1

        updatedDataAboutDiet.percentageInDiet = Number((((updatedDataAboutDiet.mealsOnDiet) / updatedDataAboutDiet.totalRegisteredMeals) * 100).toFixed(2))

        try{
            storeDataAboutDiet(updatedDataAboutDiet)
            setDataAboutDiet(updatedDataAboutDiet)
        }catch(error){
            throw(error)
        }
    }

    async function addOutDietCount(){
        const updatedDataAboutDiet = { ...dataAboutDiet } 

        updatedDataAboutDiet.currentSequenceOnDiet = 0 

        updatedDataAboutDiet.mealsOutOfDiet += 1

        updatedDataAboutDiet.totalRegisteredMeals += 1

        updatedDataAboutDiet.percentageInDiet = Number((((updatedDataAboutDiet.mealsOnDiet) / updatedDataAboutDiet.totalRegisteredMeals) * 100).toFixed(2))

        try{
            storeDataAboutDiet(updatedDataAboutDiet)
            setDataAboutDiet(updatedDataAboutDiet)
        }catch(error){
            throw(error)
        }
    }

    async function removeOnDietCount() {
        const updatedDataAboutDiet = { ...dataAboutDiet };

        updatedDataAboutDiet.currentSequenceOnDiet -= 1;

        updatedDataAboutDiet.mealsOnDiet -= 1;

        updatedDataAboutDiet.totalRegisteredMeals -= 1;

        updatedDataAboutDiet.percentageInDiet = Number((((updatedDataAboutDiet.mealsOnDiet) / updatedDataAboutDiet.totalRegisteredMeals) * 100).toFixed(2))

        try {
            storeDataAboutDiet(updatedDataAboutDiet);
            setDataAboutDiet(updatedDataAboutDiet);
        } catch(error) {
            throw(error);
        }
    }

    async function removeOutDietCount(){
        const updatedDataAboutDiet = { ...dataAboutDiet } 

        updatedDataAboutDiet.mealsOutOfDiet -= 1

        updatedDataAboutDiet.totalRegisteredMeals -= 1

        updatedDataAboutDiet.percentageInDiet = Number((((updatedDataAboutDiet.mealsOnDiet) / updatedDataAboutDiet.totalRegisteredMeals) * 100).toFixed(2))

        try{
            storeDataAboutDiet(updatedDataAboutDiet)
            setDataAboutDiet(updatedDataAboutDiet)
        }catch(error){
            throw(error)
        }
    }

    async function editDietData(mealToBeRemovedIsOnDiet : boolean, mealToBeAddedIsOnDiet : boolean){
        //If mealOnDiet was not edited, it is not necessary to change anything
        if (mealToBeRemovedIsOnDiet != mealToBeAddedIsOnDiet){
            const updatedDataAboutDiet = { ...dataAboutDiet } 

            //checks for remove data about removed meal
            if(mealToBeRemovedIsOnDiet){
                updatedDataAboutDiet.mealsOnDiet -= 1

                updatedDataAboutDiet.totalRegisteredMeals -= 1

                updatedDataAboutDiet.percentageInDiet = Number((((updatedDataAboutDiet.mealsOnDiet) / updatedDataAboutDiet.totalRegisteredMeals) * 100).toFixed(2))
            }else{
                updatedDataAboutDiet.mealsOutOfDiet -= 1

                updatedDataAboutDiet.totalRegisteredMeals -= 1

                updatedDataAboutDiet.percentageInDiet = Number((((updatedDataAboutDiet.mealsOnDiet) / updatedDataAboutDiet.totalRegisteredMeals) * 100).toFixed(2))
            }

            //checks for add data about added meal
            if(mealToBeAddedIsOnDiet){
                updatedDataAboutDiet.mealsOnDiet += 1

                updatedDataAboutDiet.totalRegisteredMeals += 1

                updatedDataAboutDiet.percentageInDiet = Number((((updatedDataAboutDiet.mealsOnDiet) / updatedDataAboutDiet.totalRegisteredMeals) * 100).toFixed(2))
            }else{
                updatedDataAboutDiet.mealsOutOfDiet += 1

                updatedDataAboutDiet.totalRegisteredMeals += 1

                updatedDataAboutDiet.percentageInDiet = Number((((updatedDataAboutDiet.mealsOnDiet) / updatedDataAboutDiet.totalRegisteredMeals) * 100).toFixed(2))
            }

            //try to set edited data
            try{
                storeDataAboutDiet(updatedDataAboutDiet)
                setDataAboutDiet(updatedDataAboutDiet)
            }catch(error){
                throw(error)
            }
        }
    }

    return(
        <MealListContext.Provider value={{
            mealList: list,
            dataAboutDiet,
            loadList,
            addMeal,
            deleteMeal,
            editMeal,
            resetDiet,
        }}>
            {children}
        </MealListContext.Provider>
    )
}