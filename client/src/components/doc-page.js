import React, { useContext, useEffect, useState } from "react";
import { dltDocAPI, docPageAPI, updateDocData } from "../api/doc-page";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";

const DocPage = () => {
  const dispatch = useDispatch()
  const { id } = useParams();
  const [docData, setDocData] = useState({ title: '', content: '' });
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate()

  const docDataChange = (e) => {
    setIsUpdating(true);
    const { name, value } = e.target;
    setDocData((prevDocData) => ({ ...prevDocData, [name]: value }));
  };

  useEffect(() => {
    docPageAPI(id, setDocData, dispatch);
  }, []);

  useEffect(() => {
    // this is for handling auto save updating feature in documents
    let timeoutId;

    if (isUpdating) {
      timeoutId = setTimeout(() => {
        updateDocData(id, docData);
        setIsUpdating(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [docData]);


  return (
    <div className="px-2 px-md-0">
      <div className="container doc-page-div my-4 p-2 rounded-4">
        <div className="d-flex">
          <span className="material-symbols-rounded my-auto ms-1">{isUpdating ? 'autorenew' : 'cloud_done'}</span>
          <p className=" my-auto ms-2">{isUpdating ? 'Saving....' : 'Saved'}</p>
          <span className="material-symbols-rounded my-auto ms-auto me-1 text-danger dlt-doc-icon" onClick={() => dltDocAPI(id, navigate)}>
            delete_forever
          </span>
        </div>


        <div>
          <input
            placeholder="Untitled Document"
            className=" w-100 h3 doc-page-input mt-2"
            value={docData?.title}
            name="title"
            onChange={docDataChange}
          />
        </div>

        <div className="doc-page-txtarea-div">
          <textarea
            placeholder="Add your content...."
            className="doc-page-txtarea text-white"
            value={docData?.content}
            name="content"
            onChange={docDataChange}
          />
        </div>
      </div>
    </div>
  );
};

export { DocPage };
