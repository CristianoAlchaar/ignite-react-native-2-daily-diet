import { EditMealForm } from "./../../components/EditMealForm";

import { ScreenTemplate } from "./../../components/ScreenTemplate";


export function EditMeal(){
    return (
        <ScreenTemplate headerColor="DEFAULT" title="Editar Refeição" >
            <EditMealForm/>
        </ScreenTemplate>
    )
}