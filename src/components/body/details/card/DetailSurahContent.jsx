import React from "react";
import Card from 'react-bootstrap/Card';
// import Example from "../../../Tafsir";
import Example from "../../tafsir/Tafsir";
import '../../../../styles/index.css';


function DetailSurahContent({detail, nomorAyat, audio, teksArab, teksIndonesia, teksLatin, noteAyah, playAudio, audioArray, playingIndex, tafsir, index}) {
    const ayat = tafsir ? tafsir.ayat : tafsir;
    const teks = tafsir ? tafsir.teks : tafsir;
    const namaLatin = detail ? detail.namaLatin : detail;
    // console.log(detail)
    return(
        <div className="detail-surah__content" id={`ayat-${nomorAyat}`}>
            <Card className="detail-card mb-2">
            <Card.Body>
                <Card.Title className="d-flex justify-content-between border-bottom-1"> 
                <div>
                    <span className="detail-nomor__ayat">{detail.nomor} : {nomorAyat}</span>
                    </div>
                    <div className="activities d-flex justify-content-center align-align-items-center">
                    <a type="button" className="material-symbols-outlined me-2" onClick={() => playAudio(audio[audioArray], index)}>
                        {playingIndex === index ? 'stop_circle' : 'play_circle'}
                    </a>
                    <a type="button" className="material-symbols-outlined me-2" onClick={() => noteAyah(detail.namaLatin, nomorAyat, detail.nomor)} >note_add</a>
                    <Example namaLatin={namaLatin} ayat={ayat} teks={teks} teksIndonesia={teksIndonesia} />
                </div>
                </Card.Title>
                
                <Card.Text>
                    <span className="detail-teks__arab">{teksArab}</span>
                </Card.Text>
                
                <Card.Subtitle className="mb-2 text-muted"><div className="detail-teks__latin">{teksLatin}</div></Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted"><span className="detail-teks_indonesia">{teksIndonesia}</span></Card.Subtitle>
            </Card.Body>
            </Card>
        </div>
    )
}   

export default DetailSurahContent