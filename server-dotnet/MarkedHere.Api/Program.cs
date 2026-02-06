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
	{
	    options.UseNpgsql(builder.Configuration.GetConnectionString("Default"));
	    options.EnableDetailedErrors();
	}
);

builder.Services.AddHttpLogging(options =>
{
	options.LoggingFields = HttpLoggingFields.All;
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("DevCors", policy =>
        policy
            .WithOrigins("http://localhost:5173", "https://www.markedhere.com","https://marked-here.pages.dev") // Vite Dev Server, Prod
            .AllowAnyHeader()
            .AllowAnyMethod()
    );
});

var app = builder.Build();

if(app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseSwagger();
app.UseSwaggerUI();
app.UseRouting();
app.UseCors("DevCors");

app.MapControllers();
app.MapHealthChecks("/health");

app.UseHttpsRedirection();
app.UseHttpLogging();

app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        var logger = context.RequestServices.GetRequiredService<ILogger<Program>>();
        var feature = context.Features.Get<Microsoft.AspNetCore.Diagnostics.IExceptionHandlerFeature>();
        if(feature?.Error != null)
        {
            logger.LogError(feature.Error, "Unhandled exception for {Method} {Path}", context.Request.Method, context.Request.Path);
        }

        context.Response.StatusCode = 500;
        context.Response.ContentType = "application/problem+json";
        await context.Response.WriteAsJsonAsync(new
        {
            type = "https://httpstatuses.com/500",
            title = "Internal Server Error",
            status = 500,
            detail = feature?.Error?.Message
        });
    });
});


app.Run();
