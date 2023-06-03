import axios from 'axios'
import { BackendURL } from '../config'
import Cookies from 'js-cookie'
import { setProgress } from '../store/index'


const addNewDoc = async (navigate, dispatch) => {
  dispatch(setProgress(10))
  // top loading bar to 10%

  try {
    // creating a new document with empty title and content
    const response = await axios.post(`${BackendURL}/doc`, {
      title: '',
      content: ''
    }, {
      headers: {
        Authorization: Cookies.get('jwtToken')
      }
    })
    dispatch(setProgress(20))
    // top loading bar to 20%

    const docId = await response?.data?.responseData
    navigate(`/document/${docId}`)
    // since we'll get redirected to /document/:id , we'll handle next loading bar in
    // that page's API
    
  }catch(err){
    dispatch(setProgress(100))
    // if we encounter with error, reset the loading bar
    console.log(err)
  }
}

export {addNewDoc}
