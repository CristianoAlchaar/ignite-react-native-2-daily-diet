import styled from "styled-components/native";

interface DotProps{
    dotColor: "GREEN" | "RED" 
}

export const Container = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px 16px;
    gap: 8px;

    width: 144px;
    height: 34px;

    background: ${({theme}) => theme.COLORS["GRAY-300"]};
    border-radius: 1000px;
`

export const Dot = styled.View<DotProps>`
    width: 8px;
    height: 8px;

    background: ${({theme, dotColor}) => 
        dotColor === "GREEN" ?
            theme.COLORS.GREEN_MID :
            theme.COLORS.RED_MID    
    }; 
`