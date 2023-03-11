import { createNativeStackNavigator } from '@react-navigation/native-stack'

const { Navigator, Screen } = createNativeStackNavigator();

import { Home } from '../screens/Home'
import { Meal } from '../screens/Meal'
import { RegisterMealConclusion } from '../screens/RegisterMealConclusion'
import { RegisterNewMeal } from '../screens/RegisterNewMeal'
import { DietDataScreen } from '../screens/DietDataScreen'
import { EditMeal } from '../screens/EditMeal'

export function AppRoutes(){
    return(
        //by default loads the first route
        <Navigator screenOptions={{headerShown:false}}>
            <Screen 
                name= "home"
                component={Home}
            />
            <Screen 
                name= "meal"
                component={Meal}
            />
            <Screen 
                name= "dietdata"
                component={DietDataScreen}
            />
            <Screen 
                name= "registernewmeal"
                component={RegisterNewMeal}
            />
            <Screen 
                name= "registermealconclusion"
                component={RegisterMealConclusion}
            />
            <Screen 
                name= "editmeal"
                component={EditMeal}
            />
        </Navigator>
    )
}