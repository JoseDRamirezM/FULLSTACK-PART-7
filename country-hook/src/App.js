import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name === ''){
      return null
    }
    axios
      .get(`https://restcountries.eu/rest/v2/name/${encodeURI(name)}?fullText=true`)
      .then(country => {
        if (country.data !== [] ) {
          setCountry({...country, found: true})
        } 
      })
      .catch( exception => {
        setCountry({found: false})
        console.log(exception.message)
        
      })

    }, [name])
  return country
  
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  const countryData = country.data[0]

  return (
    <div>
      <h3>{countryData.name} </h3>
      <div>capital {countryData.capital} </div>
      <div>population {countryData.population}</div> 
      <img src={countryData.flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
