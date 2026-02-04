using Microsoft.AspNetCore.HttpLogging;
using Microsoft.EntityFrameworkCore;
using MarkedHere.Api.Data;

var builder = WebApplication.CreateBuilder(args);

// Set port explicitly
builder.WebHost.UseUrls("http://0.0.0.0:8080");

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddControllers(); 
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHealthChecks();

builder.Services.AddDbContext<AppDbContext>(options => 
	options.UseNpgsql(builder.Configuration.GetConnectionString("Default"))
);

builder.Services.AddHttpLogging(options =>
{
	options.LoggingFields = HttpLoggingFields.All;
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("DevCors", policy =>
        policy
            .WithOrigins("http://localhost:5173", "https://www.markedhere.com") // Vite Dev Server, Prod
            .AllowAnyHeader()
            .AllowAnyMethod()
    );
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.UseRouting();
app.UseCors("DevCors");

app.MapControllers();
app.MapHealthChecks("/health");

app.UseHttpsRedirection();
app.UseHttpLogging();


app.Run();
