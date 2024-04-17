import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import useLoading from "../../hooks/useLoading";



import PodaciZaObracuneService from "../../services/PodaciZaObracuneService";
import RadnikService from "../../services/RadnikService";
import ObracunskoRazdobljeService from "../../services/ObracunskoRazdobljeService";
import { RoutesNames } from '../../constants';
import PlacaService from '../../services/PlacaService';
import { RiArrowGoBackFill, RiArrowGoForwardFill } from 'react-icons/ri';



export default function PlacaPomjeni() {
  const navigate = useNavigate();
  const routeParams = useParams();

  const [placa, setPlace] = useState([]);

  const [radnici, setRadnici] = useState([]);
  const [radnikSifra, setRadnikSifra] = useState(0);

  const [obracunskaRazdoblja, setObracunskaRazdoblja] = useState([]);
  const [obracunskaRazdobljaSifra, setObracunskaRazdobljaSifra] = useState(0);

  const [podacizaobracune, setPodaciZaObracune] = useState([]);
  const [podacizaobracuneSifra, setPodaciZaObracuneSifra] = useState(0);

  const typeaheadRef = useRef(null);

  const { showLoading, hideLoading } = useLoading();


  async function dohvatiPlace() {
    showLoading();
    await PlacaService.getBySifra(routeParams.sifra)
      .then((res) => {
        setPlace(res.data)

      })
      .catch((e) => {
        alert(e.poruka);
      });
      hideLoading();
  }

  async function dohvatiRadnike() {
    await RadnikService.getRadnici().
      then((odgovor) => {
        setRadnici(odgovor.data);
        setRadnikSifra(odgovor.data[0].sifra);
      });
  }

  async function dohvatiObracunskoRazdoblje() {
    await ObracunskoRazdobljeService.get().
      then((o) => {
        setObracunskaRazdoblja(o.data);
        setObracunskaRazdobljaSifra(o.data[0].sifra);
        console.log(obracunskaRazdoblja)
      });
  }

  async function dohvatiPodatkeZaObracun() {
    await PodaciZaObracuneService.getPodaciZaObracune().
      then((p) => {
        setPodaciZaObracune(p.data);
        setPodaciZaObracuneSifra(p.data[0].sifra);
      });
  }

  async function dohvatiInicijalnePodatke() {
    await dohvatiPlace();
    await dohvatiRadnike();
    await dohvatiObracunskoRazdoblje();
    await dohvatiPodatkeZaObracun();
  }

  useEffect(() => {
    //console.log("useEffect")
    dohvatiInicijalnePodatke();
  }, []);

  async function promjeniPlacu(placa) {
    showLoading();
    const odgovor = await PlacaService.promjeni(routeParams.sifra, placa);
    if (odgovor.ok) {
      navigate(RoutesNames.PLACA_PREGLED);
    } else {
      console.log(odgovor);
      alert(odgovor.poruka);
    }
    hideLoading();
  }

  function handleSubmit(e) {
    e.preventDefault();
    const podaci = new FormData(e.target);

    const placa =
    {
      naziv: podaci.get('naziv'),
      placaSifra: parseInt(podaci.get('nazivplace')),
      radnikSifra: parseInt(podaci.get('radnik')),
      podacizaobracunSifra: parseInt(podaci.get('podacizaobracune')),
      // brutoI: parseFloat(podaci.get('brutoI')),
      // dohodak: parseFloat(podaci.get('dohodak')),
      // poreznaosnovicaporezanadohodak: parseFloat(podaci.get('poreznaosnovicaporezanadohodak')),
      // osnovniosobniodbitak: parseFloat(podaci.get('osnovniOsobniOdbitak')),
      // udiozaprvimirovinskistup: parseFloat(podaci.get('udiozaprvimirovinskistup')),
      // udiozadrugimirovinskistup: parseFloat(podaci.get('udiozadrugimirovinskistup')),
      // iznosporezanadohodak: parseFloat(podaci.get('iznosporezanadohodak')),
      // netoiznoszaisplatu: parseFloat(podaci.get('netoiznoszaisplatu')),
    };

    //console.log(JSON.stringify(smjer));
    promjeniPlacu(placa);
  }



  return (
    <Container className='mt-4'>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="naziv">
          <Form.Label>Naziv</Form.Label>
          <Form.Control
            type="text"
            name="naziv"
            defaultValue={placa.naziv}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='nazivplace'>
          <Form.Label>Obračunsko razdoblje</Form.Label>
          <Form.Select name='nazivplace' onChange={(e) => { setObracunskaRazdobljaSifra(e.target.value) }}>
            {obracunskaRazdoblja && obracunskaRazdoblja.map((placa, index) => (
              <option key={index} value={placa.sifra}>
                {placa.nazivplace}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
       
        <Form.Group className='mb-3' controlId='radnik'>
          <Form.Label>Radnik</Form.Label>
          <Form.Select name='radnik' onChange={(e) => { setRadnikSifra(e.target.value) }}>
            {radnici && radnici.map((radnik, index) => (
              <option key={index} value={radnik.sifra}>
                {radnik.ime} {radnik.prezime}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className='mb-3' controlId='podacizaobracune'>
          <Form.Label>Podaci za obračun odbitaka</Form.Label>
          <Form.Select name='podacizaobracune' onChange={(e) => { setPodaciZaObracuneSifra(e.target.value) }}>
            {podacizaobracune && podacizaobracune.map((podaciZaObracun, index) => (
              <option key={index} value={podaciZaObracun.sifra}>
                {podaciZaObracun.naziv}
              </option>
            ))}
          </Form.Select>
        </Form.Group>





        <Row>
          <Col>
            <Link
              className="btn btn-danger"
              to={RoutesNames.PLACA_PREGLED}>
              <RiArrowGoBackFill size={15} />
              Odustani
            </Link>
          </Col>
          <Col>
            <Button
              variant="primary"
              type="submit">
              <RiArrowGoForwardFill size={15} />
              Promjeni plaću
          </Button>
        </Col>
      </Row>
    </Form>
    </Container >
  );
}
