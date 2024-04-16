import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { RoutesNames } from '../constants';

import './NavBar.css';
import useAuth from '../hooks/useAuth';


function NavBar() {

  const navigate = useNavigate();
  const { logout, isLoggedIn } = useAuth();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand
          className='linkPocetna'
          onClick={() => navigate(RoutesNames.HOME)}
        >
          Obračun plaća APP
        </Navbar.Brand>

        {isLoggedIn ? (
          <>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Plaće" id="basic-nav-dropdown">
              <NavDropdown.Item
                onClick={() => navigate(RoutesNames.PLACA_PREGLED)}
              >
                Pregled plaća
              </NavDropdown.Item>

              <NavDropdown.Item
                onClick={() => navigate(RoutesNames.PLACA_DODAJ)}
              >
                Dodaj novu plaću
              </NavDropdown.Item>

            </NavDropdown>
          </Nav>

          <Nav className="me-auto">
            <NavDropdown title="Radnici" id="basic-nav-dropdown">
              <NavDropdown.Item
                onClick={() => navigate(RoutesNames.RADNICI_PREGLED)}
              >
                Pregled radnika
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => navigate(RoutesNames.RADNICI_DODAJ)}
              >Dodaj novog radnika</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="me-auto">
            <NavDropdown title="Odbici" id="basic-nav-dropdown">
              <NavDropdown.Item
                onClick={() => navigate(RoutesNames.PODACIZAOBRACUNE_PREGLED)}
              >
                Pregled podataka za proračun odbitaka
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => navigate(RoutesNames.PODACIZAOBRACUNE_DODAJ)}

              >Dodaj nove podatake za proračun odbitaka</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="me-auto">
            <NavDropdown title="Obračunska razdoblja" id="basic-nav-dropdown">
              <NavDropdown.Item
                onClick={() => navigate(RoutesNames.OBRACUNSKORAZDOBLJE_PREGLED)}
              >
                Pregled podataka za proračun odbitaka
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => navigate(RoutesNames.OBRACUNSKORAZDOBLJE_DODAJ)}

              >Dodaj nove podatake za proračun odbitaka</NavDropdown.Item>
            </NavDropdown>
          </Nav>



        </Navbar.Collapse>
        <Navbar.Collapse className='justify-content-end'>
          <Nav>
          <Nav.Link onClick={logout}>Odjava</Nav.Link>
          <Nav.Link target='_blank' href='https://ileninger-001-site1.anytempurl.com/swagger/index.html'>API Dokumentacija</Nav.Link>
          </Nav>
        </Navbar.Collapse>

        </>
         ) : (
          <>
          <Navbar.Collapse className="justify-content-end">
            <Nav.Link onClick={() => navigate(RoutesNames.LOGIN)}>
              Prijava
            </Nav.Link>
          </Navbar.Collapse>
          </>
        )}
        
      </Container>
    </Navbar>
  );
}

export default NavBar;