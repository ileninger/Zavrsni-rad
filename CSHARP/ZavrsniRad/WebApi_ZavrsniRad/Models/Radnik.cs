using System.ComponentModel.DataAnnotations;

namespace WebApi_ZavrsniRad.Models
{
    /// <summary>
    /// Ovo mi je POCO koji je mapiran na bazu 
    /// </summary>
    public class Radnik:Entitet
    {
        /// <summary>
        /// Ime radnika u bazi 
        /// </summary>
        [Required(ErrorMessage ="Ime radnika je obavezno")]
       
        public string? Ime { get; set; }

        /// <summary>
        /// Prezime radnika u bazi
        /// </summary>
        ///[Required(ErrorMessage = "Prezime radnika je obavezno")]
        public string? Prezime { get; set; }
        /// <summary>
        /// OiB radnika u bazi, OiB potrebno unjeti sukladno pravilima za unos OiB-a
        /// </summary>
        ///[Required(ErrorMessage = "OiB radnika je obavezno")]
        public string? OiB { get; set; }
        /// <summary>
        /// Od kada je radnik zaposlen u ovoj tvrtki
        /// </summary>
        ///[Required(ErrorMessage = "Datum zaposlenja radnika je obavezan")]
        public DateTime? DatumZaposlenja { get; set; }
        /// <summary>
        /// Iban radnika
        /// </summary>
        ///[Required(ErrorMessage = "Iban radnika je obavezno")]
        public string? Iban { get; set; }

        /// <summary>
        /// Prezime radnika u bazi
        /// </summary>
        //[Required(ErrorMessage = "Jedinična cijena radnog sata ja obavezna")]
        public decimal? CijenaRadnogSata { get; set; }

        /// <summary>
        /// Prezime radnika u bazi
        /// </summary>
        //[Required(ErrorMessage = "Koeficijent radnog mjesta je obavezan")]
        public decimal? KoeficijentRadnogMjesta { get; set; }

        /// <summary>
        /// Osnovni osobni odbitak
        /// </summary>
        public decimal? OsnovniOsobniOdbitak { get; set; }


    }
}


