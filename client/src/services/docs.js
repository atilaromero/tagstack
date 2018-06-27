export const fetchDocs = ({url1}) => async (url) => {
  const response = await fetch(url)
  const json = await response.json()
  return json
}

export const fetchSearchDocs = ({url1}) => async (url, source, docs) => {
  const selection = docs.map(x=>['item02-M170206',x])
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(selection),
  })
  const json = await response.json()
  return json
}
