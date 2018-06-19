export const fetchDocs = ({url}) => async (docs) => {
  const selection = docs.map(x=>['item02-M170206',x])
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(selection),
  })
  const json = await response.json()
  return json
}
