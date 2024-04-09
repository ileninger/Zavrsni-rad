import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { RoutesNames } from '../constants';

import './NavBar.css';

function NavBar() {

    const navigate = useNavigate ();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand 
            className='linkPocetna'
            onClick={()=>navigate(RoutesNames.HOME)}
            >
                Obračun plača APP
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
            <NavDropdown title="Plače" id="basic-nav-dropdown">
              <NavDropdown.Item
                onClick={()=>navigate(RoutesNames.PLACA_DODAJ)}
              
              >Izradin novu plaču </NavDropdown.Item>
              <NavDropdown.Item
                 onClick={()=>navigate(RoutesNames.PLACA_PREGLED)}
              >Prikaži plače</NavDropdown.Item>

            </NavDropdown>
          </Nav>
          <Nav className="me-auto">
            <NavDropdown title="Radnici" id="basic-nav-dropdown">
              <NavDropdown.Item 
                onClick={()=>navigate(RoutesNames.RADNICI_PREGLED)}
              >
                Pregled radnika
            </NavDropdown.Item>
              <NavDropdown.Item
              onClick={()=>navigate(RoutesNames.RADNICI_DODAJ)}
              >Dodaj novog radnika</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="me-auto">
            <NavDropdown title="Odbici" id="basic-nav-dropdown">
              <NavDropdown.Item 
                onClick={()=>navigate(RoutesNames.PODACIZAOBRACUNE_PREGLED)}
              >
                Pregled podataka za proračun odbitaka
            </NavDropdown.Item>
              <NavDropdown.Item
                onClick={()=>navigate(RoutesNames.PODACIZAOBRACUNE_DODAJ)}
              
              >Dodaj nove podatake za proračun odbitaka</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="me-auto">
            <NavDropdown title="Obračunska razdoblja" id="basic-nav-dropdown">
              <NavDropdown.Item 
                onClick={()=>navigate(RoutesNames.OBRACUNSKORAZDOBLJE_PREGLED)}
              >
                Pregled podataka za proračun odbitaka
            </NavDropdown.Item>
              <NavDropdown.Item
                onClick={()=>navigate(RoutesNames.OBRACUNSKORAZDOBLJE_DODAJ)}
              
              >Dodaj nove podatake za proračun odbitaka</NavDropdown.Item>
            </NavDropdown>
          </Nav>



        </Navbar.Collapse>
        <Navbar.Collapse className='justify-content-end'>
            <Nav.Link target ='_blank' href='https://ileninger-001-site1.anytempurl.com/swagger/index.html'>API Dokumentacija</Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;