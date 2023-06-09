import { useContext, useState } from 'react';
import { View,Text,Alert } from 'react-native';

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message"

import { useTheme } from 'styled-components';

import { useNavigation } from '@react-navigation/native';

import { MealListContext, DateProps } from './../../contexts/MealsContext';

import { 
    DescriptionInput, 
    FormContainer, Label, 
    NameInput, 
    Line, 
    SmallInput, 
    LineColumn, 
    ErrorContainer, 
    SmallErrorContainer,
} from "./styles";

import { BlackButton } from '../BlackButton';
import { YesOrNotButton } from '../YesOrNotButton';


const schema = yup.object().shape({
    name: yup.string().max(30).required('O nome precisa ser preenchido'),
    description: yup.string().max(60).required('A descrição precisa ser preenchida'),
    date: yup
        .string()
        .matches(/^[0-3][0-9]\/[01][0-9]\/[0-9]{4}$/, 'O formato deve ser dd/mm/aaaa')
        .required('A data deve ser preenchida'),
    hour: yup
        .string()
        .matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 'O formato deve ser hh:mm')
        .required('A hora deve ser preenchida'),
})

export function NewMealForm(){
    const {FONT_FAMILY, COLORS} = useTheme()
    
    const [yesSelected, setYesSelected] = useState(false);
    const [noSelected, setNoSelected] = useState(false);
    const [isOnDiet, setIsOnDiet] = useState<boolean>();

    const { addMeal } = useContext(MealListContext)

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const navigation = useNavigation()

    function submitMeal(data : any){
        if(isOnDiet !== undefined){
            const dataToSubmit : DateProps = {
                date: data.date,
                meals: [
                    {
                        description: data.description,
                        hour: data.hour,
                        isOnDiet: isOnDiet,
                        name: data.name
                    }
                ]
            }

            try{
                addMeal(dataToSubmit)
                navigation.navigate('registermealconclusion', {isMealOnDiet : isOnDiet})
            } catch(error){
                console.log(error)
                Alert.alert('Falha no armazenamento','Não foi possível cadastrar a refeição')
            }

        }else{
            Alert.alert('Está na dieta?', 'Por favor selecione se a refeição está dentro ou não da dieta.')
        }
    }

    function handleYesSelect(){
        setYesSelected(true)
        setIsOnDiet(true)
        setNoSelected(false)   
    }

    function handleNoSelect(){
        setYesSelected(false)
        setIsOnDiet(false)
        setNoSelected(true)
    }

    return(
        <FormContainer>
            <Label>Nome</Label>
            <Controller 
                control={control}
                name="name"
                render={
                    ({ field : {value, onChange}}) => (
                    <NameInput 
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            <ErrorMessage
                errors={errors}
                name="name"
                render={({ message }) => <ErrorContainer>{message}</ErrorContainer>}
            />
            
            <Label>Descrição</Label>
            <Controller 
                control={control}
                name="description"
                render={({ field : {value, onChange}}) => (
                    <DescriptionInput 
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            <ErrorMessage
                errors={errors}
                name="description"
                render={({ message }) => <ErrorContainer>{message}</ErrorContainer>}
            />

            <Line >
                <LineColumn>
                    <Label>Data</Label>
                    <Controller 
                        control={control}
                        name="date"
                        render={({ field : {value, onChange}}) => (
                            <SmallInput 
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    <ErrorMessage
                        errors={errors}
                        name="date"
                        render={({ message }) => <SmallErrorContainer>{message}</SmallErrorContainer>}
                    />
                    
                </LineColumn>
                <LineColumn>
                    <Label>Hora</Label>
                    <Controller 
                        control={control}
                        name="hour"
                        render={({ field : {value, onChange}}) => (
                            <SmallInput 
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    <ErrorMessage
                        errors={errors}
                        name="hour"
                        render={({ message }) => <SmallErrorContainer>{message}</SmallErrorContainer>}
                    />
                </LineColumn>
            </Line>

            <Text style={{
                fontFamily: FONT_FAMILY.BOLD,
                color: COLORS['GRAY-700']
                }}>Está dentro da dieta?
            </Text>
            <Line>
                <LineColumn>
                    <YesOrNotButton buttonType='YES' selected={yesSelected} onPress={handleYesSelect}/>
                </LineColumn>
                <LineColumn>
                    <YesOrNotButton buttonType='NO' selected={noSelected} onPress={handleNoSelect}/>
                </LineColumn>
            </Line>
            
            <View style={{
                flex: 1,
                flexDirection: 'column-reverse',
            }}>
                <BlackButton value='Cadastrar Refeição' handlePress={handleSubmit(submitMeal)}/>
            </View>
        </FormContainer>
    )
}