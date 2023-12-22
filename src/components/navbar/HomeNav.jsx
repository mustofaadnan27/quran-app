import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';

function HomeNav({onSearch}) {
    
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
                        Qur'an App
                    </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                    <Nav.Link >Cari Surah :</Nav.Link>
                        <Form className='d-flex'>
                        <Form.Control 
                        type="text"
                        placeholder="Type to filter..."
                        className="  mr-sm-2 m-1"
                        style={{ width:'200px' }}
                        onChange={(event) => onSearch(event)}
                        />
                        </Form>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
                </Container>
            </Navbar>
        ))}
        </>
    );
}

export default HomeNav