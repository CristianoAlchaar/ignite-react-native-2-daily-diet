import styled from "styled-components/native"

interface TitleProps {
    isOnDiet: boolean
}

export const Container =  styled.View`
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 0 32px;

    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    font-size:${({theme}) => theme.FONT_SIZE.MD}px;
    color:${({theme}) => theme.COLORS["GRAY-900"]};
`
export const Title = styled.Text<TitleProps>`
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
    font-size:${({theme}) => theme.FONT_SIZE.XL}px;
    color:${({theme, isOnDiet}) => isOnDiet ? theme.COLORS.GREEN_DARK : theme.COLORS.RED_DARK};

    margin-bottom: 8px;
`

export const MessageImg = styled.Image`
    width: 224px;
    height: 288px;
    margin-top: 40px;
    margin-bottom: 32px;
`
export const Bold = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD}
`