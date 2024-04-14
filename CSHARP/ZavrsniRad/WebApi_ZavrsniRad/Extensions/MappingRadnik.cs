using AutoMapper;
using System.Reflection.Metadata.Ecma335;
using WebApi_ZavrsniRad.Mappers;
using WebApi_ZavrsniRad.Models;

namespace WebApi_ZavrsniRad.Extensions
{
    public static class MappingRadnik
    {


        public static List<RadnikDTORead> MapRadnikReadList(this List<Radnik> lista)
        {
            var mapper = RadnikMapper.InicijalizirajReadToDTO();
            var vrati = new List<RadnikDTORead>();
            lista.ForEach(e => {
                vrati.Add(mapper.Map<RadnikDTORead>(e));
            });
            Console.WriteLine(lista);
            return vrati;

        }

        public static RadnikDTORead MapRadnikReadToDTO(this Radnik entitet)
        {
            var mapper = RadnikMapper.InicijalizirajReadToDTO();
            return mapper.Map<RadnikDTORead>(entitet);
        }

        public static RadnikDTOInsertUpdate MapRadnikInsertUpdateToDTO(this Radnik entitet)
        {
            var mapper = RadnikMapper.InicijalizirajInsertUpdateToDTO();
            return mapper.Map<RadnikDTOInsertUpdate>(entitet);
        }


        public static Radnik MapRadnikInsertUpdateFromDTO(
            this RadnikDTOInsertUpdate dto, Radnik entitet)
        {
            entitet.Ime = dto.ime;
            entitet.Prezime = dto.prezime;
            entitet.OiB = dto.oib;
            entitet.Iban = dto.iban;
            entitet.CijenaRadnogSata = dto.cijenaradnogsata;
            entitet.KoeficijentRadnogMjesta = dto.koeficijentradnogmjesta;
            entitet.OsnovniOsobniOdbitak = dto.osnovniosobniodbitak;
            PutanjaDatoteke(entitet);
            return entitet;
        }

        private static string PutanjaDatoteke(Radnik e)
        {
            try
            {
                var ds = Path.DirectorySeparatorChar;
                string slika = Path.Combine(Directory.GetCurrentDirectory()
                    + ds + "wwwroot" + ds + "slike" + ds + "polaznici" + ds + e.Sifra + ".png");
                return File.Exists(slika) ? "/slike/polaznici/" + e.Sifra + ".png" : null;
            }
            catch
            {
                return null;
            }

        }




    }
}

