import { useState, useEffect } from "react"

export default function Card() {
  const [pokemons, setPokemons] = useState([])
  useEffect(() => {
    const pokemonData = async function (pokeName) {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`
      const respone = await fetch(url, { mode: "cors" })
      const data = await respone.json()
      return { name: data.name, src: data.sprites.front_default, id: data.id }
    }

    const loadPokemons = async () => {
      const names = [
        "pikachu",
        "bulbasaur",
        "squirtle",
        "charmander",
        "pidgey",
        "rattata",
        "ekans",
        "clefairy",
      ]
      const results = await Promise.all(names.map(pokemonData))
      setPokemons(results)
    }
    loadPokemons()
  }, [])

  const [isSelected, setIsSelected] = useState(new Set())
  const [score, setScore] = useState(0)

  function shuffle(array) {
    let currentIndex = array.length

    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
      ;[array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ]
    }
  }

  const handleCardClick = (id) => {
    if (isSelected.has(id)) {
      // Card already selected – reset game
      setScore(0)
      setIsSelected(new Set())
    } else {
      // New card – increment score and track ID
      const newSelected = new Set(isSelected)
      newSelected.add(id)
      setIsSelected(newSelected)
      setScore(score + 1)
    }

    // Shuffle the cards
    shuffle(pokemons)
  }
  return (
    <>
      <h1 className="title">MEMORAZITION GAME</h1>
      <div className="cardContainers">
        {pokemons.map((pokemon) => (
          <div
            className="pokeCard"
            key={pokemon.id}
            onClick={() => handleCardClick(pokemon.id)}
          >
            <h4>{pokemon.name}</h4>
            <img style={{ transform: "scale(1.3)" }} src={pokemon.src} alt="" />
          </div>
        ))}
      </div>
      <br />
      <h2 className="score">SCORE: {score}</h2>
    </>
  )
}
