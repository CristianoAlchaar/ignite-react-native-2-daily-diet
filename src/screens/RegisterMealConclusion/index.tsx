import { useNavigation, useRoute } from "@react-navigation/native";
import { Text } from 'react-native'

import { Bold, Container, MessageImg, Title } from "./styles";

import successImg from '../../assets/OnSuccessImage.png';
import failureImg from '../../assets/OnFailure.png';
import { BlackButton } from "./../../components/BlackButton";

interface RouteParams {
    isMealOnDiet : boolean;
}

export function RegisterMealConclusion(){
    const route = useRoute()
    const { isMealOnDiet } = route.params as RouteParams

    const navigation = useNavigation()

    function handleGoBackToHomeScreen(){
        navigation.navigate('home')
    }

    return (
        <Container>
            {isMealOnDiet 
                ? 
                    <>
                        <Title isOnDiet={true}>Continue assim!</Title>
                        <Text style={{textAlign: 'center'}}>
                            <Text>Você continua </Text>
                            <Bold>dentro da dieta</Bold>
                            <Text>. Muito bem!</Text>
                        </Text>
                        <MessageImg source={successImg} />
                    </>
                :
                    <>
                        <Title isOnDiet={false}>Que pena!</Title>
                        <Text style={{textAlign: 'center'}}>
                            <Text>Você </Text>
                            <Bold>saiu da dieta</Bold>
                            <Text> dessa vez, mas continue se esforçando e não desista!</Text>
                        </Text>
                        <MessageImg source={failureImg} />
                    </>
            }
            

            <BlackButton value="Ir para a página inicial" handlePress={handleGoBackToHomeScreen}/>
        </Container>
    )
}