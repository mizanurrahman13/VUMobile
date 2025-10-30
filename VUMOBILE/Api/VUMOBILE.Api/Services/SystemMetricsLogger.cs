using Serilog;
using System.Diagnostics;

namespace VUMOBILE.Api.Services;

public class SystemMetricsLogger : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var process = Process.GetCurrentProcess();

        while (!stoppingToken.IsCancellationRequested)
        {
            var memoryUsage = process.WorkingSet64 / (1024 * 1024); // in MB
            var cpuTime = process.TotalProcessorTime.TotalMilliseconds;

            Log.Information("System Metrics @ {Time}: Memory = {Memory} MB, CPU Time = {Cpu} ms",
                DateTime.UtcNow, memoryUsage, cpuTime);

            await Task.Delay(TimeSpan.FromSeconds(10), stoppingToken);
        }
    }
}
