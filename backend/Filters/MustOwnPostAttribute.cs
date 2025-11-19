using System.Security.Claims;
using Interfaces.IServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Filters
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false)]
    public class MustOwnPostAttribute : Attribute, IAsyncAuthorizationFilter
    {
        private readonly IPostService _postService;
        public MustOwnPostAttribute(IPostService postService)
        {
            _postService = postService;
        }

        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            // get user id from claims
            var userIdClaim = context.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                context.Result = new UnauthorizedResult(); // Unauthorized
                return;
            }

            int userId = int.Parse(userIdClaim.Value);

            // get post id from route data
            if (!context.RouteData.Values.TryGetValue("postId", out var postIdObj) ||
                !int.TryParse(postIdObj.ToString(), out var postId))
            {
                context.Result = new BadRequestResult(); // Bad Request
                return;
            }

            // check if the user owns the post
            var post = await _postService.GetByIdAsync(postId);
            if (post == null || post.Author.Id != userId)
            {
                context.Result = new ForbidResult(); // Forbidden
                return;
            }
        }
    }
}