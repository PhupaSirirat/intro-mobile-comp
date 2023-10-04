using Microsoft.AspNetCore.Mvc;
using ToDoAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.VisualBasic;



using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Reflection.Metadata.Ecma335;

namespace ToDoAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class ActivitiesController : ControllerBase
{
    private readonly ILogger<ActivitiesController> _logger;

    public ActivitiesController(ILogger<ActivitiesController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    [Authorize(Roles = "user")]
    public IActionResult Get()
    {
        ToDoDbContext db = new ToDoDbContext();
        string userName = getUserName();
        return Ok(new { name = userName });

        IQueryable<Activity> activities = from a in db.Activity select a;
        activities = activities.Where(act => act.UserId.Equals(userName));
        if (!activities.Any()) return NoContent();


        return Ok(activities);
    }

    [Route("{id}")]
    [HttpGet]
    public IActionResult Get(uint id)
    {
        ToDoDbContext db = new ToDoDbContext();

        Activity activity = db.Activity.Find(id);
        if (activity == null) return NotFound(new { detail = "can't find activity id: " + id });

        return Ok(activity);
    }

    [HttpPost]
    public IActionResult Post([FromBody] DTOs.Activity data)
    {
        ToDoDbContext db = new ToDoDbContext();

        Activity activity = new Models.Activity();
        activity.Name = data.name;
        activity.Appoint = data.appoint;
        activity.UserId = data.userId;

        db.Activity.Add(activity);
        db.SaveChanges();

        return Ok(new { detail = "Activity added successfully." });
    }

    [Route("{id}")]
    [HttpPut]
    public IActionResult Put(uint id, [FromBody] DTOs.Activity data)
    {
        ToDoDbContext db = new ToDoDbContext();
        Activity activity = db.Activity.Find(id);
        activity.Name = data.name;
        activity.Appoint = data.appoint;

        db.SaveChanges();

        return Ok(new { detail = "Activity updated successfully." });
    }

    [Route("{id}")]
    [HttpDelete]
    public IActionResult Delete(uint id)
    {
        ToDoDbContext db = new ToDoDbContext();
        Activity activity = db.Activity.Find(id);

        db.Activity.Remove(activity);
        db.SaveChanges();

        return Ok(new { detail = "Activity deleted successfully." });
    }

    private string getUserName()
    {
        // Get the Authorization header from the HTTP request
        string authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

        // Check if the header is present and starts with "Bearer "
        if (!string.IsNullOrEmpty(authorizationHeader) && authorizationHeader.StartsWith("Bearer "))
        {
            // Extract the token (removing "Bearer " prefix)
            string tokenText = authorizationHeader.Substring("Bearer ".Length);

            // Now, 'token' contains the actual Bearer token
            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(tokenText);

            // Access claims from the token
            return token.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value;
        }
        throw new Exception("the token is null or header does not start with bearer");

    }
}