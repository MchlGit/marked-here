using Microsoft.AspNetCore.Mvc; 
using Microsoft.EntityFrameworkCore;
using MarkedHere.Api.Data;
using MarkedHere.Api.Models;

namespace MarkedHere.Api.Controllers;

// NOTE: Using AppDbContext as a parameter variable inside the primary constructor instead of as an instance member.
// Will this have unintended consequences??
[ApiController]
[Route("api/[controller]")]
public class SpotsController(AppDbContext db) : ControllerBase
{
	[HttpGet]
    public async Task<ActionResult<List<Spot>>> GetSpots()
    {
        var spots = await db.Spots
			.OrderByDescending(t => t.CreatedAt)
			.Take(50)
			.ToListAsync(); 


		return Ok(spots); 
    }
    
    public record CreateSpotRequest(string Name, decimal Latitude, decimal Longitude, string City, string Neighborhood, string Region, string Country, string LocationLabel, decimal Rating);

    [HttpPost]
    public async Task<ActionResult<Spot>> CreateSpot([FromBody] CreateSpotRequest request)
    {
	    if(string.IsNullOrWhiteSpace(request.Name)) return BadRequest("Name is required");
	    if(request.Rating is < 0 or > 5) return BadRequest("Rating must be between 0 and 5");

	    var spot = new Spot()
	    {
		    Name = request.Name,
		    Latitude = request.Latitude,
		    Longitude = request.Longitude,
		    Rating = request.Rating,
		    City = request.City,
		    Country = request.Country,
		    Region = request.Region,
		    Neighborhood = request.Neighborhood,
		    LocationLabel = request.LocationLabel,
		    CreatedAt = DateTimeOffset.Now.ToUniversalTime()
	    };
	    db.Spots.Add(spot);
	    await db.SaveChangesAsync();
	    return CreatedAtAction(nameof(GetSpots), new { id = spot.Id }, spot);
    }



}