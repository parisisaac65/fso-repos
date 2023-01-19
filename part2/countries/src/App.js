import { useState, useEffect } from 'react'
import axios from 'axios'


const Country = ({ country }) => {
  return (
    <li>{country.name.common}</li>
  )
}

// const Languages = ({ country }) => {
//   return (
//     <div>
//       <h2>languages: </h2>
//       <li>{country.languages}</li>
//     </div>
//   )
// }

// const Filter = () => {
//   return (
//     <div>find countries <input value={} onChange={}/> </div>
//   )
// }

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    const regex = new RegExp (event.target.value, 'gi')
    const findCountries = countries.filter(country => country.name.common.match(regex))
    setCountries(findCountries)
  }
 

  return (
    <div>
      <div>find countries <input value={newFilter} onChange={handleFilterChange}/></div>
      <ul>
        {countries.map(country => 
          <Country key={country.name.common} country={country} />
        )}
      </ul>
    </div>
  )


}

export default App 