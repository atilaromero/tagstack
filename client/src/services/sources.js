export const fetchSources = ({url}) => async () => {
  const response = await fetch(url)
  const json = await response.json()
  const data = JSON.parse(json.data)
  return data
}
