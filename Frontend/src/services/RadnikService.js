import { App } from "../constants";
import { httpService } from "./httpService";


async function getRadnici (){

    return await httpService.get('/Radnik')
    .then((res)=>{
        if(App.DEV)console.log(res.data);
        return res;
    }).catch((e)=>{
        console.log(e);
    });

}

async function obrisiRadnika (sifra){

    return await httpService.delete('/Radnik/'+sifra)
    .then((res)=>{
        return {ok:true, poruka:res};
    }).catch((e)=>{
        console.log(e);
    });



}
async function dodaj(radnik){
    const odgovor = await httpService.post('/Radnik',radnik)
    .then(()=>{
        return {ok: true, poruka: 'Uspješno dodano'}
    })
    .catch((e)=>{
        console.log(e.response.data.errors);
        return {ok: false, poruka: 'Greška'}
    });
    return odgovor;
}

async function promjeni(sifra,radnik){
    const odgovor = await httpService.put('/Radnik/'+sifra,radnik)
    .then(()=>{
        return {ok: true, poruka: 'Uspješno promjnjeno'}
    })
    .catch((e)=>{
        console.log(e.response.data.errors);
        return {ok: false, poruka: 'Greška'}
    });
    return odgovor;
}

async function getBySifra(sifra){
    return await httpService.get('/Radnik/' + sifra)
    .then((res)=>{
        if(App.DEV) console.table(res.data);

        return res;
    }).catch((e)=>{
        console.log(e);
        return {poruka: e}
    });
}




export default{
    getRadnici,
    obrisiRadnika,
    dodaj,
    promjeni, 
    getBySifra,
};