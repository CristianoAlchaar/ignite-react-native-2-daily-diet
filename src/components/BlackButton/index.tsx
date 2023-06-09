import { Text } from "react-native";
import { useTheme } from "styled-components/native";

import { ButtonContainer } from "./styles";

interface BlackButtonProps{
    value: string;
    handlePress: () => void
}

export function BlackButton({value, handlePress, } : BlackButtonProps){
    const { COLORS, FONT_FAMILY } = useTheme()

    return (
        <ButtonContainer onPress={handlePress} underlayColor={COLORS["GRAY-900"]}>
            <Text style={{
                color: COLORS.white,
                fontFamily: FONT_FAMILY.REGULAR,
            }}>{value}</Text>
        </ButtonContainer>
    )
}