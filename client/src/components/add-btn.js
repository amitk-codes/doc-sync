import React from "react";
import { addNewDoc } from "../api/add-btn";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const AddBtn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <span className="material-symbols-rounded add-btn-div" onClick={()=>addNewDoc(navigate, dispatch)}>
      add_circle
    </span>
  )
}

export { AddBtn }