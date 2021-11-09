import { ethers } from "ethers";

export const isEmpty = value => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};

export const roundDown = (value, decimals = 18) => {
  const valueString = value.toString();
  const integerString = valueString.split('.')[0];
  const decimalsString = valueString.split('.')[1];
  if (!decimalsString) {
    return integerString
  }
  return `${integerString}.${decimalsString.slice(0, decimals)}`;
}

export const floatToBN = (number, decimals = 18) => {
  try {
    if (!isEmpty(number)) {
      return ethers.utils.parseUnits(roundDown(number, decimals), decimals);
    } else {
      return ethers.utils.parseUnits("0");
    }
  } catch (error: any) {
    console.error(error.message);
  }
}

export const BNToFloat = (bn, decimals = 18) => {
  try {
    return Number(bn / 10 ** decimals);
  } catch (error: any) {
    console.error(error.message);
  }
}
