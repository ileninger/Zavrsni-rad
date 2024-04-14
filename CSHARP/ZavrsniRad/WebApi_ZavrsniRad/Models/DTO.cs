﻿using System.ComponentModel.DataAnnotations.Schema;
using WebApi_ZavrsniRad.Models;

namespace WebApi_ZavrsniRad.Models
{
    public record RadnikDTORead(int sifra, string ime,string prezime,
        string oib,DateTime datumzaposlenja, string iban, decimal cijenaradnogsata, decimal koeficijentradnogmjesta, decimal osnovniosobniodbitak);
    public record RadnikDTOInsertUpdate(string ime, string prezime,
    string oib, DateTime datumzaposlenja, string iban, decimal cijenaradnogsata, decimal koeficijentradnogmjesta, decimal osnovniosobniodbitak);

    public record PodaciZaObracuneDTORead(int sifra,string naziv,decimal postotakzaprvimirovinskistup,
        decimal postotakzadrugimirovinskistup, decimal stopaporezanadohodak);
    public record PodaciZaObracuneDTOInsertUpdate(string naziv, decimal postotakzaprvimirovinskistup,
    decimal postotakzadrugimirovinskistup, decimal stopaporezanadohodak);

    public record  PlacaDTORead(int sifra,string nazivplace,int brojradnihsati, DateTime datumpocetkaplace,DateTime datumkrajaplace);

    public record PlacaDTOInsertUpdate(string nazivplace, int brojradnihsati, DateTime datumpocetkaplace, DateTime datumkrajaplace);


    public record ObracunDTORead(int sifra, string naziv,
        string? radnikIme, string? radnikPrezime,decimal? radnikCijenaRadnogSata, decimal? radnikKoeficijentRadnogMjesta,       
        string? podaciZaObracunNaziv, decimal? podaciZaObracunOsnovniOsobniOdbitak, 
        decimal? podaciZaObracunPostotakZaPrviMirovinskiStup, decimal? podaciZaObracunPostotakZaDrugiMirovinskiStup, decimal? podaciZaObracunStopaPorezaNaDohodak,

        string? placaNaziv,int? placaBrojRadnihSati,

         DateTime datumObracuna, decimal brutoI, decimal dohodak, decimal poreznaosnovicaporezanadohodak, decimal osnovniosobniodbitak,
        decimal iznoszaprvimirovinskistup, decimal iznoszadrugimirovinskistup, decimal netoiznoszaisplatu)
    {

    };


    public record ObracunDTOInsertUpdate(int sifra, string naziv, int? radnikSifra, int? podacizaobracunSifra, int? placaSifra,
       DateTime datumobracuna, decimal brutoI, decimal dohodak, decimal poreznaosnovicaporezanadohodak, decimal osnovniosobniodbitak,
       decimal iznoszaprvimirovinskistup, decimal iznoszadrugimirovinskistup, decimal netoiznoszaisplatu);
}
