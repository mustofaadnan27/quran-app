import React from "react";
import BodyCardContent from "./BodyCardContent";
import BodyCardTitle from "./BodyCardTitle";
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

function BodyCardItem({nama, tempatTurun, arti, nomor, namaLatin, jumlahAyat}) {
    return (
        <Card>
          <Card.Body>
             <BodyCardTitle nomor={nomor} namaLatin={namaLatin} />
             <BodyCardContent nama={nama} tempatTurun={tempatTurun} arti={arti} jumlahAyat={jumlahAyat} />
          </Card.Body>
        </Card>
      );
}
export default BodyCardItem