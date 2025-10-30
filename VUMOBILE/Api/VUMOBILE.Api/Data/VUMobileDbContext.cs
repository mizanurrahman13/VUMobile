using Microsoft.EntityFrameworkCore;
using System;
using VUMOBILE.Api.Models;

namespace VUMOBILE.Api.Data;

public class VUMobileDbContext : DbContext
{
    public VUMobileDbContext(DbContextOptions<VUMobileDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
}
