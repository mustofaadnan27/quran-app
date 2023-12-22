import React, { useEffect, useState } from "react";
import GeneralData from "../../../scripts/data/GeneralData";
import AppDefault from "./card/AppDefault";
import HomeNav from "../../navbar/HomeNav";
import '../../../styles/index.css';
import Footer from "../../footer/footer";
import { Spinner } from "react-bootstrap";

const page = "home";

const Data = () => {
    const [data, setData] = useState(null);
    const [searchBar, setSearchBar] = useState(null);

    useEffect(() => {
        GeneralData.getAll()
        .then(data => {
            setData(data);
        });
    }, []);

    const onSearchEventHandler = (event) => {
        const searchValue = event.target.value.toLowerCase();
        setSearchBar(searchValue);
    }

    const filteredData = Array.isArray(data) && data.filter((e) => {
        const cleanedName = (e.namaLatin).replace(/[ '\-]/g, '').toLowerCase();
        return cleanedName.includes(searchBar);
    });

    return (
        <>
            <HomeNav onSearch={onSearchEventHandler} page={page} />
            
            {data ? <AppDefault data={searchBar ? filteredData : data} /> : <div className="loading"><Spinner className="" animation="border" variant="info" /></div> }
            {data && <Footer />}
        </>
    );
}

export default Data;
