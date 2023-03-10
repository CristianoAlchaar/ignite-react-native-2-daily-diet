import styled from "styled-components/native";

export const HomeContainer = styled.View`
    padding-left: 24px;
    padding-right: 24px; 
    flex: 1;
`

export const DateTitle = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
    font-size: ${({theme}) => theme.FONT_SIZE.LG}px;
    color: ${({theme}) => theme.COLORS["GRAY-900"]};
    margin-bottom: 10px;
    margin-top: 32px;
`