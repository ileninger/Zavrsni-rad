import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import moment from "moment";



import PodaciZaObracuneService from "../../services/PodaciZaObracuneService";
import RadnikService from "../../services/RadnikService";
import ObracunskoRazdobljeService from "../../services/ObracunskoRazdobljeService";
import { RoutesNames } from '../../constants';
import PlacaService from '../../services/PlacaService';
import { RiArrowGoBackFill } from 'react-icons/ri';



export default function PlacaDetaljnije() {
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


  async function dohvatiPlace() {
    await PlacaService.getBySifra(routeParams.sifra)
      .then((res) => {
        setPlace(res.data)

      })
      .catch((e) => {
        alert(e.poruka);
      });
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
    const odgovor = await PlacaPomjeni.promjeni(routeParams.sifra, placa);
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

    const placa =
    {
      naziv: podaci.get('naziv'),
      placaSifra: parseInt(podaci.get('nazivplace')),
      radnikSifra: parseInt(podaci.get('radnik')),
      podacizaobracunSifra: parseInt(podaci.get('podacizaobracune')),
      //datumobracuna:datumobracuna,
      brutoI: parseFloat(podaci.get('brutoI')),
      dohodak: parseFloat(podaci.get('dohodak')),
      poreznaosnovicaporezanadohodak: parseFloat(podaci.get('poreznaosnovicaporezanadohodak')),
      osnovniosobniodbitak: parseFloat(podaci.get('osnovniOsobniOdbitak')),
      udiozaprvimirovinskistup: parseFloat(podaci.get('udiozaprvimirovinskistup')),
      udiozadrugimirovinskistup: parseFloat(podaci.get('udiozadrugimirovinskistup')),
      iznosporezanadohodak: parseFloat(podaci.get('iznosporezanadohodak')),
      netoiznoszaisplatu: parseFloat(podaci.get('netoiznoszaisplatu')),
    };

    //console.log(JSON.stringify(smjer));
    promjeniRadnika(placa);
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

        <Form.Group controlId="brutoI">
          <Form.Label>Bruto I.</Form.Label>
          <div className="input-group">
            <Form.Control
              type="text"
              name="brutoI"
              defaultValue={placa.brutoI}
            />
            <span className="input-group-text">€</span>
          </div>
        </Form.Group>

        <Form.Group controlId="dohodak">
          <Form.Label>Dohodak</Form.Label>
          <div className="input-group">
            <Form.Control
              type="text"
              name="dohodak"
              defaultValue={placa.dohodak}
            />
            <span className="input-group-text">€</span>
          </div>
        </Form.Group>

        <Form.Group controlId="poreznaosnovicaporezanadohodak">
          <Form.Label>Iznos porezne osnovnice poreza na dohodak</Form.Label>
          <div className="input-group">
            <Form.Control
              type="text"
              name="poreznaosnovicaporezanadohodak"
              defaultValue={placa.poreznaosnovicaporezanadohodak}
            />
            <span className="input-group-text">€</span>
          </div>
        </Form.Group>

        <Form.Group controlId="osnovniOsobniOdbitak">
          <Form.Label>Iznos osnovnog osobnog odbitka </Form.Label>
          <div className="input-group">
            <Form.Control
              type="text"
              name="osnovniOsobniOdbitak"
              defaultValue={placa.osnovniosobniodbitak}
            />
            <span className="input-group-text">€</span>
          </div>
        </Form.Group>

        <Form.Group controlId="udiozaprvimirovinskistup">
          <Form.Label>Iznos koji se iz plače isplačuje za prvi mirovinski stup </Form.Label>
          <div className="input-group">
            <Form.Control
              type="text"
              name="udiozaprvimirovinskistup"
              defaultValue={placa.iznoszaprvimirovinskistup}
            />
            <span className="input-group-text">€</span>
          </div>
        </Form.Group>

        <Form.Group controlId="udiozadrugimirovinskistup">
          <Form.Label>Iznos koji se iz plače isplačuje za drugi mirovinski stup </Form.Label>
          <div className="input-group">
            <Form.Control
              type="text"
              name="udiozadrugimirovinskistup"
              defaultValue={placa.iznoszadrugimirovinskistup}
            />
            <span className="input-group-text">€</span>
          </div>
        </Form.Group>

        <Form.Group controlId="iznosporezanadohodak">
          <Form.Label>Iznos poreza na dohodak </Form.Label>
          <div className="input-group">
            <Form.Control
              type="text"
              name="iznosporezanadohodak"
              defaultValue={placa.iznosporezanadohodak}
            />
            <span className="input-group-text">€</span>
          </div>
        </Form.Group>


        <Form.Group controlId="netoiznoszaisplatu">
          <Form.Label>Iznos koji se isplačuje radniku'</Form.Label>
          <div className="input-group">
            <Form.Control
              type="text"
              name="netoiznoszaisplatu"
              defaultValue={placa.netoiznoszaisplatu}
            />
            <span className="input-group-text">€</span>
          </div>
        </Form.Group>





        <Row>
          <Col>
            <Link
              className="btn btn-danger"
              to={RoutesNames.PLACA_PREGLED}>
              <RiArrowGoBackFill size={15} />
              Vrati se
            </Link>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
