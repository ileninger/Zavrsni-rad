using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZavršniRad.KonzolnaAplikacija;
using ZavršniRad.KonzolnaAplikacija.Model;

namespace ZavrsniRad.KonzolnaAplikacija
{
    internal class ObradaRadnici
    {
        public List<Radnik> Radnici { get; }

        public ObradaRadnici()
        {
            Radnici = new List<Radnik>();
            if (Pomocno.Test)
            {
                TesniPodaci();
            }
        }

        public void PrikaziIzbornik()
        {
            Console.WriteLine("**********************************************************");
            Console.WriteLine("Odaberite jedanu od ponuđenih mogučnosti rada s radnicima ");
            Console.WriteLine("**********************************************************");

            Console.WriteLine("1. Prikaži sve radnike ");
            Console.WriteLine("2. Dodaj radnika ");
            Console.WriteLine("3. Izmjeni  podatke o radniku ");
            Console.WriteLine("4. Obriši radnika ");
            Console.WriteLine("5. Povratak na prethodni izbornik ");

            Thread.Sleep(1000);

            OdabirIzbornikRadaSaPodacimaORadnicima();
        }

        private void OdabirIzbornikRadaSaPodacimaORadnicima()
        {
            switch (Pomocno.UcitajRasponBrojeva("Odaberite broj između između 1-5 za rad s radnicima: ", "Odabreni broj mora biti između 1-5 ", 1, 5))
            {
                case 1:
                    PrikaziSveRadnike();
                    PrikaziIzbornik();
                    break;
                case 2:
                    DodajRandika();
                    PrikaziIzbornik();
                    break;
                case 3:
                    UrediPodatkeORadniku();
                    PrikaziIzbornik();
                    break;
                case 4:
                    ObrisiRadnika();
                    PrikaziIzbornik();
                    break;
                case 5:
                    Console.WriteLine("Završili ste s radom na radnicima. ");
                    Thread.Sleep(1000);
                    break;

            }
        }



        public void PrikaziSveRadnike()
        {
            Console.WriteLine("***********************************************");
            Console.WriteLine("****************Uneseni radnici****************");
            Console.WriteLine("***********************************************");

            Thread.Sleep(1000);

            var b = 1;

            foreach(Radnik radnik in Radnici)
            {
                Console.WriteLine("{0}. {1}",b++,radnik);
            }
           
            Console.WriteLine("///////////////////////////////////////////////");
        }

        private bool PostojiRadnikSaSifrom(int sifra)
        {
            return Radnici.Any(radnik => radnik.Sifra == sifra);
        }

        private void DodajRandika()
        {
            var radnik = new Radnik();
            bool IspravnostOiB = false;
            bool IspravnostIban = false;


            do
            {
                radnik.Sifra = Pomocno.UcitajCijeliBroj("Unesite šifru radnika: ", "Šifra radnika mora biti pozitivan cijeli broj");

                if (PostojiRadnikSaSifrom(radnik.Sifra))
                {
                    Console.WriteLine("Radnik s tom šifrom već postoji. Molimo unesite novu šifru.");
                }
                else
                {
                    break;
                }
            } while (true);

            //radnik.Sifra = Pomocno.UcitajCijeliBroj("Unesite šifru radnika: ", "Šifra radnika mora biti pozivni cijeli broj");
            radnik.Ime = Pomocno.UcitajString("Unesite ime radnika: ", "Ime radnika je obavezno ");
            radnik.Prezime = Pomocno.UcitajString("Unesite prezime radnika: ", "Prezime radnika je obavezno ");


            //Tražimo unos ispravnog OiB-a
            while (!IspravnostOiB)
            {
                radnik.OiB = Pomocno.UcitajString("Unesite OiB radnika: ", "OiB radnika je obavezan ");
                if (!Provjere.ProvjeriIspavnostOiB(radnik.OiB))
                {
                    Console.WriteLine("Unjeli ste neispravan OiB!!! ");
                }
                else {
                    IspravnostOiB=true;
                }
            }
           
            radnik.DatumZaposlenja = Pomocno.UcitajDatum("Unesite datum zaposlenja radnika u formatu dd.mm.yyyy ", "Datum zaposlenja radnika mora biti u formatu dd.mm.yyyy ");
            //Tražimo unos ispravnog Ibana
            while(!IspravnostIban)
            {
                radnik.Iban = Pomocno.UcitajString("Unesite Iban radnika s predznakom HR: ", "Niste unjeli dobar Iban, Iban račun mora započinjati s HR");
                if(!Provjere.ProvjeriIspravnostHrvatskogIBAN(radnik.Iban))
                {
                    Console.WriteLine("Unjeli ste neispravan Iban, Iban mora započinjati s HR!!");
                }
                else
                {
                    IspravnostIban=true;
                }
            }
           


            Radnici.Add(radnik);
            
        }

        private void UrediPodatkeORadniku()
        {
            if (Radnici.Count != 0)
            {
                PrikaziSveRadnike();
                int index = Pomocno.UcitajRasponBrojeva("Odaberi redni broj radnika: ", "Nije dobar odabir", 1, Radnici.Count());
                var radnik = Radnici[index - 1];
                bool IspravnostOiB = false;
                bool IspravnostIban = false;


                Console.WriteLine("1.Izmjeni šifru radnika ");
                Console.WriteLine("2.Izmeni ime radnika ");
                Console.WriteLine("3.Izmeni prezime radnika ");
                Console.WriteLine("4.Izmjeni OiB radnika ");
                Console.WriteLine("5.Izmjenite datum zaposlenja");
                Console.WriteLine("6.Izmjenite Iban randika");
                Console.WriteLine("7.Odustanite od promjena podataka o radaniku");

                switch (Pomocno.UcitajRasponBrojeva("Odaberite broj između između 1-7 za rad s izbornikom promjena podataka o radniku: ", "Odabreni broj mora biti između 1-7 ", 1, 7))
                {
                    case 1:
                        radnik.Sifra = Pomocno.UcitajCijeliBroj("Unesite šifru radnika ", "Šifra radnika mora biti pozivni cijeli broj");
                        PrikaziSveRadnike();
                        break;
                    case 2:
                        radnik.Ime = Pomocno.UcitajString("Unesite ime radnika ", "Ime radnika je obavezno ");
                        PrikaziSveRadnike();
                        break;
                    case 3:
                        radnik.Prezime = Pomocno.UcitajString("Unesite prezime radnika ", "Prezime radnika je obavezno ");
                        PrikaziSveRadnike();
                        break;
                    case 4:
                        while (!IspravnostOiB)
                        {
                            radnik.OiB = Pomocno.UcitajString("Unesite OiB radnika: ", "OiB radnika je obavezan ");
                            if (!Provjere.ProvjeriIspavnostOiB(radnik.OiB))
                            {
                                Console.WriteLine("Unjeli ste neispravan OiB!!! ");
                            }
                            else
                            {
                                IspravnostOiB = true;
                            }
                        }
                        PrikaziSveRadnike();
                        break;
                    case 5:
                        radnik.DatumZaposlenja = Pomocno.UcitajDatum("Unesite datum zaposlenja radnika u formatu dd.mm.yyyy ", "Datum zaposlenja radnika mora biti u formatu dd/mm/yyyy ");
                        PrikaziSveRadnike();
                        break;
                    case 6:
                        while (!IspravnostIban)
                        {
                            radnik.Iban = Pomocno.UcitajString("Unesite Iban radnika s predznakom HR: ", "Niste unjeli dobar Iban, Iban račun mora započinjati s HR");
                            if (!Provjere.ProvjeriIspravnostHrvatskogIBAN(radnik.Iban))
                            {
                                Console.WriteLine("Unjeli ste neispravan Iban, Iban mora započinjati s HR!!");
                            }
                            else
                            {
                                IspravnostIban = true;
                            }
                        }
                        PrikaziSveRadnike();
                        break;
                    case 7:
                        Console.WriteLine("Završili ste s radom na radnicima! Slijedi povratak na izbornik! ");
                        Thread.Sleep(1000);
                        PrikaziIzbornik();
                        break;
                }
            }
            else
            {
                Console.WriteLine("Prvo morate unjeti radnike kako biste mogli promljeniti podatke o radniku ");
                if(Pomocno.UcitajBool("Želite li dodati radnika obračunu? (da ili bilo što drugo za ne): "))
                {
                    DodajRandika();
                }
                else
                {
                    Console.WriteLine("Slijedi povratak na glavni izbornik rada s radnicima ");
                    Thread.Sleep(1000);
                    PrikaziIzbornik();
                }
            }
            
         }

        private void ObrisiRadnika()
        {
            PrikaziSveRadnike();
            int index = Pomocno.UcitajRasponBrojeva("Odaberi redni broj grupe: ", "Nije dobar odabir", 1, Radnici.Count());
            Radnici.RemoveAt(index - 1);
        }



        private void TesniPodaci()
        {
            Radnici.Add(new Radnik
            {
                Sifra = 1,
                Ime = "Ivan",
                Prezime = "Leninger",
                DatumZaposlenja = new DateTime(2017, 1, 26),
                OiB = "74203130129",
                Iban = "5023600003983799849"
            }); 
        }
    }
}
