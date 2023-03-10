import styled from "styled-components/native";

interface DotProps {
    color: 'GREEN' | 'RED'
}

export const Container = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 14px 16px 14px 12px;
    gap: 12px;

    border: 1px solid ${({theme}) => theme.COLORS["GRAY-400"]};
    border-radius: 6px;
`
export const Hour = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
    font-size: ${({theme}) => theme.FONT_SIZE.SM}px;
    color: ${({theme}) => theme.COLORS["GRAY-900"]};
`

export const Name = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
    color: ${({theme}) => theme.COLORS["GRAY-700"]};
    flex: 1;
    border-left-width: 1px;
    border-left-color: ${({theme}) => theme.COLORS["GRAY-500"]};
    padding-left: 14px;
`
export const Dot = styled.View<DotProps>`
    width: 14px;
    height: 14px;
    border-radius: 1000px;
    background-color: 
    ${({theme, color}) => 
        color === "GREEN" ?
        theme.COLORS.GREEN_MID : 
        theme.COLORS.RED_MID  
    };
`