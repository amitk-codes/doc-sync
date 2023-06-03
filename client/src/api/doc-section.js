import axios from 'axios'
import { BackendURL } from '../config'
import Cookies from 'js-cookie'
import { setProgress } from '../store'


const DocSectionAPI = async(setDocs, setName, setIsPageCalled, dispatch) => {
  dispatch(setProgress(30))
  // setting loading bar to 30%

  try{
    // calling API of displaying the documents in the home tab
    const response = await axios.get(`${BackendURL}/doc`, {
      headers: {
        Authorization: Cookies.get('jwtToken')
      }
    })

    const data = await response?.data?.responseData
    const userName = await response?.data?.userName
    setDocs(data)

    setName(userName)
    // setting the name in home tab
    setIsPageCalled(true)
    
    dispatch(setProgress(100))
    // reset the loading bar
  }catch(err){
    dispatch(setProgress(100))
    console.log(err)
  }

  
}

export {DocSectionAPI}