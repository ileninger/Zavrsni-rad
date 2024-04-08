import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri"
import { RiArrowGoForwardFill } from "react-icons/ri";
import { useEffect, useState } from "react";

import { RoutesNames } from "../../constants";
import ObracunskoRazdobljeService from "../../services/ObracunskoRazdobljeService";


export default function ObracunskoRazdobljePromjeni() {
    const navigate = useNavigate();
    const routeParams = useParams();
    const [obracunskorazdoblje,setObracunskoRazdoblje] = useState({});

    async function dohvatiObracunskoRazdoblje(){
        await ObracunskoRazdobljeService.getBySifra(routeParams.sifra)
        .then((res)=>{
            setObracunskoRazdoblje(res.data)
        })
        .catch((e)=>{
            alert(e.poruka);
        });
    }

    useEffect(()=>{
        //console.log("useEffect")
        dohvatiObracunskoRazdoblje();
    },[]);

    async function promjeniObracunskoRazdoblje(obracunskorazdoblje){
        const odgovor = await ObracunskoRazdobljeService.promjeni(routeParams.sifra,obracunskorazdoblje);
        if(odgovor.ok){
          navigate(RoutesNames.OBRACUNSKORAZDOBLJE_PREGLED);
        }else{
          console.log(odgovor);
          alert(odgovor.poruka);
        }
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
        promjeniObracunskoRazdoblje(obracunskorazdoblje);

    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>

                
            <Form.Group controlId="nazivplace">
                    <Form.Label>Naziv obračunskog razdoblja</Form.Label>
                    <Form.Control
                        type="text"
                        defaultValue={obracunskorazdoblje.nazivplace}
                        name="nazivplace"
                    />
                </Form.Group>

                <Form.Group controlId="brojradnihsati">
                    <Form.Label>Broj radnih sati</Form.Label>
                    <Form.Control
                        type="text"
                        defaultValue={obracunskorazdoblje.brojradnihsati}
                        name="brojradnihsati"
                    />
                </Form.Group>

                <Form.Group controlId="datumpocetkaplace">
                    <Form.Label>Datum početka obračunskog razdoblja </Form.Label>
                    <Form.Control
                        type="text"
                        name="datumpocetkaplace"
                        defaultValue={obracunskorazdoblje.datumpocetkaplace}

                    />
                </Form.Group>
                <Form.Group controlId="datumkrajaplace">
                    <Form.Label>Datum kraja obračunskog razdoblja </Form.Label>
                    <Form.Control
                        type="text"
                        name="datumkrajaplace"
                        defaultValue={obracunskorazdoblje.datumkrajaplace}
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
                            Promjeni podatke  o obračunskom razdoblju
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}