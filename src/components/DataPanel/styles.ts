import styled from "styled-components/native";

export const Container = styled.View`
    width: 327px;
    height: 89px;
    padding: 16px;

    background: ${( {theme} ) => theme.COLORS["GRAY-300"]};
    border-radius: 8px;

    flex-direction: column;
    align-items: center;
`

export const Title = styled.Text`
    font-family: ${( {theme} ) => theme.FONT_FAMILY.BOLD};
    font-size: ${( {theme} ) => theme.FONT_SIZE.XL}px;
    color: ${( {theme} ) => theme.COLORS["GRAY-900"]};
    margin-bottom: 8px;
`

export const Message = styled.Text`
    font-family: ${( {theme} ) => theme.FONT_FAMILY.REGULAR};
    font-size: ${( {theme} ) => theme.FONT_SIZE.SM}px;
    color: ${( {theme} ) => theme.COLORS["GRAY-700"]};
`