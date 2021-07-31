function API( _id ) {
    return axios({
      method: 'GET',
      url: `https://pokeapi.co/api/v2/pokemon/${_id}/`,
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.data)
}

function changePoke( _id ) {
  let imagePoke
  let gifPoke
  let namePoke = document.querySelector('#name')
  const containerImages = document.querySelector('#containerImages')
  
  containerImages.innerHTML = '<div id="load"><div class="circle"></div><div class="circle"></div><div class="circle"></div></div>'
  
  API( _id )
    .then(pokemon => {  
    
      const pokemonImages = pokemon.sprites
      namePoke.innerHTML = pokemon.name
    
      containerImages.innerHTML = ''
    
      Object.keys(pokemonImages).map((key) => {
        if(pokemonImages[key]){
          imagePoke = document.createElement('img')
          imagePoke.src = pokemonImages[key] 
          containerImages.appendChild(imagePoke)
        }
      })
    
      gifPoke = document.createElement('img')
      gifPoke.src = `http://pokestadium.com/sprites/xy/${pokemon.name}.gif`
      containerImages.appendChild(gifPoke)
      
    })
  .catch(error => console.log(error))
}

document.getElementById('prev').addEventListener('click', (e) => {
  let actualPoke = eval(document.querySelector('#containerImages').dataset.actual)
  let prevPoke = 1
  if(actualPoke > 1){
    prevPoke = actualPoke - 1
    document.querySelector('#containerImages').dataset.actual = prevPoke
  }
  
  changePoke( _id = prevPoke )
})

document.getElementById('next').addEventListener('click', (e) => {
  let actualPoke = eval(document.querySelector('#containerImages').dataset.actual)
  let nextPoke = 800
  if(actualPoke < nextPoke){
    nextPoke = actualPoke + 1
    document.querySelector('#containerImages').dataset.actual = nextPoke
  }
  
  changePoke( _id = nextPoke )
})

changePoke( _id = 1 )