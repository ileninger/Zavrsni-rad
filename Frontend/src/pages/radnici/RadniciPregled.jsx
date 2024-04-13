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
import useLoading from "../../hooks/useLoading";


export default function RadniciPregled (){

    const [radnici,setRadnici] = useState ();
    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();

    async function dohvatiRadnike (){
        showLoading();
        await RadnikService.getRadnici()
        .then((res)=>{
            setRadnici(res.data);
        })
        .catch((e)=>{
            alert(e);
        });
    } 

    async function obrisiRadnika(sifra){
        const odgovor = await RadnikService.obrisiRadnika(sifra);
        showLoading();  
        if (odgovor.ok){
            alert(odgovor.poruka.data.poruka)
            dohvatiRadnike();
        }

    }

    useEffect(()=>{
        dohvatiRadnike();
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
                        <th>Ime</th>
                        <th>Prezime</th>
                        <th className="sredina">OiB</th>
                        <th className="sredina">Detaljnije</th>
                        <th className="sredina">Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {radnici && radnici.map((radnik,index)=>(
                        <tr key={index}>
                            <td className="lijevo">{radnik.ime}</td>
                            <td className="lijevo">{radnik.prezime}</td>
                            <td className="sredina">{radnik.oib}</td>
                            <td className="sredina">
                                <Button
                                    variant="normal"
                                    onClick={()=>{navigate(`/radnici/${radnik.sifra}`)}}>
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