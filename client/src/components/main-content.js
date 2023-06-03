import React, { useContext, useEffect, useState } from 'react'
import { DocsSection } from './docs-section'
import { AddBtn } from './add-btn'
import { DocSectionAPI } from '../api/doc-section'
import { useDispatch } from 'react-redux'


const MainContent = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState("")
  const [docs, setDocs] = useState([])
  const [isPageCalled, setIsPageCalled] = useState(false)
  useEffect(() => {
    DocSectionAPI(setDocs, setName, setIsPageCalled, dispatch)
  }, [])
  
  return (
    isPageCalled === false ? null :
      <div className='mb-5'>
        <div className='text-center '>
          <p className='h4 fw-medium mt-2 mb-3'><span className=' text-white '>{name}'s</span> Documents</p>
        </div>
        <hr className='container' />

        <DocsSection
          docs = {docs}
        />

        <AddBtn />

      </div>
    
  )
}

export { MainContent }