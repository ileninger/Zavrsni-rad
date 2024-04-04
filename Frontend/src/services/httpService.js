import axios from "axios";

export const httpService=axios.create({
    baseURL:'https://ileninger-001-site1.anytempurl.com/api/v1',
    headers:{
        'Content-Type':'application/json; charset=utf-8, access-control-allow-origin'
    }
});

