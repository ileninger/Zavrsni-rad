namespace WebApi_ZavrsniRad.Models
{
    /// <summary>
    /// Ovo mi je klasa za oddbitke
    /// </summary>
    public class Odbitak:Entitet
    {
        /// <summary>
        /// Osnovni osobni odbitak
        /// </summary>
        public decimal? OsnovniOsobniOdbitak { get; set; }
        /// <summary>
        /// Postotak koji se odvaja za prvi mirovinski stup
        /// </summary>
        public decimal? UdioZaPrviMirovinskiStup { get; set; }

        /// <summary>
        /// Postotak koji se odvaja za drugi mirovinski stup
        /// </summary>
        public decimal? UdioZaDrugiMirovinskiStup { get; set; }

        /// <summary>
        /// Postotak poreza na dohodak
        /// </summary>
        public decimal? PorezNaDohodak { get; set; }

        /// <summary>
        /// Porezna osnovica
        /// </summary>
        public decimal? PoreznaOsnovica { get; set; }
    }
}
