using Microsoft.EntityFrameworkCore;
using TreeRanker.Api.Models;

namespace TreeRanker.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

    public DbSet<Tree> Trees => Set<Tree>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Tree>(e =>
        {
            e.Property(t => t.Name).IsRequired().HasMaxLength(255);
            e.Property(t => t.Rating).IsRequired();
        });
    }
}