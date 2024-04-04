using System.ComponentModel.DataAnnotations;

namespace WebApi_ZavrsniRad.Models
{
    /// <summary>
    /// Ovo je vršna nadklasa koja služi za osnovne atribure
    /// </summary>
    public abstract class Entitet
    {
        /// <summary>
        /// Ovo svojstvo mi sluzi kao primarni ključ s generiranjem vrijednosti (1,1)
        /// </summary>
        [Key]
        public int Sifra { get; set; }

    }
}
