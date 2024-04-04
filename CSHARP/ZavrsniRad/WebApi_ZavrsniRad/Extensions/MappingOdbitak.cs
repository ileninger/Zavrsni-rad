using AutoMapper;
using System.Reflection.Metadata.Ecma335;
using WebApi_ZavrsniRad.Mappers;
using WebApi_ZavrsniRad.Models;

namespace WebApi_ZavrsniRad.Extensions
{
    public static class MappingOdbitak
    {


        public static List<OdbitciDTORead> MapOdbitakReadList(this List<Odbitak> lista)
        {
            var mapper = OdbiciMapper.InicijalizirajReadToDTO();
            var vrati = new List<OdbitciDTORead>();
            lista.ForEach(e => {
                vrati.Add(mapper.Map<OdbitciDTORead>(e));
            });
            Console.WriteLine(lista);
            return vrati;

        }

        public static OdbitciDTORead MapOdbitakReadToDTO(this Odbitak entitet)
        {
            var mapper = OdbiciMapper.InicijalizirajReadToDTO();
            return mapper.Map<OdbitciDTORead>(entitet);
        }

        public static OdbitciDTOInsertUpdate MapOdbitakInsertUpdateToDTO(this Odbitak entitet)
        {
            var mapper = OdbiciMapper.InicijalizirajInsertUpdateToDTO();
            return mapper.Map<OdbitciDTOInsertUpdate>(entitet);
        }


        public static Odbitak MapRadnikInsertUpdateFromDTO(
            this OdbitciDTOInsertUpdate dto, Odbitak entitet)
        {
            entitet.OsnovniOsobniOdbitak = dto.osnovniosobniodbitak;
            entitet.UdioZaPrviMirovinskiStup = dto.udiozaprvimirovinskistup;
            entitet.UdioZaDrugiMirovinskiStup = dto.udiozadrugimirovinskistup;
            entitet.PorezNaDohodak = dto.stopaporezanadohodak;

            return entitet;
        }




    }
}

