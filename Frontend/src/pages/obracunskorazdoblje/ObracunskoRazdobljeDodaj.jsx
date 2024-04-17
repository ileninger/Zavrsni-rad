import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri"
import { RiArrowGoForwardFill } from "react-icons/ri";
import useLoading from "../../hooks/useLoading";

import { RoutesNames } from "../../constants";
import ObracunskoRazdobljeService from "../../services/ObracunskoRazdobljeService";
export default function ObracunskoRazdobljeDodaj() {

    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();

    async function dodajObracunskoRazdoblje(obracunskorazdoblje) {
        showLoading();
        const odgovor = await ObracunskoRazdobljeService.dodaj(obracunskorazdoblje)
        if (odgovor.ok) {
            navigate(RoutesNames.OBRACUNSKORAZDOBLJE_PREGLED);
        } else {
            console.log(odgovor);
            alert(odgovor.poruka);
        }
        hideLoading();
    }

    function handleSubmit(e) {
        e.preventDefault();
        const podaci = new FormData(e.target);
        //console.log(podaci.get('naziv'));

        const obracunskorazdoblje =
        {
            nazivplace: podaci.get('nazivplace'),
            brojradnihsati: parseFloat(podaci.get('brojradnihsati')),
            datumpocetkaplace: podaci.get('datumpocetkaplace'),
            datumkrajaplace: podaci.get('datumkrajaplace'),
        };

        //console.log(JSON.stringify(smjer));
        dodajObracunskoRazdoblje(obracunskorazdoblje);

    }


    return (
        <Container>
            <Form onSubmit={handleSubmit}>

            <Form.Group controlId="nazivplace">
                    <Form.Label>Naziv obračunskog razdoblja</Form.Label>
                    <Form.Control
                        type="text"
                        name="nazivplace"
                        placeholder='Naziv obračunskog razdoblja'
                    />
                </Form.Group>

                <Form.Group controlId="brojradnihsati">
                    <Form.Label>Broj radnih sati</Form.Label>
                    <Form.Control
                        type="text"
                        name="brojradnihsati"
                        placeholder='Broj radnih sati'
                    />
                </Form.Group>

                <Form.Group controlId="datumpocetkaplace">
                    <Form.Label>Datum početka obračunskog razdoblja</Form.Label>
                    <Form.Control
                        type="date"
                        name="datumpocetkaplace"
                        placeholder='Datum početka obračunskog razdoblja'
                    />
                </Form.Group>
                <Form.Group controlId="datumkrajaplace">
                    <Form.Label>Datum završetka obračunskog razdoblja </Form.Label>
                    <Form.Control
                        type="date"
                        name="datumkrajaplace"
                        placeholder='Datum završetka obračunskog razdoblja'
                    />
                </Form.Group>
                <Row className="akcije">
                    <Col>
                        <Link
                            className="btn btn-danger"
                            to={RoutesNames.OBRACUNSKORAZDOBLJE_PREGLED}>
                            <RiArrowGoBackFill size={15} />
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button
                            variant="primary"
                            type="submit">
                            <RiArrowGoForwardFill size={15} />
                            Dodaj novo obračunsko razdoblje
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}