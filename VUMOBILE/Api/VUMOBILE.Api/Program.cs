using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Serilog;
using VUMOBILE.Api.Data;
using VUMOBILE.Api.Services;

var builder = WebApplication.CreateBuilder(args);


Log.Logger = new LoggerConfiguration()
    .WriteTo.File("logs/system_metrics.log", rollingInterval: RollingInterval.Day)
    .CreateLogger();

builder.Host.UseSerilog();

builder.Services.AddControllers();
builder.Services.AddMemoryCache();
builder.Services.AddDbContext<VUMobileDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddHostedService<SystemMetricsLogger>();
builder.Services.AddHealthChecks();

var app = builder.Build();


app.UseSwagger();
app.UseSwaggerUI(); // This enables /swagger endpoint

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.MapHealthChecks("/health");

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<VUMobileDbContext>();
    db.Database.EnsureCreated();
}

app.Run();
