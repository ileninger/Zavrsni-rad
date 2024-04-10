import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import moment from "moment";



import PodaciZaObracuneService from "../../services/PodaciZaObracuneService";
import RadnikService from "../../services/RadnikService";
import ObracunskoRazdobljeService from "../../services/ObracunskoRazdobljeService";
import { RoutesNames } from '../../constants';
import PlacaService from '../../services/PlacaService';



export default function PlacaDodaj() {
  const navigate = useNavigate();

  const [radnici, setRadnici] = useState([]);
  const [radnikSifra, setRadnikSifra] = useState(0);

  const [obracunskaRazdoblja, setObracunskaRazdoblja] = useState([]);
  const [obracunskaRazdobljaSifra, setObracunskaRazdobljaSifra] = useState(0);

  const [podacizaobracune, setPodaciZaObracune] = useState([]);
  const [podacizaobracuneSifra, setPodaciZaObracuneSifra] = useState(0);

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

  async function ucitaj() {
    await dohvatiRadnike();
    await dohvatiObracunskoRazdoblje();
    await dohvatiPodatkeZaObracun();
  }

  useEffect(() => {
    ucitaj();
  }, []);

  async function dodaj(e) {
    console.log(e);

    const odgovor = await PlacaService.dodaj(e);
    if (odgovor.ok) {
      navigate(RoutesNames.PLACA_PREGLED);
      } else {
      alert(odgovor.poruka.errors);
    }

  }

  function handleSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);

    console.log(e.target.value)

    //console.log(podaci.get('datum'));
    //console.log(podaci.get('vrijeme'));

    // if(podaci.get('datum')=='' && podaci.get('vrijeme')!=''){
    //   alert('Ako postavljate vrijeme morate i datum');
    //   return;
    // }
    // let datumpocetka='';
    // if(podaci.get('datum')!='' && podaci.get('vrijeme')==''){
    //   datumpocetka = podaci.get('datum') + 'T00:00:00.000Z';
    // }else{
    //   datumpocetka = podaci.get('datum') + 'T' + podaci.get('vrijeme') + ':00.000Z';
    // }




    //console.log(datumpocetka);

    dodaj({sifra:1,
      naziv: podaci.get('naziv'),
      placaSifra: parseInt(podaci.get('nazivplace')),
      radnikSifra: parseInt(podaci.get('radnik')),
      podacizaobracunSifra: parseInt(podaci.get('podacizaobracune')),
      //datumobracuna:datumobracuna,
      brutoI: parseFloat(podaci.get('brutoI')),
      brutoII: parseFloat(podaci.get('brutoII')),
      poreznaosnovicaporezanadohodak: parseFloat(podaci.get('poreznaosnovicaporezanadohodak')),
      osnovniosobniodbitak: parseFloat(podaci.get('osnovniOsobniOdbitak')),
      udiozaprvimirovinskistup: parseFloat(podaci.get('udiozaprvimirovinskistup')),
      udiozadrugimirovinskistup: parseFloat(podaci.get('udiozadrugimirovinskistup')),
      netoiznoszaisplatu: parseFloat(podaci.get('netoiznoszaisplatu')),
    });
  }


  return (
    <Container className='mt-4'>
      <Form onSubmit={handleSubmit}>
      <Form.Group controlId="naziv">
          <Form.Label>Naziv</Form.Label>
          <Form.Control
            type="text"
            name="naziv"
            placeholder='naziv'
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

        <Form.Group controlId="brutoI">
          <Form.Label>Bruto I.</Form.Label>
          <Form.Control
            type="text"
            name="brutoI"
            placeholder='Bruto I.'
          />
        </Form.Group>
        
        <Form.Group controlId="brutoII">
          <Form.Label>Bruto II.</Form.Label>
          <Form.Control
            type="text"
            name="brutoII"
            placeholder='Bruto II.'
          />
        </Form.Group>
        <Form.Group controlId="poreznaosnovicaporezanadohodak">
          <Form.Label>Iznos porezne osnovnice poreza na dohodak</Form.Label>
          <Form.Control
            type="text"
            name="poreznaosnovicaporezanadohodak"
            placeholder='Iznos porezne osnovnice poreza na dohodak'
          />
        </Form.Group>

        <Form.Group controlId="osnovniOsobniOdbitak">
          <Form.Label>Iznos osnovnog osobnog odbitka </Form.Label>
          <Form.Control
            type="text"
            name="osnovniOsobniOdbitak"
            placeholder='Iznos osnovnog osobnog odbitka'
          />
        </Form.Group>

        <Form.Group controlId="udiozaprvimirovinskistup">
          <Form.Label>Iznos koji se iz plače isplačuje za prvi mirovinski stup </Form.Label>
          <Form.Control
            type="text"
            name="udiozaprvimirovinskistup"
            placeholder='Iznos za prvi mirovinski stup'
          />
        </Form.Group>

        <Form.Group controlId="udiozadrugimirovinskistup">
          <Form.Label>Iznos koji se iz plače isplačuje za drugi mirovinski stup </Form.Label>
          <Form.Control
            type="text"
            name="udiozadrugimirovinskistup"
            placeholder='Iznos za drugi mirovinski stup'
          />
        </Form.Group>

        <Form.Group controlId="netoiznoszaisplatu">
          <Form.Label>Iznos koji se isplačuje radniku'</Form.Label>
          <Form.Control
            type="text"
            name="netoiznoszaisplatu"
            placeholder='Iznos koji se isplačuje radniku'
          />
        </Form.Group>








        <Row>
          <Col>
            <Link className='btn btn-danger gumb' to={RoutesNames.PLACA_PREGLED}>
              Odustani
            </Link>
          </Col>
          <Col>
            <Button variant='primary' className='gumb' type='submit'>
              Dodaj Plaču
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
