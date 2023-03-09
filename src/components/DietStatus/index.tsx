import { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Arrow, Container, Message, Title } from "./styles";

interface DietStatusProps{
    value: number;
}

export function DietStatus({ value }: DietStatusProps){
    const [isOnDiet, setIsOnDiet] = useState(true)
    const navigation = useNavigation()

    function checkIfIsOnDiet(){
        value > 50 ? setIsOnDiet(true) : setIsOnDiet(false)
    }

    function handlePress(){
        navigation.navigate('dietdata')
    }

    useEffect(() => {
        checkIfIsOnDiet()
    },[value])

    return(
        <TouchableOpacity activeOpacity={0.6} onPress={handlePress}>
            <Container onDiet={isOnDiet}>
                <Arrow onDiet={isOnDiet}/>
                <Title>
                    {value}%
                </Title>
                <Message>
                    das refeições dentro da dieta
                </Message>
            </Container>
        </TouchableOpacity>
    )
}