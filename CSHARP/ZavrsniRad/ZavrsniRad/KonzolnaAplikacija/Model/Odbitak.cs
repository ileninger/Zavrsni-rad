using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZavršniRad.KonzolnaAplikacija.Model;

namespace ZavrsniRad.KonzolnaAplikacija.Model
{
    internal abstract class Odbitak:Entitet
    {
        public decimal OsnovniOsobniOdbitak { get; set; }

        public decimal UdioZaPrviMirovnisnkiStup { get; set; }

        public decimal UdioZaDrugiMirovnisnkiStup { get; set; }

        public decimal PorezNaDohodak { get; set; }


        public decimal PoreznaOsnovica { get; set; }
    }
}
