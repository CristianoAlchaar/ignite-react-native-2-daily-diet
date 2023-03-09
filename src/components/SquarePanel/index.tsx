import { Container, Message, Title } from "./styles";

import { useTheme } from "styled-components/native"

interface SquarePanelProps{
    value: number,
    description: string,
    type?: "GREEN" | "RED",
}

export function SquarePanel({value, description, type = "GREEN" }:SquarePanelProps){
    const { COLORS } = useTheme()
    return(
        <Container style={{
            backgroundColor: type === "GREEN" ? COLORS.GREEN_LIGHT : COLORS.RED_LIGHT
        }}>
            <Title>{value}</Title>
            <Message>{description}</Message>
        </Container>
    )
}