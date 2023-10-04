using Microsoft.AspNetCore.Mvc;
using ToDoAPI.Models;
using Microsoft.AspNetCore.Authorization;

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

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

        IQueryable<Activity> activities = from a in db.Activity select a;
        activities = activities.Where(act => act.UserId.Equals(userName));
        if (!activities.Any()) return NoContent();


        return Ok(activities);
    }

    [Route("{id}")]
    [HttpGet]
    [Authorize(Roles = "user")]
    public IActionResult Get(uint id)
    {
        ToDoDbContext db = new ToDoDbContext();
        string userName = getUserName();
        IQueryable<Activity> activities = from a in db.Activity select a;
        activities = activities.Where(act => act.UserId.Equals(userName));
        activities = activities.Where(act => act.Id.Equals(id));

        if (activities == null) return NotFound(new { detail = "can't find activity id: " + id });

        return Ok(activities.FirstOrDefault());
    }

    [HttpPost]
    [Authorize(Roles = "user")]
    public IActionResult Post([FromBody] DTOs.Activity data)
    {
        ToDoDbContext db = new ToDoDbContext();
        string userName = getUserName();

        Activity activity = new Models.Activity();
        activity.Name = data.name;
        activity.Appoint = data.appoint;
        activity.UserId = userName;

        db.Activity.Add(activity);
        db.SaveChanges();

        return Ok(new { detail = "Activity added successfully." });
    }

    [Route("{id}")]
    [HttpPut]
    [Authorize(Roles = "user")]
    public IActionResult Put(uint id, [FromBody] DTOs.Activity data)
    {
        ToDoDbContext db = new ToDoDbContext();
        string userName = getUserName();
        IQueryable<Activity> activities = from a in db.Activity select a;
        activities = activities.Where(act => act.UserId.Equals(userName));
        activities = activities.Where(act => act.Id.Equals(id));
        Activity activity = activities.FirstOrDefault();
        activity.Name = data.name;
        activity.Appoint = data.appoint;

        db.SaveChanges();

        return Ok(new { detail = "Activity updated successfully." });
    }

    [Route("{id}")]
    [HttpDelete]
    [Authorize(Roles = "user")]
    public IActionResult Delete(uint id)
    {
        ToDoDbContext db = new ToDoDbContext();
        string userName = getUserName();
        IQueryable<Activity> activities = from a in db.Activity select a;
        activities = activities.Where(act => act.UserId.Equals(userName));
        activities = activities.Where(act => act.Id.Equals(id));

        Activity activity = activities.FirstOrDefault();

        db.Activity.Remove(activity);
        db.SaveChanges();

        return Ok(new { detail = "Activity deleted successfully." });
    }

    private string getUserName()
    {
        // Get the Authorization header from the HTTP request
        ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;
        var a = identity.FindFirst(ClaimTypes.Name).Value;
        return a;
    }
}