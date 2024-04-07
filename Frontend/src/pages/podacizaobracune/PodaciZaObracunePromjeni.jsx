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
            naziv:podaci.get('naziv'),
            osnovniOsobniOdbitak: parseFloat(podaci.get('osnovniosobniodbitak')),
            postotakZaPrviMirovinskiStup: parseFloat(podaci.get('postotakzaprvimirovinskistup')),
            postotakZaDrugiMirovinskiStup: parseFloat(podaci.get('postotakzadrugimirovinskistup')),
            stopaPorezaNaDohodak: parseFloat(podaci.get('stopaporezanadohodak')),
        };

        //console.log(JSON.stringify(smjer));
        promjeniPodatkeZaObracun(podacizaobracune);

    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>

                
            <Form.Group controlId="naziv">
                    <Form.Label>Naziv podataka za obracun odbitaka</Form.Label>
                    <Form.Control
                        type="text"
                        defaultValue={podacizaobracune.naziv}
                        name="naziv"
                    />
                </Form.Group>

                <Form.Group controlId="osnovniosobniodbitak">
                    <Form.Label>Osnovni osobni odbitak</Form.Label>
                    <Form.Control
                        type="text"
                        defaultValue={podacizaobracune.osnovniosobniodbitak}
                        name="osnovniosobniodbitak"
                    />
                </Form.Group>

                <Form.Group controlId="postotakzaprvimirovinskistup">
                    <Form.Label>Postotak za prvi mirovinski stup </Form.Label>
                    <Form.Control
                        type="text"
                        name="postotakzaprvimirovinskistup"
                        defaultValue={podacizaobracune.postotakzaprvimirovinskistup}

                    />
                </Form.Group>
                <Form.Group controlId="postotakzadrugimirovinskistup">
                    <Form.Label>Postotak za drugi mirovinski stup </Form.Label>
                    <Form.Control
                        type="text"
                        name="postotakzadrugimirovinskistup"
                        defaultValue={podacizaobracune.postotakzadrugimirovinskistup}
                    />
                </Form.Group>
                <Form.Group controlId="stopaporezanadohodak">
                    <Form.Label>Stopa poreza na dohodak </Form.Label>
                    <Form.Control
                        type="text"
                        name="stopaporezanadohodak"
                        defaultValue={podacizaobracune.stopaporezanadohodak}
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