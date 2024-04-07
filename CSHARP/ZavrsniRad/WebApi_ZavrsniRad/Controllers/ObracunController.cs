using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
    public class ObracunController : ControllerBase
    {
        /// <summary>
        /// Kontekst za rad s bazom koji  će biti postavljen s pomoću Dependecy Injection-om
        /// </summary>
        private readonly ObracunPlacaContext _context;
        /// <summary>
        /// Konstruktor klase koja prima Radnik kontext pomoću DI principa
        /// </summary>
        /// <param name="context"></param>
        public ObracunController(ObracunPlacaContext context)
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
                var lista = _context.Obracuni
                    .Include(g=>g.Radnik)
                    .Include(g=>g.PodaciZaObracun)
                    .Include(g=>g.Placa)                   
                    .ToList();
                if (lista == null || lista.Count == 0)
                {
                    return BadRequest("Ne postoje obračun u bazi");
                }
                return new JsonResult(lista.MapObracunReadList());
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
                var obracun = _context.Obracuni
                    .Include(i=>i.Radnik)
                    .Include(i=>i.PodaciZaObracun)
                    .Include(i=>i.Placa)
                    .FirstOrDefault(x => x.Sifra == sifra);
                if (obracun == null)
                {
                    return BadRequest("Ne postoji obračun s šifrom " + sifra + " u bazi");
                }
                return new JsonResult(obracun.MapObracunInsertUpdateToDTO());
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
        public IActionResult Post(ObracunDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid || dto == null)
            {
                return BadRequest();
            }

            var radnici = _context.Radnici.Find(dto.radnikSifra);

            if  (radnici == null)
            {
                return BadRequest("Ne postoji radnik s šifrom " + dto.radnikSifra + " u bazi");
            }

            var podacizaobracun = _context.PodaciZaObracune.Find(dto.podacizaobracunSifra);
            if (podacizaobracun == null)
            {
                return BadRequest("Ne postoje podaci za obračun s šifrom " + dto.podacizaobracunSifra + " u bazi");

            }

            var placa = _context.Place.Find(dto.placaSifra);
            if (placa == null)
            {
                return BadRequest("Ne postoji plača s šifrom " + dto.placaSifra + " u bazi");
            }

            var entitet = dto.MapObracunInsertUpdateFromDTO(new Obracun());

            entitet.Radnik = radnici;
            entitet.PodaciZaObracun = podacizaobracun;
            entitet.Placa = placa;

            try
            {
                _context.Obracuni.Add(entitet);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, entitet.MapObraunReadToDTO());
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
        public IActionResult Put(int sifra, ObracunDTOInsertUpdate dto)
        {
            if (sifra <= 0 || !ModelState.IsValid || dto == null)
            {
                return BadRequest();
            }


            try
            {
                var entitet = _context.Obracuni
                    .Include(i => i.Radnik)
                    .Include(i => i.PodaciZaObracun)
                    .Include(i => i.Placa)
                    .FirstOrDefault(x => x.Sifra == sifra);
                
                if (entitet == null)
                {
                    return BadRequest("Ne postoji obračun s šifrom " + sifra + " u bazi"); ;
                }

                var radnici = _context.Radnici.Find(dto.radnikSifra);

                if (radnici == null)
                {
                    return BadRequest("Ne postoji radnik s šifrom " + dto.radnikSifra + " u bazi");
                }

                var podacizaobracun = _context.PodaciZaObracune.Find(dto.podacizaobracunSifra);
                if (podacizaobracun == null)
                {
                    return BadRequest("Ne postoje podaci za obračun s šifrom " + dto.podacizaobracunSifra + " u bazi");

                }

                var placa = _context.Place.Find(dto.placaSifra);
                if (placa == null)
                {
                    return BadRequest("Ne postoji plača s šifrom " + dto.placaSifra + " u bazi");
                }

                entitet = dto.MapObracunInsertUpdateFromDTO(new Obracun());

                entitet.Radnik = radnici;
                entitet.PodaciZaObracun = podacizaobracun;
                entitet.Placa = placa;



                _context.Obracuni.Update(entitet);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, entitet.MapObraunReadToDTO());
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
                var entitetIzbaze = _context.Obracuni.Find(sifra);

                if (entitetIzbaze == null)
                {
                    return BadRequest("Ne postoji grupa s šifrom " + sifra + " u bazi");
                }

                _context.Obracuni.Remove(entitetIzbaze);
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

