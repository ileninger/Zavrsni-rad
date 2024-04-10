import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import moment from "moment";


		
import PodaciZaObracuneService from "../../services/PodaciZaObracuneService";
import RadnikService from "../../services/RadnikService";
import ObracunskoRazdobljeService from "../../services/ObracunskoRazdobljeService";
import { RoutesNames } from '../../constants';



export default function PlacaDodaj() {
  const navigate = useNavigate();

  const [radnici, setRadnici] = useState([]);
  const [radnikSifra, setRadnikSifra] = useState(0);

  const [obracunskoRazdoblje, setObracunskoRazdoblje] = useState([]);
  const [obracunskoRazdobljeSifra, setObracunskoRazdobljeSifra] = useState(0);

  const [podacizaobracun, setPodaciZaObracun] = useState([]);
  const [podacizaobracunSifra, setPodaciZaObracunSifra] = useState(0);

  async function dohvatiRadnike(){
    await RadnikService.getRadnici().
      then((odgovor)=>{
        setRadnici(odgovor.data);
        setRadnikSifra(odgovor.data[0].sifra);
      });
  }

  async function dohvatiObracunskoRazdoblje(){
    await ObracunskoRazdobljeService.get().
      then((o)=>{
        setObracunskoRazdoblje(o.data);
        setObracunskoRazdobljeSifra(o.data[0].sifra);
      });
  }

  async function dohvatiPodatkeZaObracun(){
    await ObracunskoRazdobljeService.get().
      then((p)=>{
        setPodaciZaObracun(p.data);
        setPodaciZaObracunSifra(o.data[0].sifra);
      });
  }

  async function ucitaj(){
    await dohvatiRadnike();
    //await dohvatiObracunskoRazdoblje();
    //await dohvatiPodatkeZaObracun();
  }

  useEffect(()=>{
    ucitaj();
  },[]);

  async function dodaj(e) {
    //console.log(e);

    const odgovor = await Service.dodaj(e);
    if (odgovor.ok) {
      navigate(RoutesNames.PLACA_PREGLED);
    } else {
      alert(odgovor.poruka.errors);
    }
    
  }

  function handleSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);

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

    dodaj({
        naziv:podaci.get('naziv'),
        radnikSifra:parseInt(podaci.get('radnikSifra')),
        podacizaobracunSifra:parseInt(podaci.get('podacizaobracunSifra')),
        placaSifra:parseInt(podaci.get('placaSifra')),
        //datumobracuna:datumobracuna,
        brutoI:parseFloat(podaci.get('brutoI')),
        brutoII:parseFloat(podaci.get('brutoII')),
        poreznaosnovicaporezanadohodak:parseFloat(podaci.get('poreznaosnovicaporezanadohodak')),
        osnovniosobniodbitak:parseFloat(podaci.get('osnovniOsobniOdbitak')),
        udiozaprvimirovinskistup:parseFloat(podaci.get('udiozaprvimirovinskistup')),
        udiozadrugimirovinskistup:parseFloat(podaci.get('udiozadrugimirovinskistup')),
        netoiznoszaisplatu:parseFloat(podaci.get('netoiznoszaisplatu')),
    });
  }


  return (
    <Container className='mt-4'>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='naziv'>
          <Form.Label>Naziv</Form.Label>
          <Form.Control
            type='text'
            name='naziv'
            placeholder='Naziv plače'
            maxLength={255}
          />
        </Form.Group>

        {/* <Form.Group className='mb-3' controlId='datum'>
          <Form.Label>Datum</Form.Label>
          <Form.Control
            type='date'
            name='datum'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='vrijeme'>
          <Form.Label>Vrijeme</Form.Label>
          <Form.Control
            type='time'
            name='vrijeme'
          />
        </Form.Group> */}

        {/* <Form.Group className='mb-3' controlId='smjer'>
          <Form.Label>Smjer</Form.Label>
          <Form.Select multiple={true}
          onChange={(e)=>{setSmjerSifra(e.target.value)}}
          >
          {smjerovi && smjerovi.map((s,index)=>(
            <option key={index} value={s.sifra}>
              {s.naziv}
            </option>
          ))}
          </Form.Select>
        </Form.Group> */}
<Form.Group className='mb-3' controlId='radnik'>
  <Form.Label>Radnik</Form.Label>
  <Form.Select onChange={(e) => { setRadnikSifra(e.target.value) }}>
    {radnici && radnici.map((radnik, index) => (
      <option key={index} value={radnik.sifra}>
        {radnik.ime} {radnik.prezime}
      </option>
    ))}
  </Form.Select>
  
</Form.Group>


      
       

        <Row>
          <Col>
            <Link className='btn btn-danger gumb' to={RoutesNames.PLACA_PREGLED}>
              Odustani
            </Link>
          </Col>
          <Col>
            <Button variant='primary' className='gumb' type='submit'>
              Dodaj Grupu
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
