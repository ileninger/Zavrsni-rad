using AutoMapper;
using System.Reflection.Metadata.Ecma335;
using WebApi_ZavrsniRad.Mappers;
using WebApi_ZavrsniRad.Models;

namespace WebApi_ZavrsniRad.Extensions
{
    public static class MappingPlaca
    {


        public static List<PlacaDTORead> MapPlacaReadList(this List<Place> lista)
        {
            var mapper = PlacaMapper.InicijalizirajReadToDTO();
            var vrati = new List<PlacaDTORead>();
            lista.ForEach(e => {
                vrati.Add(mapper.Map<PlacaDTORead>(e));
            });
            Console.WriteLine(lista);
            return vrati;

        }

        public static PlacaDTORead MapPlacaReadToDTO(this Place entitet)
        {
            var mapper = PlacaMapper.InicijalizirajReadToDTO();
            return mapper.Map<PlacaDTORead>(entitet);
        }

        public static PlacaDTOInsertUpdate MapPlacaInsertUpdateToDTO(this Place entitet)
        {
            var mapper = PlacaMapper.InicijalizirajInsertUpdateToDTO();
            return mapper.Map<PlacaDTOInsertUpdate>(entitet);
        }


        public static Place MapPlacaInsertUpdateFromDTO(
            this PlacaDTOInsertUpdate dto, Place entitet)
        {
            entitet.NazivPlace = dto.nazivplace;
            entitet.BrojRadnihSati = dto.brojradnihsati;
            entitet.DatumPocetkaPlace = dto.datumpocetkaplace;
            entitet.DatumKrajaPlace = dto.datumkrajaplace;
            return entitet;
        }




    }
}

