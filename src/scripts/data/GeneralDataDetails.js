import { useState, useEffect } from "react";
import CONFIG from "../globals/config";
import { useParams } from 'react-router-dom';

const GeneralDataDetails = () => {
  const { id } = useParams();
  const [selectedId, setSelectedId] = useState(id);
  const endpoint = `${CONFIG.BASE_URL}/surat/${selectedId}`;
  const [savedGettAll, setSavedGetAll] = useState(null);

  useEffect(() => {
    setSelectedId(id);
    setSavedGetAll(null);
  }, [id]);
  // console.log(selectedId)

  useEffect(() => {
    if (selectedId) {
      fetch(endpoint)
        .then(response => response.json())
        .then(data => {
          setSavedGetAll(data.data);
          // console.log(data);
        })
        .catch(error => {
          // console.error("Error fetching data:", error);
        });
    }
  }, [selectedId, endpoint]);

  return savedGettAll;
};

export default GeneralDataDetails
