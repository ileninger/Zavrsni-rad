using Microsoft.AspNetCore.Mvc;

using WebApi_ZavrsniRad.Data;
using WebApi_ZavrsniRad.Extensions;
using WebApi_ZavrsniRad.Models;

namespace WebApi_ZavrsniRad.Controllers
{
    /// <summary>
    /// Namjenjeno za CRUD operacije nad entitetm Place u bazi
    /// </summary>

    [ApiController]
    [Route("api/v1/[controller]")]
    public class PlacaController : ControllerBase
    {
        /// <summary>
        /// Kontekst za rad s bazom koji  će biti postavljen s pomoću Dependecy Injection-om
        /// </summary>
        private readonly ObracunPlacaContext _context;
        /// <summary>
        /// Konstruktor klase koja prima Placa kontext pomoću DI principa
        /// </summary>
        /// <param name="context"></param>
        public PlacaController(ObracunPlacaContext context)
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
                var lista = _context.Place.ToList();
                if (lista == null || lista.Count == 0)
                {
                    return new EmptyResult();
                }
                return new JsonResult(lista.MapPlacaReadList());
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
                var placa = _context.Place.Find(sifra);
                if (placa == null)
                {
                    return new EmptyResult();
                }
                return new JsonResult(placa.MapPlacaInsertUpdateToDTO());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }


        [HttpPost]
        public IActionResult Post(PlacaDTOInsertUpdate entitet)
        {
            if (!ModelState.IsValid || entitet == null)
            {
                return BadRequest();
            }
            try
            {
                var place = entitet.MapPlacaInsertUpdateFromDTO(new Place());
                _context.Place.Add(place);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, place.MapPlacaReadToDTO());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }

        [HttpPut]
        [Route("{sifra:int}")]
        public IActionResult Put(int sifra, PlacaDTOInsertUpdate entitet)
        {
            if (sifra <= 0 || !ModelState.IsValid || entitet == null)
            {
                return BadRequest();
            }


            try
            {


                var entitetIzBaze = _context.Place.Find(sifra);


                if (entitetIzBaze == null)
                {
                    return StatusCode(StatusCodes.Status204NoContent, sifra);
                }



                // inače ovo rade mapperi
                // za sada ručno
                var placa = entitet.MapPlacaInsertUpdateFromDTO(entitetIzBaze);

                _context.Place.Update(placa);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, placa.MapPlacaReadToDTO());
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
                var entitetIzbaze = _context.Place.Find(sifra);

                if (entitetIzbaze == null)
                {
                    return StatusCode(StatusCodes.Status204NoContent, sifra);
                }

                _context.Place.Remove(entitetIzbaze);
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

