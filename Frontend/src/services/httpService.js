import axios from "axios";

export const httpService=axios.create({
    baseURL:'https://ileninger-001-site1.anytempurl.com/api/v1',
    headers:{
        'Content-Type':'application/json; charset=utf-8, access-control-allow-origin'
    }
});

export function obradiUspjeh(res){
    if(App.DEV) console.table(res.data);
    return {ok: true, podaci: res.data};
}

export function obradiGresku(e){

    if (!e.response) {
        return {ok: false, podaci: [kreirajPoruku('Problem s mrežom', 'nema odgovora od servera')]};
    }

    if(e.code == AxiosError.ERR_NETWORK){
        return {ok: false, podaci: [kreirajPoruku('Problem s mrežom', 'Pokušajte kasnije')]};
    }
        
    switch(e.response.status){
        case 503:
            return {ok: false, podaci: [kreirajPoruku('Server problem', e.response.data)]};
        case 400:
            if (typeof(e.response.data.errors) !== 'undefined'){
                return odradi400(e.response.data.errors);
            }
            return {ok: false, podaci: [kreirajPoruku('Problem u podacima', e.response.data)]};
    }

    return {ok: false, podaci: e};
}
