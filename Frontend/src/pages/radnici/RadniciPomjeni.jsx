import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri"
import { RiArrowGoForwardFill } from "react-icons/ri";
import { RoutesNames } from "../../constants";
import RadnikService from "../../services/RadnikService";
import { useEffect, useState } from "react";


export default function RadniciPomjeni (){
    const navigate = useNavigate();
    const routeParams = useParams();
    const [radnik,setRadnici] = useState({});

    async function dohvatiRadnike(){
        await RadnikService.getBySifra(routeParams.sifra)
        .then((res)=>{
            setRadnici(res.data)
        })
        .catch((e)=>{
            alert(e.poruka);
        });
    }

    useEffect(()=>{
        //console.log("useEffect")
        dohvatiRadnike();
    },[]);

    async function promjeniRadnika(radnik){
        const odgovor = await RadnikService.promjeni(routeParams.sifra,radnik);
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

        const radnik = 
        {
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            oib: podaci.get('oib'),
            datumZaposlenja: podaci.get('datumzaposlenja'),
            iban: podaci.get('iban'),
            cijenaRadnogSata:parseFloat(podaci.get('cijenaRadnogSata')),
            koeficijentRadnogMjesta:parseFloat(podaci.get('koeficijentRadnogMjesta')),
          };

          //console.log(JSON.stringify(smjer));
          promjeniRadnika(radnik);
    }

    

    
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control 
                        type="text"
                        defaultValue={radnik.ime}
                        name="ime"/>
                </Form.Group>
                <Form.Group controlId="prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control 
                        type="text"
                        defaultValue={radnik.prezime}
                        name="prezime"/>
                </Form.Group>
                <Form.Group controlId="oib">
                    <Form.Label>OiB</Form.Label>
                    <Form.Control 
                        type="text"
                        defaultValue={radnik.oib}
                        name="oib"/>
                </Form.Group>
                <Form.Group controlId="datumzaposlenja">
                    <Form.Label>DatumZaposlenja</Form.Label>
                    <Form.Control 
                        type="text"
                        defaultValue={radnik.datumzaposlenja}
                        name="datumzaposlenja"/>
                </Form.Group>
                <Form.Group controlId="iban">
                    <Form.Label>Iban</Form.Label>
                    <Form.Control 
                        type="text"
                        defaultValue={radnik.iban}
                        name="iban"/>
                </Form.Group>
                <Form.Group controlId="cijenaRadnogSata">
                    <Form.Label>Cijena radnog sata</Form.Label>
                    <Form.Control 
                        type="text"
                        defaultValue={radnik.cijenaradnogsata}
                        name="cijenaRadnogSata"
                        placeholder='Cijena radnog sata'
                    />
                </Form.Group>
                <Form.Group controlId="koeficijentRadnogMjesta">
                    <Form.Label>Koeficijent radnog mjesta </Form.Label>
                    <Form.Control 
                        type="text"
                        defaultValue={radnik.koeficijentradnogmjesta}
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
                    Promjeni radnika 
                    </Button>
                </Col>
            </Row>
            </Form>
         </Container>

    );
}