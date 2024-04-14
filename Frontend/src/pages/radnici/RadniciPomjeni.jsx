import { Button, Col, Container, Form, Row,Image } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri"
import { RiArrowGoForwardFill } from "react-icons/ri";
import { RoutesNames } from "../../constants";
import RadnikService from "../../services/RadnikService";
import { useEffect, useState,useRef } from "react";
import Cropper from 'react-cropper';


import moment from "moment/moment";

export default function RadniciPomjeni() {
    const navigate = useNavigate();
    const routeParams = useParams();
    const [radnik, setRadnici] = useState({});
    const [trenutnaSlika, setTrenutnaSlika] = useState('');
    const [slikaZaCrop, setSlikaZaCrop] = useState('');
    const [slikaZaServer, setSlikaZaServer] = useState('');
    const cropperRef = useRef(null);

    async function dohvatiRadnike() {
        await RadnikService.getBySifra(routeParams.sifra)
            .then((res) => {
                setRadnici(res.data)
            })
            .catch((e) => {
                alert(e.poruka);
            });
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
            datumzaposlenja: podaci.get('datumzaposlenja'),
            iban: podaci.get('iban'),
            cijenaRadnogSata: parseFloat(podaci.get('cijenaRadnogSata')),
            koeficijentRadnogMjesta: parseFloat(podaci.get('koeficijentRadnogMjesta')),
            osnovniOsobniOdbitak: parseFloat(podaci.get('osnovniosobniodbitak')),
            slika: ''
        };

        //console.log(JSON.stringify(smjer));
        promjeniRadnika(radnik);
    }



    function onCrop() {
        setSlikaZaServer(cropperRef.current.cropper.getCroppedCanvas().toDataURL());
    }

    function onChangeImage(e) {
        e.preventDefault();

        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setSlikaZaCrop(reader.result);
        };
        try {
            reader.readAsDataURL(files[0]);
        } catch (error) {
            console.error(error);
        }
    }

    async function spremiSliku() {
        const base64 = slikaZaServer;

        const odgovor = await RadnikService.postaviSliku(routeParams.sifra, { Base64: base64.replace('data:image/png;base64,', '') });
        //Date.now je zbog toga što se src na image komponenti cache-ira
        //pa kad promjenimo sliku url ostane isti i trenutna slika se ne updatea
        setTrenutnaSlika(slikaZaServer);
    }




    return (
        <Container>
            <Row>
                <Col key='1' sm={12} lg={6} md={6}>
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
                            <Form.Label>DatumZaposlenja</Form.Label>
                            <Form.Control
                                type="date"
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
                        <Form.Group controlId="cijenaRadnogSata">
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
                                    Odustani
                                </Link>
                            </Col>
                            <Col>
                                <Button
                                    variant="primary"
                                    type="submit">
                                    <RiArrowGoForwardFill size={15} />
                                    Promjeni radnika
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                    <Row className='mb-4'>
                        <Col key='1' sm={12} lg={6} md={12}>
                            <p className='form-label'>Trenutna slika</p>
                            <Image
                                //za lokalni development
                                //src={'https://edunovawp1.eu/' + trenutnaSlika}
                                src={trenutnaSlika}
                                className='slika'
                            />
                        </Col>
                        <Col key='2' sm={12} lg={6} md={12}>
                            {slikaZaServer && (
                                <>
                                    <p className='form-label'>Nova slika</p>
                                    <Image
                                        src={slikaZaServer || slikaZaCrop}
                                        className='slika'
                                    />
                                </>
                            )}
                        </Col>
                    </Row>
                </Col>
                <Col key='2' sm={12} lg={6} md={6}>
                    <input className='mb-3' type='file' onChange={onChangeImage} />
                    <Button disabled={!slikaZaServer} onClick={spremiSliku}>
                        Spremi sliku
                    </Button>

                    <Cropper
                        src={slikaZaCrop}
                        style={{ height: 400, width: '100%' }}
                        initialAspectRatio={1}
                        guides={true}
                        viewMode={1}
                        minCropBoxWidth={50}
                        minCropBoxHeight={50}
                        cropBoxResizable={false}
                        background={false}
                        responsive={true}
                        checkOrientation={false}
                        cropstart={onCrop}
                        cropend={onCrop}
                        ref={cropperRef}
                    />
                </Col>

            </Row>
        </Container>

    );
}