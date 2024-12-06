namespace ExpenseTrackerAPI.Models;

public class Expense
{
    public int Id { get; set; }
    public required string Description { get; set; }
    public required string Category { get; set; }
    public required decimal Amount { get; set; }
    public required DateTime Date { get; set; }
}
