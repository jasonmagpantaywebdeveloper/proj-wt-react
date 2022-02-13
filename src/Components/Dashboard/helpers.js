export function getDataByIndex(data, index) {
  const result = [];
  for (let i = 0; i < data.length; i++) {
    result.push(data[i][index])
  }
  return result;
}
