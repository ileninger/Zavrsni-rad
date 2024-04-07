using AutoMapper;
using System.Reflection.Metadata.Ecma335;
using WebApi_ZavrsniRad.Mappers;
using WebApi_ZavrsniRad.Models;

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
            entitet.Bruto_I = dto.brutoI;
            entitet.Bruto_II = dto.brutoII;
            entitet.PoreznaOsnovicaPorezaNaDohodak = dto.poreznaosnovicaporezanadohodak;
            entitet.OsnovniOsobniOdbitak = dto.osnovniosobniodbitak;
            entitet.UdioZaPrviMirovinskiStup = dto.udiozaprvimirovinskistup;
            entitet.UdioZaDrugiMirovinskiStup = dto.udiozadrugimirovinskistup;
            entitet.NetoIznosZaIsplatu = dto.netoiznoszaisplatu;
            
            
            return entitet;
        }




    }
}
