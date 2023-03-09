import styled from "styled-components/native";

interface DotProps {
    type: "GREEN" | "RED"
}

interface ContainerProps{
    isSelected: boolean,
    type: "YES" | "NO",
}

export const Container = styled.View<ContainerProps>`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 16px;
    gap: 8px;

    width: 159.5px;
    height: 50px;

    background-color: ${({theme, isSelected, type}) => 
        isSelected === false ? 
            theme.COLORS["GRAY-300"] 
            : type === "YES" ?
                theme.COLORS.GREEN_LIGHT :
                theme.COLORS.RED_LIGHT
    };     

    border-radius: 6px;

    border-width: 1px;

    border-color: ${({theme, isSelected, type}) =>
        isSelected === false ?
            'transparent'
            : type === "YES" ?
            theme.COLORS.GREEN_DARK :
            theme.COLORS.RED_DARK
    };
`

export const Dot = styled.View<DotProps>`
    width: 8px;
    height: 8px;
    background-color: ${({theme, type}) => type === "GREEN" ? theme.COLORS.GREEN_DARK : theme.COLORS.RED_DARK};
    border-radius: 10000px;
`