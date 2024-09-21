import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Search from './Search'

const Version = () => {
  const { name } = useParams()
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://registry.npmjs.org/${name}`)
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [name])

  const calculateTimeAgo = (dateString) => {
    const publishedDate = new Date(dateString)
    const currentDate = new Date()
    const timeDifference = currentDate - publishedDate
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

    if (daysDifference > 0) {
      return `${daysDifference} days ago`
    } else {
      const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60))
      return `${hoursDifference} hours ago`
    }
  }

  return (
    <> 
    <div className='card border border-0 shadow-sm rounded-0 mb-4'>
    <div className='card-body '>
      <Search />
    </div>
    </div>
    <div>
      {data ? (
        <div className='container'>
          <h3>{data._id}</h3>

          <table className='table  shadow-lg'>
            <thead>
              <tr>
                <th>Version</th>
                <th>Author</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data.versions)
                .reverse()
                .map(([version, value]) => (
                  <tr key={version}>
                    <td>{version}</td>
                    <td>{value.author.name}</td>
                
                   
                  </tr>
                ))}
            </tbody>
           
          </table>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
    </>
  )
}

export default Version