import styled from "styled-components/native";

interface Props{
    onDiet: boolean
}
 
export const Container = styled.View<Props>`
    height: 200px;

    background-color: 
    ${( {theme, onDiet} ) => 
        onDiet === true ? 
        theme.COLORS.GREEN_LIGHT : 
        theme.COLORS.RED_LIGHT};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 32px;
    margin-bottom: 40px;
`

export const Title = styled.Text`
    font-family: ${( {theme} ) => theme.FONT_FAMILY.BOLD};
    font-size: ${( {theme} ) => theme.FONT_SIZE.XXL}px;
`

export const Message = styled.Text`
    font-family: ${( {theme} ) => theme.FONT_FAMILY.REGULAR};
`
