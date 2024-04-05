namespace WebApi_ZavrsniRad.Models
{
    public record RadnikDTORead(int sifra, string ime,string prezime,
        string oib,DateTime datumzaposlenja, string iban, decimal cijenaradnogsata, decimal koeficijentradnogmjesta);
    public record RadnikDTOInsertUpdate(string ime, string prezime,
    string oib, DateTime datumzaposlenja, string iban, decimal cijenaradnogsata, decimal koeficijentradnogmjesta);

    public record PodaciZaObracuneDTORead(int sifra, decimal osnovniosobniodbitak, decimal postotakzaprvimirovinskistup,
        decimal postotakzadrugimirovinskistup, decimal stopaporezanadohodak);
    public record PodaciZaObracuneDTOInsertUpdate(decimal osnovniosobniodbitak, decimal postotakzaprvimirovinskistup,
    decimal postotakzadrugimirovinskistup, decimal stopaporezanadohodak);

    public record  PlacaDTORead(int sifra,int brojradnihsati, DateTime datumpocetkaplace,DateTime datumkrajaplace);

    public record PlacaDTOInsertUpdate(int sifra, int brojradnihsati, DateTime datumpocetkaplace, DateTime datumkrajaplace);



}
