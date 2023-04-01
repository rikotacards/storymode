
export const copyToClipboard = (additionalText?: string) =>{
  var dummy = document.createElement('input'),
  text = window.location.href+(additionalText||"");
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);
}