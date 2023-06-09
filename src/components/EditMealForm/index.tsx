import { useContext, useState } from 'react'
import { View,Text, Alert} from 'react-native';

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";

import { MealListContext } from './../../contexts/MealsContext' 

import { useTheme } from 'styled-components';

import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';

import { DescriptionInput, FormContainer, Label, NameInput, Line, SmallInput, LineColumn, ErrorContainer, SmallErrorContainer } from "./styles";

import { BlackButton } from '../BlackButton';
import { YesOrNotButton } from '../YesOrNotButton';

interface EditMealFormProps{
    date: string,
    meal: {
        name: string;
        description: string;
        hour: string;
        isOnDiet: boolean;
    }
}

export function EditMealForm({date, meal}: EditMealFormProps){

    const schema = yup.object().shape({
        newName: yup.string().max(30).required('O nome precisa ser preenchido').default(meal.name),
        newDescription: yup.string().max(60).required('A descrição precisa ser preenchida').default(meal.description),
        newDate: yup
            .string()
            .matches(/^[0-3][0-9]\/[01][0-9]\/[0-9]{4}$/, 'O formato deve ser dd/mm/aaaa')
            .required('A data deve ser preenchida')
            .default(date),
        newHour: yup
            .string()
            .matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 'O formato deve ser hh:mm')
            .required('A hora deve ser preenchida')
            .default(meal.hour),
    })

    const route = useRoute()

    const {FONT_FAMILY, COLORS} = useTheme()

    const [yesSelected, setYesSelected] = useState(false);
    const [noSelected, setNoSelected] = useState(false);
    const [isOnDiet, setIsOnDiet] = useState(meal.isOnDiet);

    const { editMeal } = useContext(MealListContext)

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const navigation = useNavigation()

    function submitMeal(data: any){
        try{
            editMeal(date, meal, data.newDate, {
                description: data.newDescription,
                hour: data.newHour,
                isOnDiet: isOnDiet,
                name: data.newName
            })
            navigation.navigate('meal', {
                date: data.newDate,
                description: data.newDescription,
                hour: data.newHour,
                isOnDiet: isOnDiet,
                name: data.newName,
            })
        }catch(error){
            console.log(error)
            Alert.alert('Falha', 'Não foi possível modificar a refeição.')
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

    useFocusEffect(() => {
        isOnDiet ? handleYesSelect() : handleNoSelect()
    })

    return(
        <FormContainer>
            <Label>Nome</Label>
            <Controller 
                control={control}
                name="newName"
                render={
                    ({ field : {value, onChange}}) => (
                    <NameInput 
                        onChangeText={onChange}
                        defaultValue={meal.name}
                        value={value}
                    />
                )}
            />
            <ErrorMessage
                errors={errors}
                name="newName"
                render={({ message }) => <ErrorContainer>{message}</ErrorContainer>}
            />
            
            <Label>Descrição</Label>
            <Controller 
                control={control}
                name="newDescription"
                render={({ field : {value, onChange}}) => (
                    <DescriptionInput 
                        onChangeText={onChange}
                        defaultValue={meal.description}
                        value={value}
                    />
                )}
            />
            <ErrorMessage
                errors={errors}
                name="newDescription"
                render={({ message }) => <ErrorContainer>{message}</ErrorContainer>}
            />

            <Line >
                <LineColumn>
                    <Label>Data</Label>
                    <Controller 
                        control={control}
                        name="newDate"
                        render={({ field : {value, onChange}}) => (
                            <SmallInput 
                                onChangeText={onChange}
                                defaultValue={date}
                                value={value}
                            />
                        )}
                    />
                    <ErrorMessage
                        errors={errors}
                        name="newDate"
                        render={({ message }) => <SmallErrorContainer>{message}</SmallErrorContainer>}
                    />
                    
                </LineColumn>
                <LineColumn>
                    <Label>Hora</Label>
                    <Controller 
                        control={control}
                        name="newHour"
                        render={({ field : {value, onChange}}) => (
                            <SmallInput 
                                onChangeText={onChange}
                                defaultValue={meal.hour}
                                value={value}
                            />
                        )}
                    />
                    <ErrorMessage
                        errors={errors}
                        name="newHour"
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
                <BlackButton value='Salvar Alterações' handlePress={handleSubmit(submitMeal)}/>
            </View>
        </FormContainer>
    )
}