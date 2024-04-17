using Microsoft.AspNetCore.Mvc;
using WebApi_ZavrsniRad.Data;
using WebApi_ZavrsniRad.Extensions;
using WebApi_ZavrsniRad.Models;

namespace WebApi_ZavrsniRad.Controllers
{
    /// <summary>
    /// Namjenjeno za CRUD operacije nad entitetm PodaciZaObracun u bazi
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
        /// Konstruktor klase koja prima PodaciZaObracun kontext pomoću DI principa
        /// </summary>
        /// <param name="context"></param>
        public PodaciZaObracuneController(ObracunPlacaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var podacizaobracune = _context.PodaciZaObracune.ToList();
                if (podacizaobracune == null || podacizaobracune.Count == 0)
                {
                    return BadRequest("Ne postoje podaci o odbicima  u bazi");
                }
                return new JsonResult(podacizaobracune.MapPodaciZaObracuneReadList());
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
                    return BadRequest("Smjer s šifrom " + sifra + " ne postoji");
                }
                return new JsonResult(podacizaobracune.MapPodaciZaObracuneInsertUpdateToDTO());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }

        [HttpPost]
        public IActionResult Post(PodaciZaObracuneDTOInsertUpdate entitet)
        {
            if (!ModelState.IsValid || entitet == null)
            {
                return BadRequest();
            }
            try
            {

                var podacizaobracune = entitet.MapPodaciZaObracuneInsertUpdateFromDTO(new PodaciZaObracune());
                _context.PodaciZaObracune.Add(podacizaobracune);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, podacizaobracune.MapPodaciZaObracuneReadToDTO());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }

        [HttpPut]
        [Route("{sifra:int}")]
        public IActionResult Put(int sifra, PodaciZaObracuneDTOInsertUpdate entitet)
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
                    return BadRequest("Ne postoje smjer s šifrom " + sifra + " u bazi");
                }



                var podacizaobracun = entitet.MapPodaciZaObracuneInsertUpdateFromDTO(entitetIzBaze);
   
                _context.PodaciZaObracune.Update(podacizaobracun);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, podacizaobracun.MapPodaciZaObracuneReadToDTO());
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
                    return BadRequest("Ne postoji smjer s šifrom " + sifra + " u bazi"); 
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
