import { createContext, ReactNode, useState } from "react";

import { isEqual } from 'lodash';

import { getMealsList } from "./../storage/mealList/getMealsList"
import { storeMealList } from "./../storage/mealList/storeMealList"

import { getDataAboutDiet } from "./../storage/dataAboutDiet/getDataAboutDiet"
import { storeDataAboutDiet } from "./../storage/dataAboutDiet/storeDataAboutDiet"

import { convertStringToDate } from '../lib/convertStringToDate'

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
    startCurrentSequenceDate: string,
    startCurrentSequenceHour: string,
    lastMealOutOfDietDate: string,
    lastMealOutOfDietHour: string,
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
        startCurrentSequenceDate: "",
        startCurrentSequenceHour: "",
        lastMealOutOfDietDate: "",
        lastMealOutOfDietHour: "",
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

    function addMeal({date, meals} : DateProps){ 

        const existingDayIndex = list.findIndex((day) => day.date === date); 
        
        try{ 
            if (existingDayIndex !== -1){
                const updatedList = [...list]
                updatedList[existingDayIndex] = {
                    ...updatedList[existingDayIndex],
                    meals: [...updatedList[existingDayIndex].meals, ...meals],
                }

                sortMealsOnDay(existingDayIndex, updatedList)
                
                meals[0].isOnDiet ? addOnDietCount(date, meals[0].hour) : addOutDietCount(date, meals[0].hour)
    
            } else{
                const newDay = { date, meals }
                const updatedList = [...list, newDay]
            
                sortDailyList(updatedList)

                meals[0].isOnDiet ? addOnDietCount(date, meals[0].hour) : addOutDietCount(date, meals[0].hour)
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
                const timeA : Date = new Date(`2000-01-01T${a.hour}`)
                const timeB : Date = new Date(`2000-01-01T${b.hour}`)
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
            mealToBeRemoved.isOnDiet ? removeOnDietCount(date, mealToBeRemoved.hour) :  removeOutDietCount()
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

    function resetDiet(){
        try{ 
            const resetedList : DateProps[] = []
            const resetedData : DataAboutDietProps = {
                bestSequenceOndDiet: 0,
                currentSequenceOnDiet: 0,
                mealsOnDiet: 0,
                mealsOutOfDiet: 0,
                percentageInDiet: 0,
                totalRegisteredMeals: 0,
                startCurrentSequenceDate: "",
                startCurrentSequenceHour: "",
                lastMealOutOfDietDate: "",
                lastMealOutOfDietHour: "",
            }

            saveListChanges(resetedList)
            storeDataAboutDiet(resetedData)

            setList(resetedList)
            setDataAboutDiet(resetedData)

        }catch(error){
            throw(error)
        }
    }

    function addOnDietCount(addedMealDate : string, addedMealTime: string){
      
        const updatedDataAboutDiet = { ...dataAboutDiet } 

        const addedConvertedDate = convertStringToDate(addedMealDate, addedMealTime)
        
        const currentSequenceDate = convertStringToDate(dataAboutDiet.startCurrentSequenceDate, dataAboutDiet.startCurrentSequenceHour)

        const convertedToDateLastMealOutOfDiet = convertStringToDate(dataAboutDiet.lastMealOutOfDietDate, dataAboutDiet.lastMealOutOfDietHour)

        //check if there is a current sequence
        if(currentSequenceDate != undefined){
            //check if addedMeal is inside the current sequence
            if(addedConvertedDate!.getTime() >=  currentSequenceDate.getTime()){
                //is inside the current sequence
                updatedDataAboutDiet.currentSequenceOnDiet += 1
            }else{
                //check if addedMeal coming before the last Meal out of diet or
                //if its undefined it means there is no mealOutOfDiet but it comes 
                //before the lastMealOnDiet, so it has to update the current sequence start
                if(convertedToDateLastMealOutOfDiet == undefined || 
                    addedConvertedDate!.getTime() >= convertedToDateLastMealOutOfDiet.getTime()){

                        updatedDataAboutDiet.currentSequenceOnDiet += 1

                        updatedDataAboutDiet.startCurrentSequenceDate = addedMealDate

                        updatedDataAboutDiet.startCurrentSequenceHour = addedMealTime
                }
            }
        }

        //if there isnt a current sequence, create one
        else{
            updatedDataAboutDiet.currentSequenceOnDiet = 1

            updatedDataAboutDiet.startCurrentSequenceDate = addedMealDate

            updatedDataAboutDiet.startCurrentSequenceHour = addedMealTime
        }
        
        //check if the current sequence is greater than best sequence
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

    async function addOutDietCount(addedMealDate : string, addedMealTime: string){
        const updatedDataAboutDiet = { ...dataAboutDiet } 

        const addedConvertedDate = convertStringToDate(addedMealDate, addedMealTime)
        
        const currentSequenceDate = convertStringToDate(dataAboutDiet.startCurrentSequenceDate, dataAboutDiet.startCurrentSequenceHour)

        const convertedToDateLastMealOutOfDiet = convertStringToDate(dataAboutDiet.lastMealOutOfDietDate, dataAboutDiet.lastMealOutOfDietHour)

        //check if there is a last meal out of diet
        if(convertedToDateLastMealOutOfDiet !== undefined){
            //check if addedMeal is coming after the lastMealDateOutOfDate
            if(addedConvertedDate!.getTime() >=  convertedToDateLastMealOutOfDiet.getTime()){
                //it comes after lastMealDateOutOfDate known
                updatedDataAboutDiet.lastMealOutOfDietDate = addedMealDate

                updatedDataAboutDiet.lastMealOutOfDietHour = addedMealTime
            }    
        }
        //if there isnt a ast meal out of diet, create one
        else{
            updatedDataAboutDiet.lastMealOutOfDietDate = addedMealDate

            updatedDataAboutDiet.lastMealOutOfDietHour = addedMealTime

        }
        
        const dataAboutSequence = await calculateSequence()

        //check if the addedMealOutOfDiet is breaking the sequence
        if(currentSequenceDate !== undefined && addedConvertedDate!.getTime() > currentSequenceDate.getTime()){
            //find the current sequence
            updatedDataAboutDiet.currentSequenceOnDiet = dataAboutSequence.currentSequence
            updatedDataAboutDiet.startCurrentSequenceDate = dataAboutSequence.sequenceStartDate
            updatedDataAboutDiet.startCurrentSequenceHour = dataAboutSequence.sequenceStartHour
        }  

        updatedDataAboutDiet.lastMealOutOfDietDate = dataAboutSequence.lastMealDate
        updatedDataAboutDiet.lastMealOutOfDietHour = dataAboutSequence.lastMealHour

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

    async function removeOnDietCount(removedMealDate : string, removedMealTime: string) {
        const updatedDataAboutDiet = { ...dataAboutDiet } 

        const removedConvertedDate = convertStringToDate(removedMealDate, removedMealTime)
        
        const currentSequenceDate = convertStringToDate(dataAboutDiet.startCurrentSequenceDate, dataAboutDiet.startCurrentSequenceHour)

        //check if there is a sequence
        if(currentSequenceDate != undefined){
            //check if its the sequence's beginning
            if(removedConvertedDate!.getTime() ===  currentSequenceDate.getTime()){
                const dataAboutSequence = await calculateSequence()

                updatedDataAboutDiet.currentSequenceOnDiet = dataAboutSequence.currentSequence
                updatedDataAboutDiet.startCurrentSequenceDate = dataAboutSequence.sequenceStartDate
                updatedDataAboutDiet.startCurrentSequenceHour = dataAboutSequence.sequenceStartHour
            }else{
                //check if removed is on sequence
                if(removedConvertedDate!.getTime() >  currentSequenceDate.getTime()){

                    updatedDataAboutDiet.currentSequenceOnDiet -= 1;

                }
            }  
        }

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

        const dataAboutSequence = await calculateSequence()
        
        updatedDataAboutDiet.currentSequenceOnDiet = dataAboutSequence.currentSequence
        updatedDataAboutDiet.startCurrentSequenceDate = dataAboutSequence.sequenceStartDate
        updatedDataAboutDiet.startCurrentSequenceHour = dataAboutSequence.sequenceStartHour
            
        updatedDataAboutDiet.lastMealOutOfDietDate = dataAboutSequence.lastMealDate
        updatedDataAboutDiet.lastMealOutOfDietHour = dataAboutSequence.lastMealHour

        //if current sequence becomes greater than bestSequence, than set it as bestSequence
        if(updatedDataAboutDiet.currentSequenceOnDiet > updatedDataAboutDiet.bestSequenceOndDiet){
            updatedDataAboutDiet.bestSequenceOndDiet = updatedDataAboutDiet.currentSequenceOnDiet
        }
        
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

            //calculate sequence
            const dataAboutSequence = await calculateSequence()
           
            updatedDataAboutDiet.currentSequenceOnDiet = dataAboutSequence.currentSequence
            updatedDataAboutDiet.startCurrentSequenceDate = dataAboutSequence.sequenceStartDate
            updatedDataAboutDiet.startCurrentSequenceHour = dataAboutSequence.sequenceStartHour
            updatedDataAboutDiet.lastMealOutOfDietDate = dataAboutSequence.lastMealDate
            updatedDataAboutDiet.lastMealOutOfDietHour = dataAboutSequence.lastMealHour

            //check if current sequence is greather than best sequence
            if(updatedDataAboutDiet.currentSequenceOnDiet > updatedDataAboutDiet.bestSequenceOndDiet){
                updatedDataAboutDiet.bestSequenceOndDiet = updatedDataAboutDiet.currentSequenceOnDiet
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

    async function calculateSequence(){
        const list = await getMealsList()

        let mealsOnDiet = 0;
        let sequenceStartDate = "";
        let sequenceStartHour = "";
        let lastMealDate = "";
        let lastMealHour = "";

        for (const date of list) {
            sequenceStartDate = date.date
          for (const meal of date.meals) {
            if (!meal.isOnDiet) {
                lastMealDate = date.date
                lastMealHour = meal.hour
              return {
                currentSequence: mealsOnDiet,
                sequenceStartDate: sequenceStartDate,
                sequenceStartHour: sequenceStartHour,
                lastMealDate: lastMealDate,
                lastMealHour: lastMealHour,
              }
            }
            mealsOnDiet++
            sequenceStartHour = meal.hour
          }
        }
      
        return {
            currentSequence: mealsOnDiet,
            sequenceStartDate: sequenceStartDate,
            sequenceStartHour: sequenceStartHour,
            lastMealDate: "",
            lastMealHour: "",
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