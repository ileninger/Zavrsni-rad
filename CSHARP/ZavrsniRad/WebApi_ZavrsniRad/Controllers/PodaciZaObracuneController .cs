using Microsoft.AspNetCore.Mvc;
using WebApi_ZavrsniRad.Data;
using WebApi_ZavrsniRad.Extensions;
using WebApi_ZavrsniRad.Models;

namespace WebApi_ZavrsniRad.Controllers
{
    /// <summary>
    /// Namjenjeno za CRUD operacije nad entitetm radnik u bazi
    /// </summary>

    [ApiController]
    [Route("api/v1/[controller]")]
    public class PodaciZaObracuneController : ControllerBase
    {
        /// <summary>
        /// Kontekst za rad s bazom koji  će biti postavljen s pomoću Dependecy Injection-om
        /// </summary>
        private readonly ObracunPlacaContext _context;
        /// <summary>
        /// Konstruktor klase koja prima Radnik kontext pomoću DI principa
        /// </summary>
        /// <param name="context"></param>
        public PodaciZaObracuneController(ObracunPlacaContext context)
        {
            _context = context;
        }
        /// <summary>
        /// Dohvaća sve radnike iz baze
        /// </summary>
        /// <remarks>
        /// Primjer upita
        ///     Get api/v1/Radnik
        /// </remarks>
        /// <returns> Radnici u bazi </returns>
        /// <response code="200">Sve OK </response>
        /// <response code="400">Zahtjev nije valjan</response>
        [HttpGet]
        public IActionResult Get()
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var radnici = _context.PodaciZaObracune.ToList();
                if (radnici == null || radnici.Count == 0)
                {
                    return new EmptyResult();
                }
                return new JsonResult(radnici);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, ex.Message);
            }
        }

        [HttpGet]
        [Route("{sifra:int}")]
        public IActionResult GetBySifra(int sifra)
        {
            // kontrola ukoliko upit nije valjan
            if (!ModelState.IsValid || sifra <= 0)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var podacizaobracune = _context.PodaciZaObracune.Find(sifra);
                if (podacizaobracune == null)
                {
                    return new EmptyResult();
                }
                return new JsonResult(podacizaobracune);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }


        /// <summary>
        /// Dodaje novog radnika u bazu
        /// </summary>
        /// <remarks>
        ///     POST api/v1/Smjer
        ///     {naziv: "Primjer radnika"}
        /// </remarks>
        /// <param name="radnik">Smjer za unijeti u JSON formatu</param>
        /// <response code="201">Kreirano</response>
        /// <response code="400">Zahtjev nije valjan (BadRequest)</response> 
        /// <response code="503">Baza nedostupna iz razno raznih razloga</response> 
        /// <returns>Smjer s šifrom koju je dala baza</returns>
        [HttpPost]
        public IActionResult Post(PodaciZaObracune entitet)
        {
            if (!ModelState.IsValid || entitet == null)
            {
                return BadRequest();
            }
            try
            {

                _context.PodaciZaObracune.Add(entitet);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, entitet);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }
        /// <summary>
        /// Mijenja podatke postojećeg radnika u bazi
        /// </summary>
        /// <remarks>
        /// Primjer upita:
        ///
        ///    PUT api/v1/radnik/1
        ///
        /// {
        ///  "sifra": 0,
        ///  "ime": "Novo ime",
        ///  "prezime": "Novo prezime",
        ///  "Datum zaposlenja": 01.01.2022.,
        ///  "OiB": "74203150129",
        ///  "Iban ": "HR"
        /// }
        ///
        /// </remarks>
        /// <param name="sifra">Šifra smjera koji se mijenja</param>  
        /// <param name="smjer">Smjer za unijeti u JSON formatu</param>  
        /// <returns>Svi poslani podaci od smjera koji su spremljeni u bazi</returns>
        /// <response code="200">Sve je u redu</response>
        /// <response code="204">Nema u bazi smjera kojeg želimo promijeniti</response>
        /// <response code="415">Nismo poslali JSON</response> 
        /// <response code="503">Baza nedostupna</response> 

        [HttpPut]
        [Route("{sifra:int}")]
        public IActionResult Put(int sifra, PodaciZaObracune entitet)
        {
            if (sifra <= 0 || !ModelState.IsValid || entitet == null)
            {
                return BadRequest();
            }


            try
            {


                var entitetIzBaze = _context.PodaciZaObracune.Find(sifra);


                if (entitetIzBaze == null)
                {
                    return StatusCode(StatusCodes.Status204NoContent, sifra);
                }



                // inače ovo rade mapperi
                // za sada ručno
                //entitetIzBaze.BrojRadnihSati = entitet.BrojRadnihSati;
                entitetIzBaze.OsnovniOsobniOdbitak = entitet.OsnovniOsobniOdbitak;
                entitetIzBaze.StopaPorezaNaDohodak = entitet.StopaPorezaNaDohodak;
                entitetIzBaze.PostotakZaPrviMirovinskiStup = entitet.PostotakZaPrviMirovinskiStup;
                entitetIzBaze.PostotakZaDrugiMirovinskiStup = entitet.PostotakZaDrugiMirovinskiStup;

                _context.PodaciZaObracune.Update(entitetIzBaze);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, entitetIzBaze);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }
        [HttpDelete]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int sifra)
        {
            if (!ModelState.IsValid || sifra <= 0)
            {
                return BadRequest();
            }

            try
            {
                var entitetIzbaze = _context.PodaciZaObracune.Find(sifra);

                if (entitetIzbaze == null)
                {
                    return StatusCode(StatusCodes.Status204NoContent, sifra);
                }

                _context.PodaciZaObracune.Remove(entitetIzbaze);
                _context.SaveChanges();

                return new JsonResult(new { poruka = "Obrisano" });

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }

        }
    }
}
