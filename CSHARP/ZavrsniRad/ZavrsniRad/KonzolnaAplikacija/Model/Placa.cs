using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZavršniRad.KonzolnaAplikacija.Model;

namespace ZavrsniRad.KonzolnaAplikacija.Model
{
    internal class Placa:Entitet
    {
        public List <Obracun> Obracun { get; set; }
        public Radnik Radnik{ get; set; }

        public string NazivPlace { get; set; }

    }
}
