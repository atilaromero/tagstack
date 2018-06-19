export const fetchSearch = ({url}) => async (source, q) => {
  const response = await fetch(url+'/'+encodeURIComponent(source)+'?q=' + encodeURIComponent(q))
  const json = await response.json()
  // const data = JSON.parse(json.data)
  return json
}
