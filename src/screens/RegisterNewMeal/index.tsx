import { NewMealForm } from "./../../components/NewMealForm";

import { ScreenTemplate } from "./../../components/ScreenTemplate";


export function RegisterNewMeal(){
    return (
        <ScreenTemplate headerColor="DEFAULT" title="Nova Refeição" >
            <NewMealForm/>
        </ScreenTemplate>
    )
}