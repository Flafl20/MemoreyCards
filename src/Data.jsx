const pokemonData = async function (pokeName) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`
  const respone = await fetch(url, { mode: "cors" })
  const data = await respone.json()
  console.log(data)
  const name = data.name

  return { name }
}
const ditto = pokemonData("ditto")

console.log(ditto.name)
export default pokemonData
