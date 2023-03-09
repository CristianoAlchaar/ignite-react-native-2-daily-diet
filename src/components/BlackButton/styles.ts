import styled from "styled-components/native";
import { TouchableHighlight} from "react-native"

export const ButtonContainer = styled(TouchableHighlight)`
    justify-content: center;
    align-items: center;
    padding: 16px 24px;
    gap: 12px;

    height: 50px;

    background: ${({theme}) => theme.COLORS["GRAY-600"]};
    border-radius: 6px;

    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
`