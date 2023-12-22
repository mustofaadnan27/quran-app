import React, { useState, useRef, useEffect } from "react";
import DetailSurahContent from "./DetailSurahContent";
import Footer from "../../../footer/footer";
import '../../../../styles/index.css';

function DetailSurah({ detail, tafsir, onLocalStorageChange }) {
    const [playingIndex, setPlayingIndex] = useState(null);
    const audioRef = useRef();
    const detailAyat = detail ? detail.ayat : detail;
    const detailTafsir = tafsir ? tafsir.tafsir : tafsir;
    const [audioArray, setAudioArray] = useState(["05"]);
    const [localStorageData, setLocalStorageData] = useState(localStorage.getItem('lastread') || '');
    const [tafsirSend, setTafsirSend] = useState([null]);

    const newAddValueToDetail = detailAyat ? detailAyat.map((details) => {
        const tafsirText = detailTafsir ? detailTafsir.find((tafsirs) => tafsirs.ayat === details.nomorAyat) : null;
        return {
            ...details,
            tafsir: tafsirText
        }
    }) : detailAyat;

    const handleAudioEnd = () => {
        const nextIndex = (playingIndex + 1) % detailAyat.length;
        if (nextIndex === 0) {
            audioRef.current.pause();
            setPlayingIndex(null);
            return;
        }

        audioRef.current.pause();
        audioRef.current.removeEventListener('ended', handleAudioEnd);

        const nextAudio = detailAyat[nextIndex].audio[audioArray];
        setPlayingIndex(nextIndex);

        const nextAyatElement = document.getElementById(`ayat_${detailAyat[nextIndex].nomorAyat}`);
        if (nextAyatElement) {
            nextAyatElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }

        // Pause and remove event listener before creating a new audio instance
        // audioRef.current.pause();
        // audioRef.current.removeEventListener('ended', handleAudioEnd);

        // Create and play the next audio instance
        audioRef.current = new Audio(nextAudio);
        audioRef.current.addEventListener('ended', handleAudioEnd);
        audioRef.current.play();
    };

    useEffect(() => {
        // Reset audio saat surah berubah
        setPlayingIndex(null);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.removeEventListener('ended', handleAudioEnd);
        }
    }, [detail]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.addEventListener('ended', handleAudioEnd);

            return () => {
                audioRef.current.removeEventListener('ended', handleAudioEnd);
            };
        }
    }, [playingIndex, audioRef, detailAyat, audioArray]);

    const getAudio = (event) => {
        const selectedIndex = event.target.selectedIndex;
        const adjustedIndex = selectedIndex + 1;
        const newSelectedIndex = String(adjustedIndex).padStart(2, '0');
        setAudioArray(newSelectedIndex);
    }

    const playAudio = (indexAudio, index) => {
        if (playingIndex === index) {
            audioRef.current.pause();
            setPlayingIndex(null);
        } else {
            if (playingIndex !== null) {
                audioRef.current.pause();
                // Hapus event listener sebelum menambahkannya lagi
                audioRef.current.removeEventListener('ended', handleAudioEnd);
            }
            audioRef.current = new Audio(indexAudio);
            audioRef.current.play();

            audioRef.current.addEventListener('ended', () => {
                const nextIndex = (index + 1) % detailAyat.length;
                const nextAudio = detailAyat[nextIndex].audio[audioArray];

                // Hapus event listener sebelum memutar audio berikutnya
                audioRef.current.removeEventListener('ended', handleAudioEnd);

                audioRef.current = new Audio(nextAudio);
                audioRef.current.play();
                setPlayingIndex(nextIndex);

                // Scroll ke elemen ayat yang baru diputar
                const nextAyatElement = document.getElementById(`ayat_${detailAyat[nextIndex].nomorAyat}`);
                if (nextAyatElement) {
                    nextAyatElement.scrollIntoView({ behavior: "smooth", block: "center" });
                }
            });
            setPlayingIndex(index);
        }
    };

    const handleLocalStorage = () => {
        setLocalStorageData(localStorage.getItem('terakhirDibaca') || '');
    }
    const noteAyah = (surah, nomorAyat, nomor) => {
        const userConfirmation = confirm('Tandai?')
        if (userConfirmation) {
            const updateLastRead = [surah, nomorAyat, nomor]
            localStorage.setItem('terakhirDibaca', JSON.stringify(updateLastRead))
            setLocalStorageData(updateLastRead)
        }
    }

    useEffect(() => {
        window.addEventListener('storage', handleLocalStorage);
        return () => {
            window.removeEventListener('storage', handleLocalStorage);
        }
    }, [localStorageData]);

    useEffect(() => {
        onLocalStorageChange(localStorageData);
    }, [localStorageData]);

    const tafsirPerAyat = (nomorAyat) => {
        const idCardTafsir = document.getElementById(`ayat_${nomorAyat}`);

        const specifikId = parseInt(idCardTafsir.id.split("_")[1]);
        const goToNomorAyat = specifikId - 1;
        const getTafsirAyat = tafsir.tafsir[goToNomorAyat];
        setTafsirSend(getTafsirAyat)
    }

    return (
        <>
            {detail ? (
                <div className="col-12 body-app__content" style={{ padding: "20px" }}>
                    <select className="form-control mb-2" name="select" id="select" onChange={(event) => getAudio(event)}>
                        <option className="form-control" value={detail ? detail.audioFull["01"] : detail}>Abdullah Al-Juhany</option>
                        <option value={detail ? detail.audioFull["02"] : detail}>Abdul Muhsin Al-Qasim</option>
                        <option value={detail ? detail.audioFull["03"] : detail}>Abdurrahman as-Sudais</option>
                        <option value={detail ? detail.audioFull["04"] : detail}>Ibrahim Al-Dossari</option>
                        <option value={detail ? detail.audioFull["05"] : detail}>Misyari Rasyid Al-Afasi</option>
                    </select>
                    {detail && (
                        <>
                            {newAddValueToDetail.map((e, index) => (
                                <div className={`detail-content__card ${playingIndex === index ? 'active' : ''}`} key={e.nomorAyat} id={`ayat_${e.nomorAyat}`}>
                                    <DetailSurahContent
                                        detail={detail}
                                        {...e}
                                        key={e.nomorAyat}
                                        noteAyah={noteAyah}
                                        playAudio={playAudio}
                                        audioArray={audioArray}
                                        playingIndex={playingIndex}
                                        index={index}
                                        tafsirPerAyat={() => tafsirPerAyat(e.nomorAyat)}

                                        tafsirSend={tafsirSend}
                                    />
                                </div>
                            ))}
                        </>
                    )}
                </div>
            ) : (
                <div></div>
            )}
            <Footer />
        </>
    );
}

export default DetailSurah;
