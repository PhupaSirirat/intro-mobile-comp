using System;
using System.Collections.Generic;

namespace ToDoAPI.Models;

public partial class Activity
{
    public uint Id { get; set; }

    public string? Name { get; set; }

    public DateTime Appoint { get; set; }

    public string UserId { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
