import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri"
import { RiArrowGoForwardFill } from "react-icons/ri";
import { useEffect, useState } from "react";

import { RoutesNames } from "../../constants";
import PodaciZaObracuneService from "../../services/PodaciZaObracuneService";


export default function PodaciZaObracunePromjeni() {
    const navigate = useNavigate();
    const routeParams = useParams();
    const [podacizaobracune,setPodaciZaObracun] = useState({});

    async function dohvatiPodatkeZaObracun(){
        await PodaciZaObracuneService.getBySifra(routeParams.sifra)
        .then((res)=>{
            setPodaciZaObracun(res.data)
        })
        .catch((e)=>{
            alert(e.poruka);
        });
    }

    useEffect(()=>{
        //console.log("useEffect")
        dohvatiPodatkeZaObracun();
    },[]);

    async function promjeniPodatkeZaObracun(podacizaobracune){
        const odgovor = await PodaciZaObracuneService.promjeni(routeParams.sifra,podacizaobracune);
        if(odgovor.ok){
          navigate(RoutesNames.PODACIZAOBRACUNE_PREGLED);
        }else{
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
        promjeniPodatkeZaObracun(podacizaobracune);

    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="osnovniOsobniOdbitak">
                    <Form.Label>Osnovni osobni odbitak</Form.Label>
                    <Form.Control
                        type="text"
                        defaultValue={podacizaobracune.osnovniOsobniOdbitak}
                        name="osnovniOsobniOdbitak"
                    />
                </Form.Group>
                <Form.Group controlId="postotakZaPrviMirovinskiStup">
                    <Form.Label>Postotak za prvi mirovinski stup </Form.Label>
                    <Form.Control
                        type="text"
                        name="postotakZaPrviMirovinskiStup"
                        defaultValue={podacizaobracune.postotakZaPrviMirovinskiStup}

                    />
                </Form.Group>
                <Form.Group controlId="postotakZaDrugiMirovinskiStup">
                    <Form.Label>Postotak za drugi mirovinski stup </Form.Label>
                    <Form.Control
                        type="text"
                        name="postotakZaDrugiMirovinskiStup"
                        defaultValue={podacizaobracune.postotakZaDrugiMirovinskiStup}
                    />
                </Form.Group>
                <Form.Group controlId="stopaPorezaNaDohodak">
                    <Form.Label>Stopa poreza na dohodak </Form.Label>
                    <Form.Control
                        type="text"
                        name="stopaPorezaNaDohodak"
                        defaultValue={podacizaobracune.postotakZaDrugiMirovinskiStup}
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
                            Promjeni podatke  za obračun
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}