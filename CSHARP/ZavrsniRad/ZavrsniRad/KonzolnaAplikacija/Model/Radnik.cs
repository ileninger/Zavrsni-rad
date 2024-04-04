using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace ZavršniRad.KonzolnaAplikacija.Model
{
    internal class Radnik:Entitet
    {
        public string Ime { get; set; }

        public string Prezime { get; set; }
      
        public string OiB { get; set; }

        public DateTime DatumZaposlenja { get; set; }

        public string Iban { get; set; }

        public override string ToString()
        {
            return "\n Ime: " + Ime + "\n Prezime: " + Prezime + "\n OiB: " + OiB +  "\n Iban: " + Iban + "\n Radnik je zaposlen od " + DatumZaposlenja;
        }

    }
}
