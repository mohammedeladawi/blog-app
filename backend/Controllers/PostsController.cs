using System.Security.Claims;
using System.Threading.Tasks;
using DTOs;
using Filters;
using Interfaces.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class PostController : ControllerBase
    {
        private readonly IPostService _postService;
        public PostController(IPostService postService)
        {
            _postService = postService;
        }

        [AllowAnonymous]
        [HttpGet("top")]
        public async Task<ActionResult<IEnumerable<PostDto>>> GetTopPostsAsync()
        {
            try
            {
                var posts = await _postService.GetPostsAsync(0, 4);
                return Ok(posts);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetPostsAsync(int offset, int limit)
        {
            try
            {
                var posts = await _postService.GetPostsAsync(offset, limit);
                int totalCount = await _postService.GetTotalCountAsync();
                return Ok(new { Posts = posts, TotalCount = totalCount });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{slug}")]
        public async Task<ActionResult<PostDto>> GetPostBySlugAsync(string slug)
        {
            try
            {
                var post = await _postService.GetBySlugAsync(slug);
                return Ok(post);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreatePostAsync(CreatePostDto createPostDto)
        {
            try
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
                int postId = await _postService.CreateAsync(createPostDto, userId);

                return Ok(new { Message = "Post created successfully", PostId = postId });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{postId}")]
        [TypeFilter(typeof(MustOwnPostAttribute))]
        public async Task<IActionResult> DeletePostAsync(int postId)
        {
            try
            {
                await _postService.DeleteByIdAsync(postId);
                return Ok(new { Message = "Post deleted successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPut("{postId}")]
        [TypeFilter(typeof(MustOwnPostAttribute))]
        public async Task<IActionResult> UpdatePostAsync(int postId, UpdatePostDto updatePostDto)
        {
            try
            {
                await _postService.UpdateAsync(postId, updatePostDto);
                return Ok(new { Message = "Post updated successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}