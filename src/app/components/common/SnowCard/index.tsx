import { Card } from "@material-ui/core";
import styled from "styled-components/macro";
import { CssVariables } from "styles/global-styles";

export const SnowCard = styled(Card)`
    box-shadow: ${CssVariables.CardShadow} !important;
    border-radius: 10px !important;
    padding:1.6rem !important;
`