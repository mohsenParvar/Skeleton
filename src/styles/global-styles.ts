import { createGlobalStyle } from 'styled-components/macro';
/* istanbul ignore next */

export const CssVariables = {
    PrimaryText: 'var(--primaryText)',
    Green: 'var(--green)',
    CardShadow: 'var(--cardShadow)',
    Blue: 'var(--blue)',

}

export const GlobalStyle = createGlobalStyle`
html,
body {
    height: 100%;
    width: 100%;
    font-family:Montserrat,Rubik,-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    font-size: 62.5%;/*10px/16px=62.5% -> 1rem=10px  */
    box-sizing: border-box;
    margin:0;
}
p{
    font-size:1.4rem;
    margin:0;
    color:${CssVariables.PrimaryText};
}
:root{
    --primaryText:#6E6B7B;
    --green:#28C76F;
    --blue:#1A93F2;
    --cardShadow:1px 2px 5px rgb(117 115 115 / 20%);
}

`;
