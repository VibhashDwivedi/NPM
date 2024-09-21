import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
// import './App.css' // Ensure the CSS file is imported

const Search = () => {
  const [query, setQuery] = useState('')
  const [data, setData] = useState([])
  const searchContainerRef = useRef(null)

  const handleInputChange = (e) => {
    setQuery(e.target.value)
  }

  const handleSearch = () => {
    fetchData()
  }

  const fetchData = async () => {
    if (query.trim() === '') {
      setData([])
      return
    }

    try {
      const response = await fetch(`https://api.npms.io/v2/search?q=${query}`)
      const result = await response.json()
      setData(result.results)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    const debounceFetch = setTimeout(fetchData, 300)

    return () => clearTimeout(debounceFetch)
  }, [query])

  const handleResultClick = () => {
    setData([]) // Clear the search results
  }

  const handleClickOutside = (event) => {
    if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
      setData([]) // Clear the search results if clicked outside
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (


    
    <div className='mt-2 container'>
      <div className='search-container' ref={searchContainerRef}>
        <div className="input-group mb-3">
          <input 
            className='form-control rounded-0 bg-info-subtle p-2'
            type="text" 
            value={query} 
            onChange={handleInputChange} 
            placeholder="Search for a package" 
          />
         
        </div>
        {data.length > 0 && (
          <div className='search-results shadow-lg'>
            {data.slice(0, 9).map((item) => ( // Limit to 9 results
              <div key={item.package.name} className='search-result-item' onClick={handleResultClick}>
                <Link to={`http://localhost:3000/package/${item.package.name}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h6>{item.package.name}</h6>
                </Link>
                <p>{item.package.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Search