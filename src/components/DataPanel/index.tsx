import { Container, Message, Title } from "./styles";

interface DataPanelProps{
    value: number,
    description: string,
}

export function DataPanel({value, description}:DataPanelProps){
    return(
        <Container>
            <Title>{value}</Title>
            <Message>{description}</Message>
        </Container>
    )
}