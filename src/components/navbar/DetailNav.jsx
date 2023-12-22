import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from 'react';
import { useEffect } from 'react';
import GeneralData from '../../scripts/data/GeneralData';
import GeneralDataDetails from '../../scripts/data/GeneralDataDetails';
// import Detail from '../body/home/Detail';
import Detail from '../body/details/Detail';



function DetailNav() {
    const [data, setData] = useState(null);
    const detailData = GeneralDataDetails();
    const dataLength = detailData ? detailData.jumlahAyat : detailData;
    const nomorDetail = detailData ? detailData.nomor : detailData;
    const nameLatin = detailData ? detailData.namaLatin : detailData;
    const [lastRead, setLastRead] = useState([null]);
    const [localStorageData, setLocalStorageData] = useState(null);
    const [onSearchId, setOnSearchId] = useState(null);
    const [clickSource, setClickSource] = useState(null);
    const navigate = useNavigate();

    const onLocalStorageChange = (newLocalStorageData) => {
      setLocalStorageData(newLocalStorageData);
    };

    useEffect(() => {
      const getLastRead = JSON.parse(localStorage.getItem('terakhirDibaca'));
        if(getLastRead) {
          setLastRead(getLastRead)
        }
    }, [localStorage.getItem('terakhirDibaca')]);

    useEffect(() => {
      GeneralData.getAll()
      .then(data => {
        setData(data)
      })
    },[]);

    useEffect(() => {
      if(lastRead) {
        goToLastReadId(lastRead)
      }
    },[lastRead, detailData]);

    const goToSurah = (e) => {
      navigate(`/surat/${e}`)
    }

    const goToLastRead = (e) => {
      navigate(`/surat/${e[2]}`);
      setClickSource('gotosurah');
    
      if (e[2] === nomorDetail) {
        const getId = document.getElementById(`ayat-${e[1]}`);
        if (getId) {
          getId.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    
      const timeoutId = setTimeout(() => {
        setClickSource(null);
      }, 2000); 
    
      return () => clearTimeout(timeoutId);
    };
    

    const goToLastReadId = (e)  => {
      if(e[2] === nomorDetail && clickSource === 'gotosurah') {
        const getId = document.getElementById(`ayat-${e[1]}`)

        if(getId) {
          getId.scrollIntoView({behavior:'smooth', block:'center'})
        }
      }
    } 
 
    const onSearchIdEventHandler = (event) => {
      const search = event.target.value;
      setOnSearchId(search)
    }

    const onSubmitHandler =(event) => {
      event.preventDefault();
      const searchValue = parseInt(onSearchId, 10);
      const ayatArray = Object.values(detailData.ayat);
      const foundAyat = ayatArray.find(item => item.nomorAyat === searchValue);

      if (foundAyat) {
        const elementId = foundAyat.nomorAyat;
        const element = document.getElementById(`ayat-${elementId}`);

        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
      }
    }

      const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
          href=""
          ref={ref}
          onClick={(e) => {
            e.preventDefault();
            onClick(e);
          }}
        >
          {children}
          &#x25bc;
        </a>
      ));

      const CustomMenu = React.forwardRef(
        ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
          const [value, setValue] = useState('');
      
          return (
            <div
              ref={ref}
              style={style}
              className={className}
              aria-labelledby={labeledBy}
            >
              <Form.Control
                autoFocus
                className="mx-3 my-2 w-auto"
                placeholder="Type to filter..."
                onChange={(e) => setValue(e.target.value)}
                value={value}
              />
              <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
              <ul className="list-unstyled">
                {React.Children.toArray(children).filter(
                  (child) =>
                    !value || child.props.children.toLowerCase().replace(/[ '\-]/g, '').indexOf(value.toLowerCase()) !== -1,
                )}
              </ul>
              </div>
            </div>
          );
        },
      );
   

  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3" sticky='top'>
          <Container fluid>
            <Navbar.Brand href="#">Qur'an App</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} className="custom-navbar-toggle" />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}  >
                    Surah {nameLatin}
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
              
                  <>
                    <Nav.Link >Cari Ayat :</Nav.Link>
                    <Form onSubmit={(event) => onSubmitHandler(event)} className='d-flex mb-2'>
                    <Form.Control
                      type="number"
                      min="1"
                      max={dataLength}
                      placeholder= {`ke ayat 1-`+dataLength}
                      className=" mr-sm-2 m-1"
                      style={{ width:'190px' }}
                      onChange={(event) => onSearchIdEventHandler(event)}
                                      
                    />
                    <Button type='submit' className="m-1" variant="secondary">Go</Button>
                    </Form>
                    <Nav.Link href="#action1">Terakhir Dibaca :</Nav.Link>
                    <div className='d-flex align-items-center justify-content-between mb-2'>
                    {
                      localStorageData ? (
                          <p className='mb-0'>Surah {localStorageData[0]} ayat {localStorageData[1]}</p>
                      ) : (
                          <p className='mb-0'>Surah {lastRead[0]} ayat {lastRead[1]}</p>
                      )
                    }
                      <a id="next" type="button" onClick={() => goToLastRead(lastRead)} className="material-symbols-outlined">arrow_right_alt</a>
                      </div>

                    <Dropdown>
                      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                        Cari Surah
                      </Dropdown.Toggle>

                      <Dropdown.Menu as={CustomMenu}>
                        {data ? (
                          data.map((e) => (
                            <Dropdown.Item eventKey={e.nomor} key={e.nomor}  onClick={() => goToSurah(e.nomor)}>
                            {e.namaLatin}
                          </Dropdown.Item>
                          ))
                        ) : (
                          <Dropdown.Item disabled>Tidak ada data</Dropdown.Item>
                        )}
                      </Dropdown.Menu>

                    </Dropdown>
                    </>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
      <Detail handleLocalStorageChange={onLocalStorageChange} />
    </>
  );
}

export default DetailNav