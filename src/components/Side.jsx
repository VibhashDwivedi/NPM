import React from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'

const Side = (props) => {
const { name } = useParams()
const homeSubstring = props.home.substring(8)
const repoSubstring = props.repo.substring(12)

  return (
    <div>
        <h6 className='text-muted'>Install</h6>
        <div className='p-2 border border-1 mt-2'>
        npm i {name}
        </div>
        <h6 className='text-muted mt-4'>Homepage</h6>
        <div className='p-2 border border-1 mt-2'>
       <NavLink to={props.home}>{homeSubstring}</NavLink>
        </div>
        <h6 className='text-muted mt-4'>Repository</h6>
        <div className='p-2 border border-1 mt-2'>
       <NavLink to={props.repo}>{repoSubstring}</NavLink>
        </div>
<div className='d-flex justify-content-around mt-4'>
        <h6>
          Version
        </h6>
        <h6>
          License
        </h6>
        </div>
<div className='d-flex justify-content-around fw-medium'>
        <div>
          {props.version}
        </div>
        <div>
          {props.license}
        </div>
        </div>
    </div>
  )
}

export default Side