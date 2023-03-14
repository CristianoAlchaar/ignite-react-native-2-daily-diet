import { createContext, ReactNode, useState } from "react";

import { getMealsList } from "./../storage/mealList/getMealsList"

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
    addMeal: ({date, meals} : DateProps) => void
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
            //const list = await getMealsList()
            
            console.log('Loading')

            //setList(list)
        }catch(error){
            throw error
        }
    }

    async function addMeal({date, meals} : DateProps){ 

        const existingDayIndex = list.findIndex((day) => day.date === date); 
        
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
    }

    function sortDailyList( listToOrder : DateProps[]){
        const updatedList = listToOrder.sort((a, b) => b.date.localeCompare(a.date))

        setList(updatedList)
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
    }

    return(
        <MealListContext.Provider value={{
            mealList: list,
            loadList,
            addMeal,
        }}>
            {children}
        </MealListContext.Provider>
    )
}