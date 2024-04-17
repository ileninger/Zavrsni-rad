import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
//import { FaEdit } from "react-icons/fa";

import { RoutesNames } from "../../constants";
import moment from "moment/moment";

import ObračunskoRazdobljeService from "../../services/ObracunskoRazdobljeService";
import useLoading from "../../hooks/useLoading";

import { FaCalendarPlus } from "react-icons/fa";
import { FaCalendarMinus } from "react-icons/fa6";
import { FaCalendarDay } from "react-icons/fa6";





export default function ObracunskoRazdobljePregled (){

    const [obracunskorazdoblje,setObracunskoRazdoblje] = useState ();
    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();
    

    async function dohvatiObracunskoRazdoblje (){
        showLoading();
        await ObračunskoRazdobljeService.get()
        .then((res)=>{
            setObracunskoRazdoblje(res.data);
        })
        .catch((e)=>{
            alert(e);
        });
        hideLoading();
    } 

    async function obrisi(sifra){
        showLoading(); 
        const odgovor = await ObračunskoRazdobljeService.obrisi(sifra);
        if (odgovor.ok){
            alert(odgovor.poruka.data.poruka)
            dohvatiObracunskoRazdoblje();
        }
        hideLoading();

    }

    useEffect(()=>{
        dohvatiObracunskoRazdoblje();
    },[]);

    return (
        <Container>

                    * <Link to={RoutesNames.OBRACUNSKORAZDOBLJE_DODAJ} className="btn gumb">
                    <FaCalendarPlus 
                        size='30'
                        className="lijevo"
                    />
                        Dodaj novo obračunsko razdoblje
                    </Link>
         
            <Table striped bordered hover responsive className="table">
                <thead>
                    <tr>
                        <th className="sredina">Naziv</th>
                        <th className="sredina">Početak obračunskog razdoblja</th>
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
                                    <FaCalendarDay   
                                     color="blue"
                                    
                                    size={25} />
                                </Button>
                                <Button
                                    variant="normal"
                                    onClick={()=>obrisi(obracunskorazdoblje.sifra)}
                                >
       
                                    <FaCalendarMinus 
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