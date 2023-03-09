import styled from "styled-components/native";
import { ArrowUpRight, IconProps } from "phosphor-react-native";

interface Props{
    onDiet: boolean
}
 
interface ArrowProps extends IconProps, Props {}


export const Container = styled.View<Props>`
    height: 102px;

    background-color: 
    ${( {theme, onDiet} ) => 
        onDiet === true ? 
        theme.COLORS.GREEN_LIGHT : 
        theme.COLORS.RED_LIGHT};
    border-radius: 8px;
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

export const Arrow = styled(ArrowUpRight).attrs<ArrowProps>(({theme, onDiet}) => ({
    width: 24,
    height: 24,
    color: onDiet ? theme.COLORS.GREEN_DARK : theme.COLORS.RED_DARK
}))<ArrowProps>`
    position: absolute;
    top: 2px;
    right: 2px;
`