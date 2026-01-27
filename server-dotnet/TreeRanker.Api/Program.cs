using Microsoft.AspNetCore.HttpLogging;
using Microsoft.EntityFrameworkCore;
using TreeRanker.Api.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddControllers(); 
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(); 

builder.Services.AddDbContext<AppDbContext>(options => 
	options.UseNpgsql(builder.Configuration.GetConnectionString("Default"))
);

builder.Services.AddHttpLogging(o =>
{
	o.LoggingFields = HttpLoggingFields.All; 
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.MapControllers();  

app.UseHttpsRedirection();
app.UseHttpLogging();

app.Run();
