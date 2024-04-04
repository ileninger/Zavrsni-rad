using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi_ZavrsniRad.Models
{
    public class Obracun:Entitet
    {

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
        public decimal? PoreznaOsnovica { get; set; }

        public decimal? NetoIznosZaIsplatu { get; set; }



    }
}
