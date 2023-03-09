import styled from "styled-components/native";

export const DietDataContainer = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.COLORS["GRAY-200"]};
    border-radius: 20px;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.05);
    margin-top: -60px;

    display: flex;
    flex-direction: column;
    align-items: center;
`   