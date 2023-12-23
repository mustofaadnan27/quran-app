import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Example({ayat, teks, teksIndonesia, namaLatin}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <a type="button" className="material-symbols-outlined me-2" onClick={handleShow} >description</a>

      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"  
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Tafsir surah {namaLatin} ayat {ayat}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}>
          <Modal.Dialog>
          <span className="detail-teks__arab p-2">Arti : {teksIndonesia}</span>
          </Modal.Dialog> 
          <Modal.Dialog>
          <span className="detail-teks__arab p-2">Tafsir : {teks}</span>
          </Modal.Dialog> 
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
