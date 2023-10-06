using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace ToDoAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class PasswordController : ControllerBase
{
    private readonly ILogger<PasswordController> _logger;

    public PasswordController(ILogger<PasswordController> logger)
    {
        _logger = logger;
    }

    [HttpPost]
    public IActionResult Post([FromBody] DTOs.Password data)
    {
        byte[] hshPass = KeyDerivation.Pbkdf2(
            password: data.password,
            salt: Convert.FromBase64String(data.salt),
            prf: KeyDerivationPrf.HMACSHA1,
            iterationCount: 10000,
            numBytesRequested: 256 / 8
        );
        string b64Pass = Convert.ToBase64String(hshPass);
        return Ok(new
        {
            password = b64Pass,
            salt = data.salt
        });
    }
}
