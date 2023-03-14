import { useState } from 'react';
import { Text, Pressable } from 'react-native'
import { Container, Dot } from "./styles"

interface YesOrNotButtonProps{
    buttonType: "YES" | "NO"
    selected?: boolean
    onPress?: () => void
}

export function YesOrNotButton({buttonType, selected = false , onPress} : YesOrNotButtonProps){
  
    return (
        <Pressable onPress={onPress}>
            <Container isSelected={selected} type={buttonType}>
                <Dot type={buttonType === "YES" ? "GREEN" : "RED"}/>
                <Text>
                    {buttonType === "YES" ? "Sim" : "Não"}   
                </Text>
            </Container>
        </Pressable>
    )
}