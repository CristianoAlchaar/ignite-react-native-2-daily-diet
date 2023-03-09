import { useEffect, useState } from "react";
import { useTheme } from 'styled-components'
import { TouchableOpacity } from 'react-native'
import { ArrowLeft } from "phosphor-react-native";
import { useNavigation } from '@react-navigation/native';

import { Container, Message, Title } from "./styles";

interface DataHeaderProps{
    value: number;
}

export function DataHeader({value} : DataHeaderProps){
    const [isOnDiet, setIsOnDiet] = useState(true)

    const { COLORS } = useTheme()

    const navigation = useNavigation()

    function checkIfIsOnDiet(){
        value > 50 ? setIsOnDiet(true) : setIsOnDiet(false)
    }


    function handleGoBack(){
        navigation.goBack()
    }

    useEffect(() => {
        checkIfIsOnDiet()
    },[value])

    return(
        <Container onDiet={isOnDiet}>
            <TouchableOpacity onPress={handleGoBack} style={{
                width: 24,
                height: 24,
                position: "absolute",
                top: 28,
                left: 24,
            }}>
                <ArrowLeft color={isOnDiet ? COLORS.GREEN_DARK : COLORS.RED_DARK}/>
            </TouchableOpacity>
            <Title>
                {value}%
            </Title>
            <Message>
                das refeições dentro da dieta
            </Message>
        </Container>
    )
}