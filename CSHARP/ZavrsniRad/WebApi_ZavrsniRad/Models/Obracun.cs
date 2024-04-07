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
        public DateTime? DatumObracuna { get; set; }
        /// <summary>
        /// Prezime radnika u bazi
        /// </summary>

        //Bruto I = CijenaRadnogSata*BrojRadnihSati*KoeficijentRadnnogMjesta
        public decimal? Bruto_I { get; set; }

        //BrurtoII = BrutoI - (MIO I + MIO II) - služi kao porezna osnovica
        public decimal? Bruto_II { get; set; }

        /// <summary>
        /// Porezna osnovica
        /// </summary>
        public decimal? PoreznaOsnovicaPorezaNaDohodak { get; set; }

        /// <summary>
        /// Postotak koji se odvaja za prvi mirovinski stup
        /// </summary>
        public decimal? UdioZaPrviMirovinskiStup { get; set; }


        /// <summary>
        /// Postotak koji se odvaja za drugi mirovinski stup
        /// </summary>
        public decimal? UdioZaDrugiMirovinskiStup { get; set; }

        public decimal? OsnovniOsobniOdbitak { get; set; }


        public decimal? NetoIznosZaIsplatu { get; set; }



    }
}





/// <summary>
/// Postotak poreza na dohodak
/// </summary>


/// <summary>
/// Porezna osnovica
/// </summary>
