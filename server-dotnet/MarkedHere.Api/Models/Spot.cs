using System;
namespace MarkedHere.Api.Models;

public class Spot
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public decimal Latitude {get; set;}
    public decimal Longitude {get; set;}
    public decimal Rating {get; set;}
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;

}