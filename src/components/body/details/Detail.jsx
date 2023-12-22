import React from "react";
import DetailSurah from "./card/DetailSurah";
import BodyTitle from "./card/BodyTitle";
import GeneralDataDetails from "../../../scripts/data/GeneralDataDetails";
import { useState, useEffect } from "react";
import TafsirData from "../../../scripts/data/TafsirData";
import Spinner from 'react-bootstrap/Spinner';
import '../../../styles/index.css';

const Detail = ({handleLocalStorageChange}) => {
    const [loading, setLoading] = useState(true);
    const [Tafsirr, setTafsirr] = useState(null);
    const savedGetAll = GeneralDataDetails();
    const savedGetAllTafsir = TafsirData();

    useEffect(() => {
      if (savedGetAll) {
        setLoading(false);
      }
    }, [savedGetAll]);

    useEffect(() => {
      if(savedGetAllTafsir) {
          setTafsirr(savedGetAllTafsir)
      }
    });

    if (loading) {
      return <div className="loading"><Spinner className="" animation="border" variant="info" /></div>
    }

    return (
      <>
      <div className="row body__list">
        <BodyTitle data={savedGetAll} />
        <DetailSurah onLocalStorageChange={handleLocalStorageChange} detail={savedGetAll} tafsir={Tafsirr} />
      </div>
      </>
    );
};

export default Detail
