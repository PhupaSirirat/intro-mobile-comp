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
        string userId;
        try
        {
            userId = getUserId();
        }
        catch (Exception)
        {
            return StatusCode(403, new { detail = "can't get user id from the token" }); //forbid
        }

        IQueryable<Activity> activities = from act in db.Activity
                                          where act.UserId.Equals(userId)
                                          select act;

        if (!activities.Any()) return NoContent();

        return Ok(activities);
    }

    [Route("{id}")]
    [HttpGet]
    [Authorize(Roles = "user")]
    public IActionResult Get(uint id)
    {
        ToDoDbContext db = new();
        string userId;
        try
        {
            userId = getUserId();
        }
        catch (Exception)
        {
            return StatusCode(403, new { detail = "can't get user id from the token" }); //forbid
        }
        IQueryable<Activity> activities = from act in db.Activity
                                          where act.Id == id && act.UserId.Equals(userId)
                                          select act;

        Activity? activity = activities.FirstOrDefault();
        if (activity == null) return NotFound(new { detail = "can't find activity id: " + id });

        return Ok(activity);
    }

    [HttpPost]
    [Authorize(Roles = "user")]
    public IActionResult Post([FromBody] DTOs.Activity data)
    {
        ToDoDbContext db = new();
        string userId;
        try
        {
            userId = getUserId();
        }
        catch (Exception)
        {
            return StatusCode(403, new { detail = "can't get user id from the token" }); //forbid
        }

        Activity activity = new Models.Activity();
        activity.Name = data.name;
        activity.Appoint = data.appoint;
        activity.UserId = userId;

        db.Activity.Add(activity);
        db.SaveChanges();

        return Ok(new { detail = "Activity added successfully." });
    }

    [Route("{id}")]
    [HttpPut]
    [Authorize(Roles = "user")]
    public IActionResult Put(uint id, [FromBody] DTOs.Activity data)
    {
        ToDoDbContext db = new();
        string userId;
        try
        {
            userId = getUserId();
        }
        catch (Exception)
        {
            return StatusCode(403, new { detail = "can't get user id from the token" }); //forbid
        }

        IQueryable<Activity> activities = from act in db.Activity
                                          where act.Id == id && act.UserId.Equals(userId)
                                          select act;
        Activity? activity = activities.FirstOrDefault();
        if (activity == null) return NotFound(new { detail = "can't find the activity" });

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
        ToDoDbContext db = new();
        string userId;
        try
        {
            userId = getUserId();
        }
        catch (Exception)
        {
            return StatusCode(403, new { detail = "can't get user id from the token" }); //forbid
        }

        IQueryable<Activity> activities = from act in db.Activity
                                          where act.Id == id && act.UserId.Equals(userId)
                                          select act;
        Activity? activity = activities.FirstOrDefault();
        if (activity == null) return NotFound(new { detail = "can't find the activity" });

        db.Activity.Remove(activity);
        db.SaveChanges();

        return Ok(new { detail = "Activity deleted successfully." });
    }

    private string getUserId()
    {
        // Get the Authorization header from the HTTP request
        if (HttpContext.User.Identity is not ClaimsIdentity identity) throw new Exception("Claims identity not found");

        Claim? claim = identity.FindFirst(ClaimTypes.Name) ?? throw new Exception("The identity has no claim");
        return claim.Value;
    }
}