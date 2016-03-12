using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Data.Entity;
using Microsoft.Extensions.Logging;

namespace TheWorld.Models
{
    public class WorldRepository : IWorldRepository
    {
        private readonly WorldContext _context;
        private readonly ILogger<WorldRepository> _logger;

        public WorldRepository(WorldContext context, ILogger<WorldRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public IEnumerable<Trip> GetAllTrips()
        {
            try
            {
                return _context.Trips.OrderBy(t => t.Name).ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError("Could no get trips from database", ex);
                return null;
            }
        }

        public IEnumerable<Trip> GetAllTripsWithStops()
        {
            try
            {
                return _context.Trips
                    .Include(t => t.Stops)
                    .OrderBy(t => t.Name)
                    .ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError("Could no get trips with stops from database", ex);
                return null;
            }
        }

        public void AddTrip(Trip newTrip)
        {
            _context.Add(newTrip);
        }

        public bool SaveAll()
        {
            return _context.SaveChanges() > 0;
        }

        public Trip GetTripByName(string tripName, string username)
        {
            try
            {
                return _context.Trips
                .Include(t => t.Stops)
                .FirstOrDefault(t => t.Name == tripName && t.UserName == username);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Could not get the trip {tripName} for user: {username} in the database", ex);
                return null;
            }

        }

        public void AddStop(string tripName, string userName, Stop newStop)
        {
            try
            {
                var theTrip = GetTripByName(tripName, userName);
                if (theTrip == null)
                    throw new Exception("Trip not found");
                if (!theTrip.Stops.Any())
                    newStop.Order = 1;
                else
                    newStop.Order = theTrip.Stops.Max(s => s.Order) + 1;
                theTrip.Stops.Add(newStop);
                _context.Stops.Add(newStop);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Could not add the stop for trip: {tripName}; {userName} to the database", ex);
            }
        }

        public IEnumerable<Trip> GetUserTripsWithStops(string name)
        {
            try
            {
                return _context.Trips
                    .Include(t => t.Stops)
                    .OrderBy(t => t.Name)
                    .Where(t => t.UserName == name)
                    .ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Could not get trips with stops for user; {name} from database", ex);
                return null;
            }
        }
    }
}