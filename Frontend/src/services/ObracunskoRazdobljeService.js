import { App } from "../constants";
import { httpService } from "./httpService";


async function get (){

    return await httpService.get('/Placa')
    .then((res)=>{
        if(App.DEV)console.log(res.data);
        return res;
    }).catch((e)=>{
        console.log(e);
    });

}

async function obrisi (sifra){

    return await httpService.delete('/Placa/'+sifra)
    .then((res)=>{
        return {ok:true, poruka:res};
    }).catch((e)=>{
        console.log(e);
    });



}
async function dodaj(podacizaobracune){
    const odgovor = await httpService.post('/Placa',podacizaobracune)
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
    const odgovor = await httpService.put('/Placa/'+sifra,podacizaobracune)
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
    return await httpService.get('/Placa/' + podacizaobracune)
    .then((res)=>{
        if(App.DEV) console.table(res.data);

        return res;
    }).catch((e)=>{
        console.log(e);
        return {poruka: e}
    });
}




export default{
    get,
    obrisi,
    dodaj,
    promjeni, 
    getBySifra,
};