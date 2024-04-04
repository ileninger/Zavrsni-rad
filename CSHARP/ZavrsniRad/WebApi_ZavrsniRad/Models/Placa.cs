using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi_ZavrsniRad.Models
{
    public class Placa:Entitet
    {
        public string? NazivPlace { get; set; }

        //[Required(ErrorMessage = "Broj radnih sati koje je radnik odradio u razdoblju obračuna je obavezan")]
        public int? BrojRadnihSati { get; set; }

        
    }
}
