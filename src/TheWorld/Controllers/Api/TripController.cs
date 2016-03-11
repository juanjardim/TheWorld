using System;
using System.Collections.Generic;
using System.Net;
using AutoMapper;
using Microsoft.AspNet.Mvc;
using Microsoft.Extensions.Logging;
using TheWorld.Models;
using TheWorld.ViewModels;

namespace TheWorld.Controllers.Api
{
    [Route("api/trips")]
    public class TripController : Controller
    {
        private readonly ILogger<TripController> _logger;
        private readonly IWorldRepository _repository;

        public TripController(IWorldRepository repository, ILogger<TripController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet]
        public JsonResult Get()
        {
            var result = Mapper.Map<IEnumerable<TripViewModel>>(_repository.GetAllTripsWithStops());
            return Json(result);
        }

        [HttpPost]
        public JsonResult Post([FromBody] TripViewModel vm)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var newTrip = Mapper.Map<Trip>(vm);
                    _logger.LogInformation("Attempting to save new trip");

                    _repository.AddTrip(newTrip);

                    if (_repository.SaveAll())
                    {
                        Response.StatusCode = (int) HttpStatusCode.Created;
                        return Json(Mapper.Map<TripViewModel>(newTrip));
                    }
                }
                Response.StatusCode = (int) HttpStatusCode.BadRequest;
                return Json(new
                {
                    Message = "Failed",
                    ModelState
                });
            }
            catch (Exception ex)
            {
                _logger.LogError("Fail to save new trip", ex);
                Response.StatusCode = (int) HttpStatusCode.BadRequest;
                return Json(new
                {
                    ex.Message
                });
            }
        }
    }
}