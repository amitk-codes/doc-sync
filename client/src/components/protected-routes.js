import React from "react";
import Cookies from "js-cookie";
import {Navigate, Outlet} from 'react-router-dom'
import { Header } from "./header";

const useAuth = () => {
  const user = Cookies.get('loggedIn')
  if(user) return true
  else return false
}

function ProtectedRoutes(){
  const auth = useAuth()
  return auth ? <> <Header/> <Outlet/> </>:<Navigate to='/login'/>
}

export default ProtectedRoutes