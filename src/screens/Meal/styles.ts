import styled from "styled-components/native";

export const InfoContainer = styled.View`
    background: ${({ theme }) => theme.COLORS["GRAY-200"]};
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.05);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    flex: 1;
    margin-top: 24px;
    padding: 50px 24px 20px;
`
export const Title = styled.Text`
    font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
    font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
    color: ${({ theme }) => theme.COLORS["GRAY-900"]};
`
export const Description = styled.Text`
    font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
    font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
    color: ${({ theme }) => theme.COLORS["GRAY-700"]};
    text-align: justify;

    margin-top: 8px;
    margin-bottom: 24px;
`
export const DataAndHourDescription = styled.Text`
    font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
    font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
    color: ${({ theme }) => theme.COLORS["GRAY-900"]};
`

export const DateAndHour = styled.Text`
    font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
    font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
    color: ${({ theme }) => theme.COLORS["GRAY-700"]};
    margin-top: 8px;
`