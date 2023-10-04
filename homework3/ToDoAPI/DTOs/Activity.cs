namespace ToDoAPI.DTOs;

public class Activity
{
    public required string name { get; set; }
    public required DateTime appoint { get; set; }
    public string? userId { get; set; }
}