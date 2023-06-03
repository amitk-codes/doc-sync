import axios from 'axios'
import { BackendURL } from '../config'
import Cookies from 'js-cookie'
import { setProgress } from '../store'


const docPageAPI = async (docId, setDocData, dispatch) => {
  dispatch(setProgress(40))
  // top loading to 40%

  try {
    // calling API for setting the existing document data 
    const response = await axios.get(`${BackendURL}/doc/${docId}`, {
      headers: {
        Authorization: Cookies.get('jwtToken')
      }
    })
    const data = await response?.data?.responseData
    setDocData(data)
    // setting the document data 

    dispatch(setProgress(100))
    // reset (complete) the loading bar 


  } catch (err) {
    dispatch(setProgress(100))
    // reset the loading bar
    console.log(err)
  }
  
}

const updateDocData = async(docId, docData) => {
  try {
    // calling API for updating document data 
    const response = await axios.put(`${BackendURL}/doc/${docId}`, {
      title: docData?.title,
      content: docData?.content
    }, {headers: {
      Authorization: Cookies.get('jwtToken')
    }})
    
  } catch (err) {
    console.log(err)
  }
}

const dltDocAPI = async(docId, navigate) => {
  try{
    // calling API for deleting the document
    const response = await axios.delete(`${BackendURL}/doc/${docId}`, {headers:{
      Authorization: Cookies.get('jwtToken')
    }})
    console.log('deleted doc')
    navigate('/')
    
  }catch(err){
    console.log(err)
  }


}

export {docPageAPI, updateDocData, dltDocAPI}