import { App } from "../constants";
import { httpService } from "./httpService";


async function getPodaciZaObracune (){

    return await httpService.get('/PodaciZaObracune')
    .then((res)=>{
        if(App.DEV)console.log(res.data);
        return res;
    }).catch((e)=>{
        console.log(e);
    });

}

async function obrisiPodatkeZaObracune (sifra){

    return await httpService.delete('/PodaciZaObracune/'+sifra)
    .then((res)=>{
        return {ok:true, poruka:res};
    }).catch((e)=>{
        console.log(e);
    });



}
async function dodaj(podacizaobracune){
    const odgovor = await httpService.post('/PodaciZaObracune',podacizaobracune)
    .then(()=>{
        return {ok: true, poruka: 'Uspješno dodano'}
    })
    .catch((e)=>{
        console.log(e.response.data.errors);
        return {ok: false, poruka: 'Greška'}
    });
    return odgovor;
}

async function promjeni(sifra,podacizaobracune){
    const odgovor = await httpService.put('/PodaciZaObracune/'+sifra,podacizaobracune)
    .then(()=>{
        return {ok: true, poruka: 'Uspješno promjnjeno'}
    })
    .catch((e)=>{
        console.log(e.response.data.errors);
        return {ok: false, poruka: 'Greška'}
    });
    return odgovor;
}

async function getBySifra(podacizaobracune){
    return await httpService.get('/PodaciZaObracune/' + podacizaobracune)
    .then((res)=>{
        if(App.DEV) console.table(res.data);

        return res;
    }).catch((e)=>{
        console.log(e);
        return {poruka: e}
    });
}




export default{
    getPodaciZaObracune,
    obrisiPodatkeZaObracune,
    dodaj,
    promjeni, 
    getBySifra,
};