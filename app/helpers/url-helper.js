export default function getUrlParameter(name) {
  const foundParam = window.location.search
    .replace(/^\?/, '')
    .split('&')
    .map((item) => {
      const param = item.split('=');
      return { param: item, name: param[0], value: param[1] };
    })
    .find(param => name===param.name);
  return foundParam;
  // console.log('foundParam', foundParam);
  // return ((foundParam && foundParam.value) || true) || defaultValue || '';
}
