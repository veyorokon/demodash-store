export function checkRequiredFields(form, requiredFields = []) {
  let missing = [];
  for (var i = 0; i < requiredFields.length; i++) {
    const key = requiredFields[i];
    if (!form[key]) missing.push(key);
  }
  return missing;
}

export function removeFromList(array, item) {
  const index = array.indexOf(item);
  if (index > -1) {
    array.splice(index, 1);
  }
  return array;
}

export function format(s) {
  return s.toString().replace(/\d{4}(?=.)/g, "$& ");
}
