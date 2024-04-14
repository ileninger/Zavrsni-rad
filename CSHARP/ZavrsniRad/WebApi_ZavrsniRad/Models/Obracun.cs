using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi_ZavrsniRad.Models
{
    public class Obracun:Entitet
    {
        public string? Naziv { get; set; }

        /// <summary>
        /// Datum obračuna
        /// </summary>
        [ForeignKey("radnik")]
        public Radnik? Radnik { get; set; }
        
        [ForeignKey("podaciZaObracun")]
        public PodaciZaObracune PodaciZaObracun { get; set; }
        
        [ForeignKey("placa")]

        public Place Placa { get; set; }
        public DateTime? DatumObracuna { get; set; }
        /// <summary>
        /// Prezime radnika u bazi
        /// </summary>

        //Bruto I = CijenaRadnogSata*BrojRadnihSati*KoeficijentRadnnogMjesta
        public decimal? Bruto_I { get; set; }

        //BrurtoII = BrutoI - (MIO I + MIO II) - služi kao porezna osnovica
        public decimal? Dohodak { get; set; }

        /// <summary>
        /// Porezna osnovica
        /// </summary>
        public decimal? PoreznaOsnovicaPorezaNaDohodak { get; set; }

        /// <summary>
        /// Udio koji se odvaja za prvi mirovinski stup
        /// </summary>
        public decimal? IznosZaPrviMirovinskiStup { get; set; }


        /// <summary>
        /// Udio koji se odvaja za drugi mirovinski stup
        /// </summary>
        public decimal? IznosZaDrugiMirovinskiStup { get; set; }

        public decimal? OsnovniOsobniOdbitak { get; set; }


        public decimal? NetoIznosZaIsplatu { get; set; }



    }
}



