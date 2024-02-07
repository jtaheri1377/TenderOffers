using TenderNetCore.Config;
using TenderNetCore.Config.Extentions;
using TenderNetCore.Interfaces;
using TenderNetCore.Services;



var builder = WebApplication.CreateBuilder(args);

//var _configuration = builder.Configuration.

// configure strongly typed settings objects
var appSettingsSection = builder.Configuration.GetSection("AppSettings");
builder.Services.Configure<AppSettings>(appSettingsSection);

// configure jwt authentication
var appSettings = appSettingsSection.Get<AppSettings>();
builder.Services.AddAuthExtention(appSettings);
builder.Services.AddAuthorization();
builder.Services.AddSwaggerTokenField();



builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<ITenderService, TenderService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IUserService, UserService>();




var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseCors(a =>
{
    a.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
});

app.UseJwtMiddleware();

app.UseAuthentication();
app.UseAuthorization();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
    });
}
app.UseDeveloperExceptionPage();

app.MapControllers();

app.Run();
