using System.Text;
using Azure.Identity;
using Microsoft.Net.Http.Headers;
using JunkDrawer.Repositories;
using JunkDrawer.Repositories.Interfaces;
using JunkDrawer.Services;
using JunkDrawer.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Load configuration from Azure App Configuration
var connectionString = builder.Configuration.GetConnectionString("AppConfig");
builder.Configuration.AddAzureAppConfiguration(options =>
{
    options.Connect(connectionString);
    options.ConfigureKeyVault(vaultOptions =>
    {
        vaultOptions.SetCredential(new DefaultAzureCredential());
    });
});

// Add services to the container.
var claimKey = builder.Configuration["Jwt:Key"];
var issuer = builder.Configuration["Jwt:Issuer"];
if (claimKey == null || issuer == null)
{
    throw new Exception("Missing 'Jwt' configuration.");
}
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = issuer,
            ValidAudience = issuer,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(claimKey)),
        };

    });
builder.Services.AddControllersWithViews();

builder.Services.AddScoped<IHomeService, HomeService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserTrustedNeighborService, UserTrustedNeighborService>();

builder.Services.AddScoped<IHomeRepository, HomeRepository>();
builder.Services.AddScoped<ITrustedNeighborRepository, TrustedNeighborRepository>();
builder.Services.AddScoped<IUserTrustedNeighborRepository, UserTrustedNeighborRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();

// Add React/Vite frontend
builder.Services.AddSpaStaticFiles(configuration => {
    configuration.RootPath = "clientapp/dist";
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseAuthentication();
app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

// For React/Vite frontend
const string spaPath = "/app";
if (app.Environment.IsDevelopment())
{
    app.MapWhen(y => y.Request.Path.StartsWithSegments(spaPath), client =>
    {
        client.UseSpa(spa =>
        {
            spa.UseProxyToSpaDevelopmentServer("https://localhost:6363");
        });
    });
}
else
{
    app.Map(new PathString(spaPath), client =>
    {
        client.UseSpaStaticFiles();
        client.UseSpa(spa => {
            spa.Options.SourcePath = "clientapp";

            // adds no-store header to index page to prevent deployment issues (prevent linking to old .js files)
            // .js and other static resources are still cached by the browser
            spa.Options.DefaultPageStaticFileOptions = new StaticFileOptions
            {
                OnPrepareResponse = ctx =>
                {
                    var headers = ctx.Context.Response.GetTypedHeaders();
                    headers.CacheControl = new CacheControlHeaderValue
                    {
                        NoCache = true,
                        NoStore = true,
                        MustRevalidate = true
                    };
                }
            };
        });
    });
}
////

app.Run();