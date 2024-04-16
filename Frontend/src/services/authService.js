import { httpService, obradiGresku, obradiUspjeh } from './httpService';
import axios from "axios";
export async function logInService(userData) {
  return await httpService
    .post('/Autorizacija/token', userData)
    .then((res)=>{return  {ok: true, podaci: res};;})
    .catch((e)=>{ return { greska: true , podaci: [{svojstvo: 'Autorizacija', poruka: e.response.data}]}});
}