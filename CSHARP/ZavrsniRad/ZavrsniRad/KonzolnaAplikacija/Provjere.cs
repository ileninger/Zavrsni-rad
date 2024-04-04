using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using ZavršniRad.KonzolnaAplikacija.Model;

namespace ZavrsniRad.KonzolnaAplikacija
{
    internal class Provjere
    {
        public static bool ProvjeriIspravnostHrvatskogIBAN(string iban)
        {
            // Uklonite razmake iz IBAN-a jer IBAN može sadržavati razmake koji se ne uzimaju u obzir u provjeri.
            string cleanedIban = RemoveSpaces(iban);

            // Hrvatski IBAN mora početi sa "HR" i imati ukupno 21 znak.
            if (!Regex.IsMatch(cleanedIban, "^HR[a-zA-Z0-9]{19}$"))
            {
                return false;
            }

            // Ovdje možete implementirati dodatne provjere kontrolnih znamenki ako je potrebno.

            return true;
        }

        static string RemoveSpaces(string input)
        {
            // Funkcija za uklanjanje razmaka iz teksta
            return input.Replace(" ", "");
        }

        public static bool ProvjeriIspavnostOiB(string oib)
        {
            if (oib.Length != 11)
            {
                Console.WriteLine("**********************************");
                Console.WriteLine("OIB mora imati 11 znamenki.");
                return false;
            }

            long b;
            if (!long.TryParse(oib, out b))
            {
                Console.WriteLine("**********************************");

                Console.WriteLine("OIB mora sadržavati samo brojeve.");
                return false;
            }

            int a = 10;
            for (int i = 0; i < 10; i++)
            {
                a = a + int.Parse(oib.Substring(i, 1));
                a = a % 10;
                if (a == 0)
                {
                    a = 10;
                }
                a *= 2;
                a = a % 11;
            }

            int kontrolniBroj = 11 - a;
            if (kontrolniBroj == 10) kontrolniBroj = 0;

            return kontrolniBroj == int.Parse(oib.Substring(10, 1));
        }
    }
}
