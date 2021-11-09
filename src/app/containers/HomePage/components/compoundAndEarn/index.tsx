

import { Button, Card } from "@material-ui/core"
import { FlexSpacer } from "app/components/common/flexSpacer"
import { SnowCard } from "app/components/common/SnowCard"
import { translations } from "locales/i18n"
import { useTranslation } from "react-i18next"


import styled from "styled-components/macro"
import { CssVariables } from "styles/global-styles"
import { addSnobToMetamask } from "utils/globalUtils"

const CompoundAndEarn = () => {

  const { t } = useTranslation()

  return (
    <StyledSnowCard>
      <Title>{t(translations.CompoundAndEarn())}</Title>
      <PendingWrapper>
        <p>{t(translations.PendingToHarvest())}</p>
        <p><PendingAmount>{'0.00'}</PendingAmount><SnobName>SNOB</SnobName></p>
        <EquivalentUsd>$0.00 USD</EquivalentUsd>
      </PendingWrapper>
      <FlexSpacer />
      <BottomWrapper>
        <BottomInfos>
          <InfoTitle>{t(translations.WalletBalance())}</InfoTitle>
          <Green><MarginedSpan>0.00</MarginedSpan><span>SNOB</span><Dark>$0.00</Dark></Green>
          <Blue><MarginedSpan>0.00</MarginedSpan><span>XSNOB</span></Blue>
        </BottomInfos>
        <StyledButton onClick={() => addSnobToMetamask()} color='primary' variant='contained'>
          Add SNOB to Metamask
        </StyledButton>
      </BottomWrapper>
    </StyledSnowCard>
  )
}
const StyledButton = styled(Button)`
span{
  font-size:1.4rem;
}

`

const MarginedSpan = styled.span`
margin-right:0.6rem;

`
const Green = styled.p`
color:${CssVariables.Green};
`
const Blue = styled.p`
color:${CssVariables.Blue};
`
const Dark = styled.span`
font-size:1.2rem;
color:${CssVariables.PrimaryText};
`

const InfoTitle = styled.p``

const BottomInfos = styled.div``

const BottomWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    place-items: center;
`

const StyledSnowCard = styled(SnowCard)`
display:flex;
flex-direction:column;
min-height:390px;

`

const EquivalentUsd = styled.p`
margin:0;
color:${CssVariables.Green};
font-size: 2.4rem;
`
const PendingWrapper = styled.div`
margin:0;

`
const PendingAmount = styled.span`
font-size: 4.8rem;
color:${CssVariables.PrimaryText};
font-weight: 600;
margin-right: 1.2rem;
`
const SnobName = styled.span``

const Title = styled.h5`
font-weight: bold;
margin:0;
margin-bottom: 28px;
color:${CssVariables.PrimaryText};
font-size:2.4rem;
`


export { CompoundAndEarn };