using AutoMapper;
using System.Text.RegularExpressions;
using WebApi_ZavrsniRad.Models;

namespace WebApi_ZavrsniRad.Mappers
{
    public class ObracunMapper
    {
        public static Mapper InicijalizirajReadToDTO()
        {
            return new Mapper(
            new MapperConfiguration(c =>
            {   
                c.CreateMap<Obracun, ObracunDTORead>()
                .ConstructUsing(entitet =>
                 new ObracunDTORead(
                    entitet.Sifra,
                     entitet.Naziv,

                     entitet.Radnik.Ime == null ? "" : entitet.Radnik.Ime,
                     entitet.Radnik.Prezime == null ? "" : entitet.Radnik.Prezime,
                     entitet.Radnik.CijenaRadnogSata == null ? 0 : entitet.Radnik.CijenaRadnogSata,
                     entitet.Radnik.KoeficijentRadnogMjesta == null ? 0 : entitet.Radnik.KoeficijentRadnogMjesta,
                     entitet.PodaciZaObracun.Naziv == null ? "" : entitet.PodaciZaObracun.Naziv,
                     entitet.PodaciZaObracun.OsnovniOsobniOdbitak == null ? 0 : entitet.PodaciZaObracun.OsnovniOsobniOdbitak,
                     entitet.PodaciZaObracun.PostotakZaPrviMirovinskiStup == null ? 0 : entitet.PodaciZaObracun.PostotakZaPrviMirovinskiStup,
                     entitet.PodaciZaObracun.PostotakZaDrugiMirovinskiStup == null ? 0 : entitet.PodaciZaObracun.PostotakZaDrugiMirovinskiStup,
                     entitet.PodaciZaObracun.StopaPorezaNaDohodak == null ? 0 : entitet.PodaciZaObracun.StopaPorezaNaDohodak,
                     entitet.Placa.NazivPlace == null ? "" : entitet.Placa.NazivPlace,
                     entitet.Placa.BrojRadnihSati == null ? 0 : entitet.Placa.BrojRadnihSati,
                     entitet.DatumObracuna ?? DateTime.MinValue,
                     entitet.Bruto_I ?? 0,
                     entitet.Bruto_II ?? 0,
                     entitet.OsnovniOsobniOdbitak ?? 0,
                     entitet.IznosZaPrviMirovinskiStup ?? 0,
                     entitet.IznosZaDrugiMirovinskiStup ?? 0,
                     entitet.PoreznaOsnovicaPorezaNaDohodak ?? 0,
                     entitet.NetoIznosZaIsplatu ?? 0



                    ));
            })
            );
        }

        public static Mapper InicijalizirajInsertUpdateToDTO()
        {
            return new Mapper(
             new MapperConfiguration(c =>
             {
                 c.CreateMap<Obracun, ObracunDTOInsertUpdate>()
                 .ConstructUsing(entitet =>
                  new ObracunDTOInsertUpdate(
                   entitet.Sifra,
                        entitet.Naziv,
                        
                        entitet.Radnik == null ? null : entitet.Radnik.Sifra,
                        entitet.PodaciZaObracun == null ? null : entitet.PodaciZaObracun.Sifra,
                        entitet.Placa == null ? null : entitet.Placa.Sifra,
                        entitet.DatumObracuna ?? DateTime.MinValue,


                        entitet.Bruto_I ?? 0,
                        entitet.Bruto_II ?? 0,
                        entitet.PoreznaOsnovicaPorezaNaDohodak ?? 0,
                        entitet.OsnovniOsobniOdbitak ?? 0,
                        entitet.IznosZaPrviMirovinskiStup ?? 0,
                        entitet.IznosZaDrugiMirovinskiStup ?? 0,
                        entitet. NetoIznosZaIsplatu ?? 0
                     ));
             })
             );
        }
    }
}
