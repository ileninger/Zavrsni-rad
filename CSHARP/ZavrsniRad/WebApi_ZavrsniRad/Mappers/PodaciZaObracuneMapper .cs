using AutoMapper;
using WebApi_ZavrsniRad.Models;

namespace WebApi_ZavrsniRad.Mappers
{
    public class PodaciZaObracuneMapper
    {
        public static Mapper InicijalizirajReadToDTO()
        {
            return new Mapper(
                    new MapperConfiguration(c =>
                    {
                        c.CreateMap<PodaciZaObracune, PodaciZaObracuneDTORead>();
                    })
                );
        }
        public static Mapper InicijalizirajReadFromDTO()
        {
            return new Mapper(
                new MapperConfiguration(c =>
                {
                    c.CreateMap<PodaciZaObracuneDTORead, PodaciZaObracune>();
                })
                );
        }

        public static Mapper InicijalizirajInsertUpdateToDTO()
        {
            return new Mapper(
                new MapperConfiguration(c =>
                {
                    c.CreateMap<PodaciZaObracune, PodaciZaObracuneDTOInsertUpdate>();
                })
                );
        }
    }
}
