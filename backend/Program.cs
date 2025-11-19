using System.Text;
using Helpers.Options;
using Interfaces;
using Interfaces.IRepositories;
using Interfaces.IServices;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Repositories;
using Services;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddCors();
builder.Services.AddSwaggerGen();

//========= Repositories DI =========
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();
builder.Services.AddScoped<IPostRepository, PostRepository>();

//========= Services DI =========
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IRefreshTokenService, RefreshTokenService>();
builder.Services.AddScoped<IAccessTokenService, AccessTokenService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IPostService, PostService>();

//========= Options DI =========
builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection("JWT"));

//========= Access Token Configuration =========
var jwtOptions = builder.Configuration.GetSection("JWT").Get<JwtOptions>();
if (jwtOptions == null || string.IsNullOrEmpty(jwtOptions.Key) || string.IsNullOrEmpty(jwtOptions.Issuer) || string.IsNullOrEmpty(jwtOptions.Audience))
{
    throw new InvalidOperationException("JWT configuration missing. Ensure 'JWT:Key', 'JWT:Issuer' and 'JWT:Audience' are set in configuration.");
}

//========= Authentication Configuration =======
builder.Services.AddAuthentication()
    .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtOptions.Issuer,
            ValidAudience = jwtOptions.Audience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.Key)),
        };
    });


var app = builder.Build();

// Configure the HTTP request pipeline.
// Swagger UI disabled to avoid Microsoft.OpenApi type load issues during startup.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(policy => policy
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader()
    );

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
