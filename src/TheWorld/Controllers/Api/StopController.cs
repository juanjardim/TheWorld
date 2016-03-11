using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNet.Mvc;
using Microsoft.Extensions.Logging;
using TheWorld.Models;
using TheWorld.Services;
using TheWorld.ViewModels;

namespace TheWorld.Controllers.Api
{
    [Route("/api/trips/{tripName}/stops")]
    public class StopController : Controller
    {
        private readonly ILogger<StopController> _logger;
        private readonly IWorldRepository _repository;
        private readonly CoordService _coordService;

        public StopController(IWorldRepository repository,
            ILogger<StopController> logger, CoordService coordService)
        {
            _repository = repository;
            _logger = logger;
            _coordService = coordService;
        }

        [HttpGet]
        public JsonResult Get(string tripName)
        {
            try
            {
                var results = _repository.GetTripByName(tripName);
                if (results == null)
                {
                    return Json(null);
                }
                return Json(Mapper.Map<IEnumerable<StopViewModel>>(results.Stops.OrderBy(s => s.Order)));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get stops for trip {tripName}", ex);
                Response.StatusCode = (int) HttpStatusCode.BadRequest;
                return Json(new
                {
                    message = ex.Message
                });
            }
        }

        [HttpPost]
        public async Task<JsonResult> Post(string tripName, [FromBody] StopViewModel vm)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var newStop = Mapper.Map<Stop>(vm);

                    var coordResult = await _coordService.Lookup(newStop.Name);

                    if (!coordResult.Success)
                    {
                        Response.StatusCode = (int) HttpStatusCode.BadRequest;
                        return Json(coordResult.Message);
                    }

                    newStop.Longitude = coordResult.Longitude;
                    newStop.Latitude = coordResult.Latitude;

                    _repository.AddStop(tripName, newStop);

                    if (_repository.SaveAll())
                    {
                        Response.StatusCode = (int) HttpStatusCode.Created;
                        return Json(Mapper.Map<StopViewModel>(newStop));
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to save the new stop into {tripName}", ex);
                Response.StatusCode = (int) HttpStatusCode.BadRequest;
                return Json(new
                {
                    message = ex.Message
                });
            }

            Response.StatusCode = (int) HttpStatusCode.BadRequest;
            return Json("Validation failed on new stop");
        }
    }
}