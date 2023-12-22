import React from "react";
import Card from 'react-bootstrap/Card';

function BodyCardContent({nama, tempatTurun, arti, jumlahAyat}) {
    return (
        <div className="body-card__content">
            <Card.Text>
             {nama}
            </Card.Text>
            <Card.Subtitle className="mb-2 text-muted">{tempatTurun} • {arti}</Card.Subtitle>
            <Card.Subtitle className="text-muted">{jumlahAyat} Ayat</Card.Subtitle>
        </div>
    )
} 

export default BodyCardContent