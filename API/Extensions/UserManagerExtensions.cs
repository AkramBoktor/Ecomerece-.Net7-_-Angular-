using Core.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Extensions
{
    public static class UserManagerExtensions
    {
        public static async Task<AppUser> FindUserByClaimsPrincipleWithAddress(this UserManager<AppUser> userManager , ClaimsPrincipal claimsPrinciple)
        {
            var emil = claimsPrinciple.FindFirstValue(ClaimTypes.Email);
            
            return await userManager.Users.Include(x=>x.Address).SingleOrDefaultAsync(x=>x.Email == emil);
        }

        public static async Task<AppUser> FindByEmailFromClaimsPrincipal(this UserManager<AppUser> userManager, ClaimsPrincipal claimsPrinciple)
        {

            return await userManager.Users.SingleOrDefaultAsync(x => x.Email == claimsPrinciple.FindFirstValue(ClaimTypes.Email));
        }
    }
}
