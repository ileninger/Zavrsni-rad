import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import RadnikService from "../../services/RadnikService";
import { NumericFormat } from "react-number-format";
import { Link,useNavigate } from "react-router-dom";
import { FaAddressCard, FaSearch } from "react-icons/fa";
//import { FaEdit } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { FaUserMinus } from "react-icons/fa6";

import { RoutesNames } from "../../constants";
import moment from "moment/moment";
import PodaciZaObracuneService from "../../services/PodaciZaObracuneService";
import useLoading from "../../hooks/useLoading";

export default function PodaciZaObracunePregled (){

    const [podacizaobracune,setPodaciZaObracune] = useState ();
    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();

    async function dohvatiPodatkeZaObracun (){
        showLoading();
        await PodaciZaObracuneService.getPodaciZaObracune()
        .then((res)=>{
            setPodaciZaObracune(res.data);
        })
        .catch((e)=>{
            alert(e);
        });
    } 

    async function obrisiPodatkeZaObracun(sifra){

        const odgovor = await PodaciZaObracuneService.obrisiPodatkeZaObracune(sifra);
        if (odgovor.ok){
            alert(odgovor.poruka.data.poruka)
            dohvatiPodatkeZaObracun();
        }

    }

    useEffect(()=>{
        dohvatiPodatkeZaObracun();
    },[]);

    return (
        <Container>
 
                    <Link to={RoutesNames.PODACIZAOBRACUNE_DODAJ} className="btn gumb">
                    <FaAddressCard 
                        size='30'
                        className="lijevo"
                    />
                        Dodaj nove podatke za proračun odbitaka
                    </Link>
        
            <Table striped bordered hover responsive className="table">
                <thead>
                    <tr>

                        <th className="sredina">Naziv podataka za obracun odbitaka</th>
                        <th className="sredina">Osnovni osobni odbitak</th>
                        <th className="sredina">Udio za prvi mirovinski stup</th>
                        <th className="sredina">Udio za drugi mirovinski stup</th>
                        <th className="sredina">Stopa poreza na dohodak</th>
                        <th className="sredina">Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {podacizaobracune && podacizaobracune.map((podacizaobracune,index)=>(
                        <tr key={index}>

                            <td className="sredina">{podacizaobracune.naziv}</td>

                            <td className={podacizaobracune.osnovniosobniodbitak==null ? 'sredina' : 'sredina'}>
                                {podacizaobracune.osnovniosobniodbitak==null 
                                ? 'Nije definirano'
                                :
                                    <NumericFormat 
                                    value={podacizaobracune.osnovniosobniodbitak}
                                    displayType={'text'}
                                    thousandSeparator='.'
                                    decimalSeparator=','
                                    prefix={'€'}
                                    decimalScale={2}
                                    fixedDecimalScale
                                    />
                                } 
                            </td>
                            <td className={podacizaobracune.postotakzaprvimirovinskistup==null ? 'sredina' : 'sredina'}>
                                {podacizaobracune.postotakzaprvimirovinskistup==null 
                                ? 'Nije definirano'
                                :
                                    <NumericFormat 
                                    value={podacizaobracune.postotakzaprvimirovinskistup}
                                    displayType={'text'}
                                    thousandSeparator='.'
                                    decimalSeparator=','
                                    suffix={'%'}
                                    decimalScale={2}
                                    fixedDecimalScale
                                    />
                                } 
                            </td>
                            <td className={podacizaobracune.postotakzadrugimirovinskistup==null ? 'sredina' : 'sredina'}>
                                {podacizaobracune.postotakzadrugimirovinskistup==null 
                                ? 'Nije definirano'
                                :
                                    <NumericFormat 
                                    value={podacizaobracune.postotakzadrugimirovinskistup}
                                    displayType={'text'}
                                    thousandSeparator='.'
                                    decimalSeparator=','
                                    suffix={'%'}
                                    decimalScale={2}
                                    fixedDecimalScale
                                    />
                                } 
                            </td>
                            <td className={podacizaobracune.stopaporezanadohodak==null ? 'sredina' : 'sredina'}>
                                {podacizaobracune.stopaporezanadohodak==null 
                                ? 'Nije definirano'
                                :
                                    <NumericFormat 
                                    value={podacizaobracune.stopaporezanadohodak}
                                    displayType={'text'}
                                    thousandSeparator='.'
                                    decimalSeparator=','
                                    suffix={'%'}
                                    decimalScale={2}
                                    fixedDecimalScale
                                    />
                                } 
                            </td>
                            
                            <td className="sredina">
                                <Button
                                    variant="normal"
                                    onClick={()=>{navigate(`/podaciZaObracune/${podacizaobracune.sifra}`)}}
                                    >
                                    <FaUserEdit 
                                     color="blue"
                                    
                                    size={25} />
                                </Button>
                                     &nbsp;&nbsp;&nbsp;
                                <Button
                                    variant="normal"
                                    onClick={()=>obrisiPodatkeZaObracun(podacizaobracune.sifra)}
                                >
       
                                    <FaUserMinus 
                                    size={25}
                                    color="red" 
                                    />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}