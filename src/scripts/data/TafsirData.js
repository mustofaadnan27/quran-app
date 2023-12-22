import React from "react";
import CONFIG from "../globals/config";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const TafsirData = () => {
    const {id} = useParams();
    const endpoint = `${CONFIG.BASE_URL}/tafsir/${id}`;
    const [savedGetAll, setSavedGetAll] = useState(null);

    useEffect(() => {
        if(!savedGetAll) {
            fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                setSavedGetAll(data.data)
                // console.log(data)
            })
        }
    }, [savedGetAll, endpoint])

    return savedGetAll;
}

export default TafsirData
