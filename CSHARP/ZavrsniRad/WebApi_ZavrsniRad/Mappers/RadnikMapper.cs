using AutoMapper;
using WebApi_ZavrsniRad.Models;

namespace WebApi_ZavrsniRad.Mappers
{
    public class RadnikMapper
    {
        public static Mapper InicijalizirajReadToDTO()
        {
            return new Mapper(
                    new MapperConfiguration(c =>
                    {
                        c.CreateMap<Radnik, RadnikDTORead>();
                    })
                );
        }
        public static Mapper InicijalizirajReadFromDTO()
        {
            return new Mapper(
                new MapperConfiguration(c =>
                {
                    c.CreateMap<RadnikDTORead, Radnik>();
                })
                );
        }

        public static Mapper InicijalizirajInsertUpdateToDTO()
        {
            return new Mapper(
                new MapperConfiguration(c =>
                {
                    c.CreateMap<Radnik, RadnikDTOInsertUpdate>();
                })
                );
        }
    }
}
