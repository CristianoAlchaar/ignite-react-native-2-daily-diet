import { View,Text} from 'react-native';

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useTheme } from 'styled-components';

import { useNavigation, useRoute } from '@react-navigation/native';

import { DescriptionInput, FormContainer, Label, NameInput, Line, SmallInput, LineColumn } from "./styles";

import { BlackButton } from '../BlackButton';
import { YesOrNotButton } from '../YesOrNotButton';

interface RouteParams{
    name: string;
    description: string;
    hour: string;
    isOnDiet: boolean;
}

export function EditMealForm(){
    const route = useRoute()

    const {description, hour, isOnDiet, name} = route.params as RouteParams

    const {FONT_FAMILY, COLORS} = useTheme()

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const navigation = useNavigation()

    function submitMeal(){
        navigation.navigate('meal', {description, hour, isOnDiet, name})
    }

    return(
        <FormContainer>
            <Label>Nome</Label>
            <NameInput value={name}/>

            <Label>Descrição</Label>
            <DescriptionInput value={description}/>

            <Line >
                <LineColumn>
                    <Label>Data</Label>
                    <SmallInput value='16/04/2023'/>
                </LineColumn>
                <LineColumn>
                    <Label>Hora</Label>
                    <SmallInput value={hour}/>
                </LineColumn>
            </Line>

            <Text style={{
                fontFamily: FONT_FAMILY.BOLD,
                color: COLORS['GRAY-700']
                }}>Está dentro da dieta?
            </Text>
            <Line>
                <LineColumn>
                    <YesOrNotButton buttonType='YES'/>
                </LineColumn>
                <LineColumn>
                    <YesOrNotButton buttonType='NO'/>
                </LineColumn>
            </Line>
            
            <View style={{
                flex: 1,
                flexDirection: 'column-reverse',
            }}>
                <BlackButton value='Cadastrar Refeição' handlePress={submitMeal}/>
            </View>
        </FormContainer>
    )
}