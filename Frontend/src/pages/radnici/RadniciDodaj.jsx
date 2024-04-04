import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri"
import { RiArrowGoForwardFill } from "react-icons/ri";
import { RoutesNames } from "../../constants";
import RadnikService from "../../services/RadnikService";


export default function RadniciDodaj (){
    const navigate = useNavigate();

    async function dodajRadnika(radnik){
        const odgovor = await RadnikService.dodaj(radnik);
        if(odgovor.ok){
          navigate(RoutesNames.RADNICI_PREGLED);
        }else{
          console.log(odgovor);
          alert(odgovor.poruka);
        }
    }
    function handleSubmit(e){
        e.preventDefault();
        const podaci = new FormData(e.target);
        //console.log(podaci.get('naziv'));

        const radnik = 
        {
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            oiB: podaci.get('oib'),
            datumZaposlenja: podaci.get('datumzaposlenja'),
            iban: podaci.get('iban'),
            cijenaRadnogSata:parseFloat(podaci.get('cijenaRadnogSata')),
            koeficijentRadnogMjesta:parseFloat(podaci.get('koeficijentRadnogMjesta')),
          };

          //console.log(JSON.stringify(smjer));
          dodajRadnika(radnik);

    }
   
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control 
                        type='text'
                        name='ime'
                        placeholder='Ime radnika'
                        maxLength={255}
                        required
                        />
                </Form.Group>
                <Form.Group controlId="prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control 
                        type="text"
                        name="prezime"
                        placeholder='Prezime radnika'
                        maxLength={255}
                        />
                </Form.Group>
                <Form.Group controlId="oib">
                    <Form.Label>OiB</Form.Label>
                    <Form.Control 
                        type="text"
                        name="oib"
                        placeholder='OiB radnika'
                        maxLength={11}
                        />
                </Form.Group>
                <Form.Group controlId="datumzaposlenja">
                    <Form.Label>DatumZaposlenja</Form.Label>
                    <Form.Control 
                        type="text"
                        name="datumzaposlenja"
                        placeholder='Datum zaposlenja radnika'
                        maxLength={255}   
                        />
                </Form.Group>
                <Form.Group controlId="iban">
                    <Form.Label>Iban</Form.Label>
                    <Form.Control 
                        type="text"
                        name="iban"
                        placeholder='IBAN radnika'
                        maxLength={255}
                        />
                </Form.Group>
                <Form.Group controlId="cijenaRadnogSata">
                    <Form.Label>Cijena radnog sata</Form.Label>
                    <Form.Control 
                        type="text"
                        name="cijenaRadnogSata"
                        placeholder='Cijena radnog sata'
                    />
                </Form.Group>
                <Form.Group controlId="koeficijentRadnogMjesta">
                    <Form.Label>Koeficijent radnog mjesta </Form.Label>
                    <Form.Control 
                        type="text"
                        name="koeficijentRadnogMjesta"
                        placeholder='Koeficijent radnog mjesta'
                    />
                </Form.Group>
            <Row className="akcije">
                <Col>
                    <Link 
                        className="btn btn-danger"
                        to={RoutesNames.RADNICI_PREGLED}>
                        <RiArrowGoBackFill size={15} />    
                    Odustani
                    </Link>
                </Col>
                <Col>
                    <Button
                        variant="primary"
                        type="submit">
                        <RiArrowGoForwardFill size ={15} />
                    Dodaj radnika
                    </Button>
                </Col>
            </Row>
            </Form>
         </Container>

    );
}