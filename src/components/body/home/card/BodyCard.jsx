import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BodyCardItem from "./BodyCardItem";


function BodyCard({datas}) {
    return(
        <div className=" body-card__list">   
           { 
            datas ? datas.map((e) => (
                <div className="w-full__vard" key={e.nomor}>
                    <Link to={`/surat/${e.nomor}`}> 
                    <BodyCardItem 
                    {...e}
                    key={e.nomor}
                    id={e.nomor}
                    />
                    </Link>
                </div>
            )) : datas
           }
        </div>
    )
}

export default BodyCard;