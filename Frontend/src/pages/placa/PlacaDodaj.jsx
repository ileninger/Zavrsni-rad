import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri"
import { RiArrowGoForwardFill } from "react-icons/ri";
import { useEffect, useState } from 'react';

import { RoutesNames } from "../../constants";


import PodaciZaObracuneService from "../../services/PodaciZaObracuneService";
import RadnikService from "../../services/RadnikService";
import ObracunskoRazdobljeService from "../../services/ObracunskoRazdobljeService";


export default function PlacaDodaj() {

    const navigate = useNavigate();

    const [radnici,setRadnici] = useState([]);
    const [radnikSifra, setRadnikSifra] = useState(0);

    const [podacizaobracune,setPodaciZaObracune] = useState([]);
    const [podacizaobracuneSifra, setPodaciZaObracuneSifra] = useState(0);

    const [obracunskorazdoblje,setObracunskoRazdoblje] = useState([]);
    const [obracunskorazdobljeSifra,setObracunskoRazdobljeSifra] = useState(0);

    
  async function dohvatiRadnike(){
    await RadnikService.getRadnici().
      then((odgovor)=>{
        setRadnici(odgovor.data);
        setRadnikSifra(odgovor.data[0].sifra);
      });
  }

  async function dohvatiPodatkeZaObracun(){
    await PodaciZaObracuneService.getPodaciZaObracune().
      then((odgovor)=>{
        setPodaciZaObracune(odgovor.data);
        setPodaciZaObracuneSifra(odgovor.data[0].sifra);
      });
  }

  
  async function dohvatiObracunskaRazdoblja(){
    await ObracunskoRazdobljeService.get().
      then((odgovor)=>{
        setObracunskoRazdoblje(odgovor.data);
        setObracunskoRazdobljeSifra(odgovor.data[0].sifra);
      });
  }

  
  async function ucitaj(){
    await dohvatiRadnike();
    await dohvatiPodatkeZaObracun();
    await dohvatiObracunskaRazdoblja();
  }

  useEffect(()=>{
    ucitaj();
  },[]);










    async function dodaj(e) {
        const odgovor = await Service.dodaj(e)
        if (odgovor.ok) {
            navigate(RoutesNames.PLACA_PREGLED);
        } else {
            console.log(odgovor);
            alert(odgovor.poruka);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const podaci = new FormData(e.target);
        //console.log(podaci.get('naziv'));

        dodaj 
        ({
            naziv:podaci.get('naziv'),
            radnikSifra:parseInt(podaci.get('radnikSifra')),
            podacizaobracunSifra:parseInt(podaci.get('podacizaobracunSifra')),
            placaSifra:parseInt(podaci.get('placaSifra')),
            datumobracuna:datumobracuna,
            brutoI:parseFloat(podaci.get('brutoI')),
            brutoII:parseFloat(podaci.get('brutoII')),
            poreznaosnovicaporezanadohodak:parseFloat(podaci.get('poreznaosnovicaporezanadohodak')),
            osnovniosobniodbitak:parseFloat(podaci.get('osnovniOsobniOdbitak')),
            udiozaprvimirovinskistup:parseFloat(podaci.get('udiozaprvimirovinskistup')),
            udiozadrugimirovinskistup:parseFloat(podaci.get('udiozadrugimirovinskistup')),
            netoiznoszaisplatu:parseFloat(podaci.get('netoiznoszaisplatu')),
        });

        //console.log(JSON.stringify(smjer));
        dodajPodatkeZaObracunOdbitaka(podacizaobracune);

    }
    function oibRadnika(){
        for(let i=0;i<radnici.length;i++){
          const e = radnici[i];
          if(e.sifra==radnikSifra){
            return e.email;
          }
        }
    }
    


    return (
        <Container>
            <Form onSubmit={handleSubmit}>

            <Form.Group controlId="naziv">
                    <Form.Label>Naziv plače</Form.Label>
                    <Form.Control
                        type="text"
                        name="naziv"
                        placeholder='Naziv plače'
                    />
            </Form.Group>
                <Form.Group className='mb-4' controlId='radnik'>
                    <Form.Label>Radnik</Form.Label>
                    <Form.Select multiple={true}
                        onChange={(e) => { setRadnikSifra(e.target.value) }}
                    >
                        {radnici && radnici.map((s, index) => (
                            <option key={index} value={s.sifra}>
                                {s.radnikIme} {s.radnikPrezime}
                            </option>
                        ))}
                    </Form.Select>
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
                            Dodaj nove podatke  za obračun
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}