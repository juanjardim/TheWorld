using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;

namespace TheWorld.Services
{
    public class CoordService
    {
        private ILogger<CoordService> _logger;

        public CoordService(ILogger<CoordService> looger)
        {
            _logger = looger;
        }

        public async Task<CoordServiceResult> Lookup(string location)
        {
            var result = new CoordServiceResult
            {
                Success = false,
                Message = "Undertermined failure while looking up coordinates"
            };
            var encondedName = WebUtility.UrlEncode(location);
            var bingKey = Startup.Configuration["AppSettings:BingKey"];
            var url = $"http://dev.virtualearth.net/REST/v1/Locations?q={encondedName}&key={bingKey}";

            var client = new HttpClient();

            var json = await client.GetStringAsync(url);

            var results = JObject.Parse(json);
            var resources = results["resourceSets"][0]["resources"];
            if (!resources.HasValues)
            {
                result.Message = $"Could not find '{location}' as a location";
            }
            else
            {
                var confidendce = (string) resources[0]["confidence"];
                if (confidendce != "High")
                {
                    result.Message = $"Could not find a confident match for '{location}' as location ";
                }
                else
                {
                    var coords = resources[0]["geocodePoints"][0]["coordinates"];
                    result.Latitude = (double) coords[0];
                    result.Longitude = (double) coords[1];
                    result.Success = true;
                    result.Message = "Success";
                }
            }

            return result;
        }
    }
}