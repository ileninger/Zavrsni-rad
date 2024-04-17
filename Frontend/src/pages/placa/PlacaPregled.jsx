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
import { AxiosError, isAxiosError } from "axios";

import { GrMoney } from "react-icons/gr";
import { BsDatabaseFillExclamation } from "react-icons/bs";
import { BsDatabaseFillDash } from "react-icons/bs";
import { BsDatabaseFillGear } from "react-icons/bs";
import useLoading from "../../hooks/useLoading";


export default function PlacaPregled (){

    const [place,setPlace] = useState ();
    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();

    async function dohvatiPlace (){
        showLoading();
        await PlacaService.get()
        .then((res)=>{
                setPlace(res.data);
        })
        .catch((e)=>{
            console.log(e.response)
             if ((e.status != undefined))
                 alert(e);
        });
        hideLoading();
    } 

    async function obrisi(sifra){
        showLoading(); 
        const odgovor = await PlacaService.obrisi(sifra);
        if (odgovor.ok){
            dohvatiPlace();
        }
        hideLoading();

    }

    useEffect(()=>{
        dohvatiPlace();
    },[]);

    return (
        <Container>

                    <Link to={RoutesNames.PLACA_DODAJ} className="btn gumb">
                    <GrMoney  
                        size='30'
                        className="lijevo"
                    />
                         Dodaj novu plaću
                    </Link>
        
            <Table striped bordered hover responsive className="table">
                <thead>
                    <tr>
                        <th>Naziv Plaće</th>
                        <th className="sredina">Broj radnih sati</th>
                        <th className="sredina"></th>
                        <th className="sredina">Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {place && place.map((placa,index)=>(
                        <tr key={index}>
                            <td className="sredina">{placa.naziv}</td>
                            <td className="sredina">{placa.placaBrojRadnihSati}</td>
                            <td className="sredina">
                                <Button
                                    variant="normal"
                                    onClick={()=>{navigate(`/placa/deteljnije/${placa.sifra}`)}}>
                                    <BsDatabaseFillExclamation   
                                     color="blue"
                                    
                                    size={25} />
                                    Detaljnije
                                </Button>
                            </td> 

                            <td className="sredina">
                                <Button
                                    variant="normal"
                                    onClick={()=>{navigate(`/placa/${placa.sifra}`)}}>
                                    <BsDatabaseFillGear 
                                     color="blue"
                                    
                                    size={25} />
                                </Button>
                                     &nbsp;&nbsp;&nbsp;
                                <Button
                                    variant="normal"
                                    onClick={()=>obrisi(placa.sifra)}
                                >
       
                                    <BsDatabaseFillDash 
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