import { useRoute } from "@react-navigation/native";

import { EditMealForm } from "./../../components/EditMealForm";

import { ScreenTemplate } from "./../../components/ScreenTemplate";

interface RouteParams{
    name: string;
    description: string;
    hour: string;
    isOnDiet: boolean;
    date: string;
}

export function EditMeal(){
    const route = useRoute()

    const {description, hour, isOnDiet, name, date} = route.params as RouteParams

    return (
        <ScreenTemplate headerColor="DEFAULT" title="Editar Refeição" >
            <EditMealForm date={date} meal={{description, hour, isOnDiet, name}}/>
        </ScreenTemplate>
    )
}