import { Text } from "react-native"
import { Container, Dot } from "./styles"

interface DietTag{
    isOnDiet : boolean
}

export function DietTag({isOnDiet} : DietTag){
    return(
        <Container>
            <Dot dotColor={ isOnDiet ? "GREEN" : "RED" }/>       
            <Text>
                {isOnDiet ? "dentro da dieta" : "fora da dieta"}
            </Text>
        </Container>
    )
}