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
import PlacaService from "../../services/PlacaService";


export default function PlacaPregled (){

    const [place,setPlace] = useState ();
    const navigate = useNavigate();

    async function dohvatiPlace (){
        await PlacaService.get()
        .then((res)=>{
            setPlace(res.data);
        })
        .catch((e)=>{
            alert(e);
        });
    } 

    async function obrisi(sifra){
        const odgovor = await PlacaService.obrisi(sifra);
        if (odgovor.ok){
            alert(odgovor.poruka.data.poruka)
            dohvatiPlace();
        }

    }

    useEffect(()=>{
        dohvatiPlace();
    },[]);

    return (
        <Container>

                    <Link to={RoutesNames.RADNICI_DODAJ} className="btn gumb">
                    <FaAddressCard 
                        size='30'
                        className="lijevo"
                    />
                        Dodaj novog ranika
                    </Link>
        
            <Table striped bordered hover responsive className="table">
                <thead>
                    <tr>
                        <th>Naziv Plače</th>
                        <th>Ime radnika</th>
                        <th className="sredina">Prezime radnika</th>
                        <th className="sredina">Detaljnije</th>
                        <th className="sredina">Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {place && place.map((placa,index)=>(
                        <tr key={index}>
                            <td className="lijevo">{placa.naziv}</td>
                            <td className="lijevo">{placa.placaBrojRadnihSati}</td>
                            <td className="sredina">
                                <Button
                                    variant="normal"
                                    onClick={()=>{navigate(`/placa/${placa.sifra}`)}}>
                                    <BiSolidUserDetail  
                                     color="blue"
                                    
                                    size={25} />
                                    Detaljnije
                                </Button>
                            </td> 

                            <td className="sredina">
                                <Button
                                    variant="normal"
                                    onClick={()=>{navigate(`/radnici/${radnik.sifra}`)}}>
                                    <FaUserEdit 
                                     color="blue"
                                    
                                    size={25} />
                                </Button>
                                     &nbsp;&nbsp;&nbsp;
                                <Button
                                    variant="normal"
                                    onClick={()=>obrisiRadnika(radnik.sifra)}
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