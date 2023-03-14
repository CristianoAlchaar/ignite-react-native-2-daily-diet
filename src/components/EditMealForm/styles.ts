import styled from "styled-components/native";

export const FormContainer = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.COLORS["GRAY-200"]};
    margin-top: 24px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.05);

    flex-direction: column;
    padding: 40px 24px 10px;
    gap: 8px;

    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
`
export const Label = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
    font-size: ${({theme}) => theme.FONT_SIZE.SM}px;
    color:  ${({theme}) => theme.COLORS["GRAY-700"]};
`
export const NameInput = styled.TextInput`
    padding: 14px;

    max-width: 327px;
    height: 48px;
    border: 1px solid ${({theme}) => theme.COLORS["GRAY-400"]};
    border-radius: 6px;
    color:  ${({theme}) => theme.COLORS["GRAY-900"]};

    margin-bottom: 24px;
`

export const DescriptionInput = styled.TextInput`
    padding: 14px;
    gap: 8px;

    max-width: 327px;
    height: 120px;
    border: 1px solid ${({theme}) => theme.COLORS["GRAY-400"]};
    border-radius: 6px;
    color:  ${({theme}) => theme.COLORS["GRAY-900"]};

    margin-bottom: 24px;
    vertical-align: top;
`

export const SmallInput = styled.TextInput`
    padding: 14px;
    gap: 8px;

    width: 154px;
    height: 48px;
    border: 1px solid ${({theme}) => theme.COLORS["GRAY-400"]};
    border-radius: 6px;
    color:  ${({theme}) => theme.COLORS["GRAY-900"]};

    margin-bottom: 24px;
`

export const Line = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const LineColumn = styled.View`
    flex-direction: column;
    gap: 4px;
`
