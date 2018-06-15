export const fetchSearch = ({url}) => async (q) => {
  const response = await fetch(url+'?q=' + encodeURIComponent(q))
  const json = await response.json()
  const data = JSON.parse(json.data)
  return data
}
