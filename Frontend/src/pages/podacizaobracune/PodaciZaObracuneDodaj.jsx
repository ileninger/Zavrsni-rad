import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri"
import { RiArrowGoForwardFill } from "react-icons/ri";

import { RoutesNames } from "../../constants";
import PodaciZaObracuneService from "../../services/PodaciZaObracuneService";


export default function PodaciZaObracuneDodaj() {

    const navigate = useNavigate();

    async function dodajPodatkeZaObracunOdbitaka(podacizaobracune) {
        const odgovor = await PodaciZaObracuneService.dodaj(podacizaobracune)
        if (odgovor.ok) {
            navigate(RoutesNames.PODACIZAOBRACUNE_PREGLED);
        } else {
            console.log(odgovor);
            alert(odgovor.poruka);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const podaci = new FormData(e.target);
        //console.log(podaci.get('naziv'));

        const podacizaobracune =
        {
            osnovniOsobniOdbitak: parseFloat(podaci.get('osnovniOsobniOdbitak')),
            postotakZaPrviMirovinskiStup: parseFloat(podaci.get('postotakZaPrviMirovinskiStup')),
            postotakZaDrugiMirovinskiStup: parseFloat(podaci.get('postotakZaDrugiMirovinskiStup')),
            stopaPorezaNaDohodak: parseFloat(podaci.get('stopaPorezaNaDohodak')),
        };

        //console.log(JSON.stringify(smjer));
        dodajPodatkeZaObracunOdbitaka(podacizaobracune);

    }


    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="osnovniOsobniOdbitak">
                    <Form.Label>Osnovni osobni odbitak</Form.Label>
                    <Form.Control
                        type="text"
                        name="osnovniOsobniOdbitak"
                        placeholder='Osnovni osobni odbitak'
                    />
                </Form.Group>
                <Form.Group controlId="postotakZaPrviMirovinskiStup">
                    <Form.Label>Koeficijent za prvi mirovinski stup </Form.Label>
                    <Form.Control
                        type="text"
                        name="postotakZaPrviMirovinskiStup"
                        placeholder='Koeficijent za prvi mirovinski stup'
                    />
                </Form.Group>
                <Form.Group controlId="postotakZaDrugiMirovinskiStup">
                    <Form.Label>Koeficijent za drugi mirovinski stup </Form.Label>
                    <Form.Control
                        type="text"
                        name="postotakZaDrugiMirovinskiStup"
                        placeholder='Koeficijent za drugi mirovinski stup'
                    />
                </Form.Group>
                <Form.Group controlId="stopaPorezaNaDohodak">
                    <Form.Label>Stopa poreza na dohodak </Form.Label>
                    <Form.Control
                        type="text"
                        name="stopaPorezaNaDohodak"
                        placeholder='Stopa poreza na dohodak'
                    />
                </Form.Group>
                <Row className="akcije">
                    <Col>
                        <Link
                            className="btn btn-danger"
                            to={RoutesNames.PODACIZAOBRACUNE_PREGLED}>
                            <RiArrowGoBackFill size={15} />
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button
                            variant="primary"
                            type="submit">
                            <RiArrowGoForwardFill size={15} />
                            Dodaj nove podatke  za obračun
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}