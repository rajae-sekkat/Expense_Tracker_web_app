using Microsoft.AspNetCore.Mvc;
using ExpenseTrackerAPI.Models;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;
using System.Security.Claims;
using System.Text;

namespace ExpenseTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ExpenseTrackerDbContext _context;
        private readonly IConfiguration _configuration;

        // Constructor to inject the DbContext and Configuration
        public AuthController(ExpenseTrackerDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // POST: api/auth/signup
        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] User user)
        {
            // Validate input
            if (user == null || string.IsNullOrWhiteSpace(user.Username) || string.IsNullOrWhiteSpace(user.Email) ||
                string.IsNullOrWhiteSpace(user.Password))
            {
                return BadRequest(new { message = "Invalid data." });
            }

            // Check if the username or email already exists in the database
            if (await _context.Users.AnyAsync(u => u.Username == user.Username || u.Email == user.Email))
            {
                return Conflict(new { message = "Username or email already exists." });
            }

            // Hash the user's password before saving it
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            // Save the new user in the database
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Return a response with the 201 Created status code
            return CreatedAtAction(nameof(SignUp), new { id = user.Id }, new { message = "User successfully created!", username = user.Username });
        }

        // POST: api/auth/login
        // POST: api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLogin userLogin)
        {
            // Check if the user exists in the database by username
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == userLogin.Username);

            // If the user exists, verify the password
            if (user != null && BCrypt.Net.BCrypt.Verify(userLogin.Password, user.Password))
            {
                return Ok(new { message = "Login successful!", username = user.Username, });
            }

            // If the user does not exist or password doesn't match
            return Unauthorized(new { message = "Invalid username or password." });
        }

        // User login model
        public class UserLogin
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }
    }
}