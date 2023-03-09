import { useState } from 'react';
import { Text, Pressable } from 'react-native'
import { Container, Dot } from "./styles"

interface YesOrNotButtonProps{
    buttonType: "YES" | "NO"
}

export function YesOrNotButton({buttonType} : YesOrNotButtonProps){
    const [isSelected, setIsSelected] = useState(false);

    function changeSelected(){
        isSelected ? setIsSelected(false) : setIsSelected(true)
    }

    return (
        <Pressable onPress={changeSelected}>
            <Container isSelected={isSelected} type={buttonType}>
                <Dot type={buttonType === "YES" ? "GREEN" : "RED"}/>
                <Text>
                    {buttonType === "YES" ? "Sim" : "Não"}   
                </Text>
            </Container>
        </Pressable>
    )
}