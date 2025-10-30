using Bogus;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using System;
using VUMOBILE.Api.Data;
using VUMOBILE.Api.Models;

namespace VUMOBILE.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly VUMobileDbContext _context;
        private readonly IMemoryCache _cache;

        public UsersController(VUMobileDbContext context, IMemoryCache cache)
        {
            _context = context;
            _cache = cache;
        }

        [HttpPost("create-users")]
        public async Task<IActionResult> CreateUser()
        {
            var faker = new Faker<User>()
                .RuleFor(u => u.Name, f => f.Name.FullName())
                .RuleFor(u => u.Age, f => f.Random.Int(18, 80))
                .RuleFor(u => u.Email, f => f.Internet.Email())
                .RuleFor(u => u.TimeStamp, f => DateTime.UtcNow);

            var user = faker.Generate();
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            _cache.Remove("users");

            return Ok(user);
        }

        [HttpPost("create-bulk-users")]
        public async Task<IActionResult> CreateBulkUsers()
        {
            var faker = new Faker<User>()
                .RuleFor(u => u.Name, f => f.Name.FullName())
                .RuleFor(u => u.Age, f => f.Random.Int(18, 80))
                .RuleFor(u => u.Email, f => f.Internet.Email())
                .RuleFor(u => u.TimeStamp, f => DateTime.UtcNow);

            var users = faker.Generate(10_000);
            await _context.Users.AddRangeAsync(users);
            await _context.SaveChangesAsync();
            _cache.Remove("users");

            return Ok(new { Message = "10,000 users created." });
        }

        [HttpGet("fetch-users")]
        public async Task<IActionResult> FetchUsers([FromQuery] int page = 1, [FromQuery] int pageSize = 50)
        {
            // Validate page parameters
            if (page <= 0) page = 1;
            if (pageSize <= 0 || pageSize > 1000) pageSize = 50;

            string cacheKey = $"users_page_{page}_size_{pageSize}";

            if (!_cache.TryGetValue(cacheKey, out List<User>? users))
            {
                users = await _context.Users
                    .AsNoTracking()
                    .OrderBy(u => u.Id)
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();

                var cacheOptions = new MemoryCacheEntryOptions()
                    .SetSlidingExpiration(TimeSpan.FromMinutes(5));

                _cache.Set(cacheKey, users, cacheOptions);
            }

            return Ok(users);
        }
    }
}
