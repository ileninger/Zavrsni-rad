import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import RadnikService from "../../services/RadnikService";
import { NumericFormat } from "react-number-format";
import { Link,useNavigate } from "react-router-dom";
import { FaAddressCard, FaSearch } from "react-icons/fa";
//import { FaEdit } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { FaUserMinus } from "react-icons/fa6";
import { BiSolidUserDetail } from "react-icons/bi";

import { RoutesNames } from "../../constants";
import moment from "moment/moment";
import PlacaService from "../../services/ObracunskoRazdobljeService";
import ObračunskoRazdobljeService from "../../services/ObracunskoRazdobljeService";


export default function ObracunskoRazdobljePregled (){

    const [obracunskorazdoblje,setObracunskoRazdoblje] = useState ();
    const navigate = useNavigate();

    async function dohvatiObracunskoRazdoblje (){
        await ObračunskoRazdobljeService.get()
        .then((res)=>{
            setObracunskoRazdoblje(res.data);
        })
        .catch((e)=>{
            alert(e);
        });
    } 

    async function obrisi(sifra){
        const odgovor = await ObračunskoRazdobljeService.obrisi(sifra);
        if (odgovor.ok){
            alert(odgovor.poruka.data.poruka)
            dohvatiObracunskoRazdoblje();
        }

    }

    useEffect(()=>{
        dohvatiObracunskoRazdoblje();
    },[]);

    return (
        <Container>

                    {/* <Link to={RoutesNames.RADNICI_DODAJ} className="btn gumb">
                    <FaAddressCard 
                        size='30'
                        className="lijevo"
                    />
                        Dodaj novog ranika
                    </Link>
         */}
            <Table striped bordered hover responsive className="table">
                <thead>
                    <tr>
                        <th>Naziv Plaće</th>
                        <th>Početak obračunskog razdoblja</th>
                        <th className="sredina">Kraj obračunskog razdoblja</th>
                        <th className="sredina">Broj radnih sati </th>
                        <th className="sredina">Akcija</th>
                    </tr>
                </thead>


                <tbody>
                    {obracunskorazdoblje && obracunskorazdoblje.map((obracunskorazdoblje,index)=>(
                        <tr key={index}>
                            <td className="sredina">{obracunskorazdoblje.nazivplace}</td>

                            <td className="sredina">
                                {
                                    obracunskorazdoblje.datumpocetkaplace = null?'Nije uneseno':
                                    moment.utc(obracunskorazdoblje.datumpocetkaplace).format('DD.MM.YYYY')
                                }
                            </td>
                            <td className="sredina">
                                {
                                    obracunskorazdoblje.datumkrajaplace = null?'Nije uneseno':
                                    moment.utc(obracunskorazdoblje.datumkrajaplace).format('DD.MM.YYYY')
                                }
                            </td>
                            <td className="sredina">{obracunskorazdoblje.brojradnihsati}</td>

                        
                            <td className="sredina">
                                <Button
                                    variant="normal"
                                    onClick={()=>{navigate(`/obracunskorazdoblje/${obracunskorazdoblje.sifra}`)}}>
                                    <FaUserEdit 
                                     color="blue"
                                    
                                    size={25} />
                                </Button>
                                     &nbsp;&nbsp;&nbsp;
                                <Button
                                    variant="normal"
                                    onClick={()=>obrisi(obracunskorazdoblje.sifra)}
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