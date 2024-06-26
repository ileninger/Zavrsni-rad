﻿using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi_ZavrsniRad.Models
{
    /// <summary>
    /// Ovo mi je klasa za oddbitke
    /// </summary>
    public class PodaciZaObracune:Entitet
    {


        public string? Naziv{ get; set; }
        /// <summary>
        /// Postotak koji se odvaja za prvi mirovinski stup
        /// </summary>
        public decimal? PostotakZaPrviMirovinskiStup { get; set; }

        /// <summary>
        /// Postotak koji se odvaja za drugi mirovinski stup
        /// </summary>
        public decimal? PostotakZaDrugiMirovinskiStup { get; set; }

        /// <summary>
        /// Postotak poreza na dohodak
        /// </summary>
        public decimal? StopaPorezaNaDohodak { get; set; }

  


    }
}
