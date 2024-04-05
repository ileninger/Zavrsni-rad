using AutoMapper;
using System.Reflection.Metadata.Ecma335;
using WebApi_ZavrsniRad.Mappers;
using WebApi_ZavrsniRad.Models;

namespace WebApi_ZavrsniRad.Extensions
{
    public static class MappingPodaciZaObracune
    {


        public static List<PodaciZaObracuneDTORead> MapPodaciZaObracuneReadList(this List<PodaciZaObracune> lista)
        {
            var mapper = PodaciZaObracuneMapper.InicijalizirajReadToDTO();
            var vrati = new List<PodaciZaObracuneDTORead>();
            lista.ForEach(e => {
                vrati.Add(mapper.Map<PodaciZaObracuneDTORead>(e));
            });
            Console.WriteLine(lista);
            return vrati;

        }

        public static PodaciZaObracuneDTORead MapPodaciZaObracuneReadToDTO(this PodaciZaObracune entitet)
        {
            var mapper = PodaciZaObracuneMapper.InicijalizirajReadToDTO();
            return mapper.Map<PodaciZaObracuneDTORead>(entitet);
        }

        public static PodaciZaObracuneDTOInsertUpdate MapPodaciZaObracuneInsertUpdateToDTO(this PodaciZaObracune entitet)
        {
            var mapper = PodaciZaObracuneMapper.InicijalizirajInsertUpdateToDTO();
            return mapper.Map<PodaciZaObracuneDTOInsertUpdate>(entitet);
        }


        public static PodaciZaObracune MapPodaciZaObracuneInsertUpdateFromDTO(
            this PodaciZaObracuneDTOInsertUpdate dto, PodaciZaObracune entitet)
        {
            entitet.OsnovniOsobniOdbitak = dto.osnovniosobniodbitak;
            entitet.PostotakZaPrviMirovinskiStup = dto.postotakzaprvimirovinskistup;
            entitet.PostotakZaDrugiMirovinskiStup = dto.postotakzadrugimirovinskistup;
            entitet.StopaPorezaNaDohodak = dto.stopaporezanadohodak;
            return entitet;
        }




    }
}

