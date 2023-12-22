import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

function NavbarContent({onSearchId, onSubmit, detail, lastRead }) {
  const detailAyat = detail ? detail.ayat : detail;

  return (
    <Offcanvas.Body>
      <Nav className="justify-content-end flex-grow-1 pe-3">
        <Nav.Link href="#action1">Home</Nav.Link>
        <Nav.Link href="#action2">Link</Nav.Link>
      </Nav>
        <>
          <Form onSubmit={onSubmit} className="d-flex mb-5">
            <Form.Control
              type="number"
              min="1"
              max={detailAyat.length}
              placeholder={`Pergi ke ayat 1-${detailAyat.length}`}
              className="mr-sm-2 m-1"
              style={{ width: '190px' }}
              onChange={onSearchId}
            />
            <Button type="submit" className="m-1" variant="secondary">
              Pergi
            </Button>
          </Form>
          <Nav.Link href="#action1">Terakhir Dibaca</Nav.Link>
          <p>Surah {lastRead && lastRead[0]} ayat {lastRead && lastRead[1]}</p>
        </>
    </Offcanvas.Body>
  );
}

export default NavbarContent
