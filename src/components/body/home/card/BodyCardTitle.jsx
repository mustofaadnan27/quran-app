import React from "react";
import Card from 'react-bootstrap/Card';

function BodyCardTitle({nomor, namaLatin}) {

    return(
        <div className="body-card__title">
             <Card.Title>{nomor}. {namaLatin}</Card.Title>
        </div>
    )
}

export default BodyCardTitle