using Microsoft.AspNetCore.Mvc; 
using Microsoft.EntityFrameworkCore;
using TreeRanker.Api.Data; 
using TreeRanker.Api.Models;

namespace TreeRanker.Api.Controllers;

// NOTE: Using AppDbContext as a parameter variable inside the primary constructor instead of as an instance member.
// Will this have unintended consequences??
[ApiController]
[Route("api/[controller]")]
public class TreesController(AppDbContext db) : ControllerBase
{
	[HttpGet]
    public async Task<ActionResult<List<Tree>>> GetTrees()
    {
        var trees = await db.Trees
			.OrderByDescending(t => t.CreatedAt)
			.Take(50)
			.ToListAsync(); 


		return Ok(trees); 
    }
    
    public record CreateTreeRequest(string Name, decimal Latitude, decimal Longitude, decimal Rating);

    [HttpPost]
    public async Task<ActionResult<Tree>> CreateTree([FromBody] CreateTreeRequest request)
    {
	    Console.WriteLine("I made it!");
	    if(string.IsNullOrWhiteSpace(request.Name)) return BadRequest("Name is required");
	    if(request.Rating is < 0 or > 5) return BadRequest("Rating must be between 0 and 5");

	    var tree = new Tree()
	    {
		    Name = request.Name,
		    Latitude = request.Latitude,
		    Longitude = request.Longitude,
		    Rating = request.Rating,
		    CreatedAt = DateTimeOffset.Now.ToUniversalTime()
	    };
	    db.Trees.Add(tree);
	    await db.SaveChangesAsync();
	    return CreatedAtAction(nameof(GetTrees), new { id = tree.Id }, tree);
    }



}