using System;
namespace MarkedHere.Api.Models;

public class Spot
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public decimal Latitude {get; set;}
    public decimal Longitude {get; set;}
    public string Neighborhood { get; set; }
    public string Region { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
    public string LocationLabel { get; set; }
    public decimal Rating {get; set;}
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;

}