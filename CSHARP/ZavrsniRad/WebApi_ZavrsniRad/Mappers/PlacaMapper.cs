using AutoMapper;
using WebApi_ZavrsniRad.Models;

namespace WebApi_ZavrsniRad.Mappers
{
    public class PlacaMapper
    {
        public static Mapper InicijalizirajReadToDTO()
        {
            return new Mapper(
                    new MapperConfiguration(c =>
                    {
                        c.CreateMap<Place, PlacaDTORead>();
                    })
                );
        }
        public static Mapper InicijalizirajReadFromDTO()
        {
            return new Mapper(
                new MapperConfiguration(c =>
                {
                    c.CreateMap<PlacaDTORead, Place>();
                })
                );
        }

        public static Mapper InicijalizirajInsertUpdateToDTO()
        {
            return new Mapper(
                new MapperConfiguration(c =>
                {
                    c.CreateMap<Place, PlacaDTOInsertUpdate>();
                })
                );
        }
    }
}
