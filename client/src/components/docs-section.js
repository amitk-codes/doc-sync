import React, { useContext, useEffect, useState } from "react";
import { Doc } from "./doc";
import { DocSectionAPI } from "../api/doc-section";
import { progressContext } from "../App";

const DocsSection = ({docs}) => {
  return (
    <div className="container">
      {docs.length === 0 ? <p className="fw-medium text-center mx-auto">Your document library is empty.</p> :

        <div className=" mt-2 row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3">

          {docs.map((doc) => {
            return (
              <div className="col d-flex justify-content-center" key={doc?._id}>
                <Doc
                  title={doc?.title || 'Untitled Document'}
                  content={doc?.content}
                  id={doc?._id}
                />
              </div>
            )
          })}


        </div>
      }
    </div>

  )
}

export { DocsSection }