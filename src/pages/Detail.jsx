import React from "react";
// import DetailSurahApi from "../api/DetailsurahApi";
// import Detail from "../components/body/details/Detail";
import Detail from "../components/body/details/Detail";
import BasicExample from "../components/navbar/DetailNav";
import { useParams } from "react-router-dom";

const DetailPages = () => {
    const {id} = useParams();
    return (
        // <Detail />
        <BasicExample detail={{ayat: id}} />
    )   
}

export default DetailPages