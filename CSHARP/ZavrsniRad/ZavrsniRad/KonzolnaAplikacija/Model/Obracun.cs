using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;
using ZavršniRad.KonzolnaAplikacija.Model;

namespace ZavrsniRad.KonzolnaAplikacija.Model
{
    internal class Obracun:Odbitak
    {
        public List<Radnik> Radnici { get; set; }
        public DateTime DatumObracuna { get; set; }
        public decimal BrojRadnihSati { get; set; }

        public decimal CijenaRadnogSata { get; set; }

        public decimal KoeficijentRadnogMjesta { get; set; }

        //Bruto I = CijenaRadnogSata*BrojRadnihSati*KoeficijentRadnnogMjesta
        public decimal BrutoI { get; set; }

        //BrurtoII = BrutoI - (MIO I + MIO II) - služi kao porezna osnovica
        public decimal BrutoII { get; set; }





        public decimal NetoIznosZaIsplatuRadniku { get; set; }

        public override string ToString()
        {
            return "\n Datum obračuna: " + DatumObracuna + "\n Cijena radnog sata: " + CijenaRadnogSata + "EUR" +"\n Koefijent radnog mjesta iznosi: " +  "\n"
                + "\n BrutoI iznosi: " +  BrutoI + "EUR" + 
                "\n Uplata za mirovinsko osiguranje na temelju gemeracijske solidarnosti iznosti: " + UdioZaPrviMirovnisnkiStup + "EUR" +
                "\n Uplata za mirovinsko osiguranje na temelju idividualne kapitalizirane štednje iznosti: " + UdioZaDrugiMirovnisnkiStup + "EUR" +
                "\n BrutoII iznosi: " + BrutoII +"EUR"  +
                "\n Porezna osnovica iznosi:" + PoreznaOsnovica + "EUR" +
                "\n Iznos poreza na dohodak iznosi " + (PorezNaDohodak*(BrutoII-PoreznaOsnovica)) + "EUR"+
                "\n Radniku će na račun biti isplačeno: " + NetoIznosZaIsplatuRadniku + "EUR";
        }




    }
}
