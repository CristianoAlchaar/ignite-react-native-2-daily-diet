import styled from "styled-components/native";
import { TouchableHighlight} from "react-native"

export const ButtonContainer = styled(TouchableHighlight)`
    justify-content: center;
    align-items: center;
    padding: 16px 24px;
    gap: 12px;

    height: 50px;

    background: transparent;
    border-radius: 6px;
    border-width: 1px;
    border-color: ${({theme}) => theme.COLORS["GRAY-900"]};

    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
    color: ${({theme}) => theme.COLORS["GRAY-900"]};
`