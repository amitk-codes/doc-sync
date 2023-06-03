import React from "react";
import { useNavigate } from "react-router-dom";

const Doc = ({title, content, id}) => {
  const navigate = useNavigate()
  return (
    <div className="doc-div d-flex  flex-column justify-content-between rounded-3" onClick={()=>navigate(`/document/${id}`)}>
      <div className="text-center truncate-lines">
        {content}
      </div>
      <div className="h-25 doc-heading rounded-bottom-3 text-center">
        <h6 className="truncate">{title}</h6>
      </div>
    </div>
  )
}

export {Doc}