using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata.Ecma335;
using System.Runtime.CompilerServices;
using WebApi_ZavrsniRad.Mappers;
using WebApi_ZavrsniRad.Models;
using WebApi_ZavrsniRad.Controllers;
using WebApi_ZavrsniRad.Data;
using System.Xml;

namespace WebApi_ZavrsniRad.Extensions
{
    public static class MappingObracun
    {


        public static List<ObracunDTORead> MapObracunReadList(this List<Obracun> lista)
        {
            var mapper = ObracunMapper.InicijalizirajReadToDTO();
            var vrati = new List<ObracunDTORead>();
            lista.ForEach(e => {
                vrati.Add(mapper.Map<ObracunDTORead>(e));
            });
            Console.WriteLine(lista);
            return vrati;

        }

        public static ObracunDTORead MapObraunReadToDTO(this Obracun entitet)
        {
            var mapper = ObracunMapper.InicijalizirajReadToDTO();
            return mapper.Map<ObracunDTORead>(entitet);
        }

        public static ObracunDTOInsertUpdate MapObracunInsertUpdateToDTO(this Obracun entitet)
        {
            var mapper = ObracunMapper.InicijalizirajInsertUpdateToDTO();
            return mapper.Map<ObracunDTOInsertUpdate>(entitet);
        }


        public static Obracun MapObracunInsertUpdateFromDTO(
            this ObracunDTOInsertUpdate dto, Obracun entitet)
        {
            entitet.Naziv = dto.naziv;
            entitet.DatumObracuna = dto.datumobracuna;
            ObracunNakonUnosa(entitet,dto.radnikSifra, dto.placaSifra, dto.podacizaobracunSifra);
            //entitet.Bruto_I = dto.brutoI;
            //entitet.Dohodak = dto.brutoII;
            //entitet.PoreznaOsnovicaPorezaNaDohodak = dto.poreznaosnovicaporezanadohodak;
            //entitet.OsnovniOsobniOdbitak = dto.osnovniosobniodbitak;
            //entitet.IznosZaPrviMirovinskiStup = dto.iznoszaprvimirovinskistup;
            //entitet.IznosZaDrugiMirovinskiStup = dto.iznoszadrugimirovinskistup;
            //entitet.NetoIznosZaIsplatu = dto.netoiznoszaisplatu;
            
            
            return entitet;
        }

        private static void ObracunNakonUnosa( this Obracun entitet, int?RadnikSifra, int? PlacaSifra, int?PodaciZaObracunSifra)
        {
            var options = new DbContextOptionsBuilder<ObracunPlacaContext>();
            options.UseSqlServer("Data Source=SQL6031.site4now.net;Initial Catalog=db_aa599e_ileninger;User Id=db_aa599e_ileninger_admin;Password=4xHgsxpPFdtIMHe");
            var context = new ObracunPlacaContext(options.Options);
            var podacizaobracun = context.PodaciZaObracune.Find(PodaciZaObracunSifra);
            var placa = context.Place.Find(PlacaSifra);
            var radnik = context.Radnici.Find(RadnikSifra);

            entitet.Bruto_I = radnik.CijenaRadnogSata * radnik.KoeficijentRadnogMjesta * placa.BrojRadnihSati;
            entitet.IznosZaPrviMirovinskiStup = (podacizaobracun.PostotakZaPrviMirovinskiStup / 100) * entitet.Bruto_I;
            entitet.IznosZaDrugiMirovinskiStup = (podacizaobracun.PostotakZaDrugiMirovinskiStup/100)* entitet.Bruto_I;

            entitet.Dohodak = entitet.Bruto_I - entitet.IznosZaDrugiMirovinskiStup - entitet.IznosZaPrviMirovinskiStup;
            entitet.OsnovniOsobniOdbitak = radnik.OsnovniOsobniOdbitak; 
            entitet.PoreznaOsnovicaPorezaNaDohodak = entitet.Dohodak - entitet.OsnovniOsobniOdbitak;
            if (entitet.PoreznaOsnovicaPorezaNaDohodak < 0)
            {
                entitet.PoreznaOsnovicaPorezaNaDohodak = 0;
                entitet.NetoIznosZaIsplatu = entitet.Dohodak;
            }
            else
            {
                entitet.NetoIznosZaIsplatu = entitet.Dohodak - ((entitet.PoreznaOsnovicaPorezaNaDohodak - entitet.OsnovniOsobniOdbitak) * podacizaobracun.StopaPorezaNaDohodak / 100);
            }




        }



    }
}
