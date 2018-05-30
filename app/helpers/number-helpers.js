export default function (val, decimals = 0) {
  const re = `\\d(?=(\\d{${3}})+${decimals > 0 ? '\\.' : '$'})`;
  return val.toFixed(Math.max(0, decimals)).replace('.', ',').replace(new RegExp(re, 'g'), '$&.');
}

// TODO: treat 0000 as not a number
const regexNumber = /^[+-]?\d+(\.)?(\d+)?$/;

export function getNumber(numberinput, defaultNumber = '0') {
  const number = `${numberinput}`;
  try {
    return number && parseFloat(number.replace(/[,]/g, '.').replace(/[ ]+/g, '').replace(/^([+-])?[0]+/, '0'), 10);
  } catch (e) {
    console.log(number, number.replace(/[,]/g, '.').replace(/[ ]+/g, '').replace(/^([+-])?[0]+/, '0'), e);
    return defaultNumber;
  }
}

export function isNumber(number) {
  return number && !isNaN(number.replace(/[,]/g, '.').replace(/[ ]+/g, ''))
    && number.replace(/[,]/g, '.').replace(/[ ]+/g, '').match(regexNumber)[0]
  ;
}
