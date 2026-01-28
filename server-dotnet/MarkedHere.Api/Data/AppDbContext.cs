using Microsoft.EntityFrameworkCore;
using MarkedHere.Api.Models;

namespace MarkedHere.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

    public DbSet<Spot> Spots => Set<Spot>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Spot>(e =>
        {
            e.Property(t => t.Name).IsRequired().HasMaxLength(255);
            e.Property(t => t.Rating).IsRequired();
        });
    }
}