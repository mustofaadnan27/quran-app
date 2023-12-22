import React from "react";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import '../../../../styles/index.css';


const BodyTitle = ({ data }) => {
    const [isBackButtonDisabled, setIsBackButtonDisabled] = useState(false);
    const navigate = useNavigate();
  
    const nextSurah = () => {
      if (data) {
        const nextSurah = data.suratSelanjutnya;
        if(nextSurah == false) {
          setIsBackButtonDisabled(true)
          const button = document.getElementById("next");
          button.classList.add('v-hidden');
        }else {
          navigate(`/surat/${nextSurah.nomor}`);
        }
      }
    }

    const backSurah = () => {
      if (data) {
        const backSurah = data.suratSebelumnya;
        if(backSurah == false) {
          setIsBackButtonDisabled(true)
          const button = document.getElementById("back");
          button.classList.add('v-hidden');
        }else {
          navigate(`/surat/${backSurah.nomor}`);
        }
      }
    }
    
  return (
    <>
       { 
        data ? (
            <>
              <div className="col-12 body-app__title">
                <h3>{data.namaLatin} - {data.nama}</h3>
                Jumlah Ayat : {data.jumlahAyat}
                <p>بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
              </div>
              
              <div style={{ maxWidth:'700px' }} className="col-12 body__next d-flex justify-content-between">
                <a id="back" type="button" onClick={() => backSurah()} className="material-symbols-outlined" disabled={isBackButtonDisabled}>arrow_left_alt</a>
                <a id="next" type="button" onClick={() => nextSurah()} className="material-symbols-outlined" disabled={isBackButtonDisabled}>arrow_right_alt</a>
              </div>
            </>
        ) : (
            <div className="loading"><Spinner className="" animation="border" variant="info" /></div>
        )
       }
    </>
  );
};

export default BodyTitle
