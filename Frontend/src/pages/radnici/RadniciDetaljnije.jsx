import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri"
import { RoutesNames } from "../../constants";
import RadnikService from "../../services/RadnikService";
import { useEffect, useState } from "react";
import useLoading from "../../hooks/useLoading";


export default function RadniciDetaljnije() {
    const navigate = useNavigate();
    const routeParams = useParams();
    const [radnik, setRadnici] = useState({});
    const { showLoading, hideLoading } = useLoading();

    async function dohvatiRadnike() {
        showLoading();
        await RadnikService.getBySifra(routeParams.sifra)
            .then((res) => {
                setRadnici(res.data)
            })
            .catch((e) => {
                alert(e.poruka);
            });
            hideLoading();
    }

    useEffect(() => {
        //console.log("useEffect")
        dohvatiRadnike();
    }, []);

    async function promjeniRadnika(radnik) {
        const odgovor = await RadnikService.promjeni(routeParams.sifra, radnik);
        if (odgovor.ok) {
            navigate(RoutesNames.RADNICI_PREGLED);
        } else {
            console.log(odgovor);
            alert(odgovor.poruka);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const podaci = new FormData(e.target);

        const radnik =
        {
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            oib: podaci.get('oib'),
            datumZaposlenja: podaci.get('datumzaposlenja'),
            iban: podaci.get('iban'),
            cijenaRadnogSata: parseFloat(podaci.get('cijenaradnogsata')),
            koeficijentRadnogMjesta: parseFloat(podaci.get('koeficijentradnogmjesta')),
            osnovniOsobniOdbitak: parseFloat(podaci.get('osnovniosobniodbitak')),
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
                        name="ime" />
                </Form.Group>
                <Form.Group controlId="prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control
                        type="text"
                        defaultValue={radnik.prezime}
                        name="prezime" />
                </Form.Group>
                <Form.Group controlId="oib">
                    <Form.Label>OiB</Form.Label>
                    <Form.Control
                        type="text"
                        defaultValue={radnik.oib}
                        name="oib" />
                </Form.Group>
                <Form.Group controlId="datumzaposlenja">
                    <Form.Label>Datum zaposlenja</Form.Label>
                    <Form.Control
                        type="text"
                        defaultValue={radnik.datumzaposlenja}
                        name="datumzaposlenja" />
                </Form.Group>
                <Form.Group controlId="iban">
                    <Form.Label>Iban</Form.Label>
                    <Form.Control   
                        type="text"
                        defaultValue={radnik.iban}
                        name="iban" />
                </Form.Group>
                <Form.Group controlId="cijenaradnogsata">
                    <Form.Label>Cijena radnog sata</Form.Label>
                    <div className="input-group">
                        <Form.Control
                            type="text"
                            defaultValue={radnik.cijenaradnogsata}
                            name="cijenaRadnogSata"
                            placeholder='Cijena radnog sata'
                        />
                        <span className="input-group-text">€</span>
                    </div>
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

                <Form.Group controlId="osnovniosobniodbitak">
                    <Form.Label>Osobni osobni odbitak </Form.Label>
                    <div className="input-group">
                    <Form.Control
                        type="text"
                        defaultValue={radnik.osnovniosobniodbitak}
                        name="osnovniosobniodbitak"
                        placeholder='Osobni osobni odbitak'

                    />
                    <span className="input-group-text">€</span>
                    </div>
                </Form.Group>
                <Row className="akcije">
                    <Col>
                        <Link
                            className="btn btn-danger"
                            to={RoutesNames.RADNICI_PREGLED}>
                            <RiArrowGoBackFill size={15} />
                            Vrati se
                        </Link>
                    </Col>
                </Row>
            </Form>
        </Container>

    );
}