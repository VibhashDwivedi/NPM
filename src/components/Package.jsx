import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { marked } from 'marked'
import Side from './Side'
import Search from './Search'

const Package = () => {
  const { name } = useParams()
  const [data, setData] = useState(null)
  const [modifiedReadme, setModifiedReadme] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://registry.npmjs.org/${name}`)
        const result = await response.json()
        setData(result)
        processReadme(result.readme)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [name])

  const processReadme = (readme) => {
    const modified = `${readme}`
    const html = marked(modified)
    setModifiedReadme(html)
  }

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
        <div className='container p-2 mb-5'>
         
          <div className="row ">
            <div className="col-md-8 overflow-hidden">
              <h4>{data._id}</h4>
              <div className="d-flex text-muted">
              <div>{data['dist-tags']?.latest}</div>
              <p className='mx-3'>{data.private ? 'Private' : 'Public'}</p> {/* Added line */}
              <div>Published {calculateTimeAgo(data?.time?.modified)}</div>
              </div>
             
            
             <div className="d-flex">
             <p className='fw-bold text-secondary'>{data.readmeFilename}</p>
             <Link className='mx-3 fw-bold' style={{textDecoration:'none'}} to={`/version/${name}`}>View version history</Link>
             </div>
            
            
             
              <div className='' dangerouslySetInnerHTML={{ __html: modifiedReadme }} />

              <h4>
                Keywords
              </h4>
              <hr />
              <div>
                {data.keywords?.map((keyword, index) => (
                  <span key={index} className="me-4 text-danger fs-5 fw-bold">{keyword}</span>
                ))}
              </div>


             
            </div>
            <div className="col-md-4">
              <Side home={data.homepage} repo={data.repository?.url} version={data['dist-tags']?.latest} license={data.license} />
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </>
  )
}

export default Package