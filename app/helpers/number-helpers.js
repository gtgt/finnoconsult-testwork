export default function (val, decimals = 0) {
  const re = `\\d(?=(\\d{${3}})+${decimals > 0 ? '\\.' : '$'})`;
  return val.toFixed(Math.max(0, decimals)).replace('.', ',').replace(new RegExp(re, 'g'), '$&.');
}
