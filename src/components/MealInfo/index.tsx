import { Container, Dot, Hour, Name } from "./styles";

interface MealInfoProps{
    name: string,
    hour: string,
    isOnDiet: boolean,
}

export function MealInfo({name,hour,isOnDiet}:MealInfoProps){
    return(
        <Container>
            <Hour>{hour}</Hour>
            <Name>{name}</Name>
            {isOnDiet ? <Dot color="GREEN"/> : <Dot color="RED"/>}
        </Container>
    )
} 