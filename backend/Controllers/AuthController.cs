using Microsoft.AspNetCore.Mvc;
using DTOs;
using Interfaces;
using Azure.Core;
using Models;
using Interfaces.IServices;

namespace Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUpAsync(SignUpDto signUpDto)
        {
            try
            {
                await _authService.SignUpAsync(signUpDto);
                return Ok("Account has been created successfully");
            }
            catch (Exception err)
            {
                return BadRequest(err.Message);
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<TokensDto>> LoginAsync(LoginDto loginDto)
        {
            try
            {
                TokensDto? tokensDto = await _authService.LoginAsync(loginDto);
                return Ok(tokensDto);
            }
            catch (Exception err)
            {
                return BadRequest(err.Message);
            }
        }

        [HttpPost("logout")]
        public async Task<IActionResult> LogoutAsync(RefreshTokenRequestDto request)
        {
            try
            {
                await _authService.LogoutAsync(request.RefreshToken);
                return Ok();
            }
            catch (Exception err)
            {
                return BadRequest(err.Message);
            }
        }

        [HttpPost("refresh-token")]
        public async Task<ActionResult<TokensDto>> RefreshAccessToken(RefreshTokenRequestDto request)
        {
            try
            {
                TokensDto tokensDto = await _authService.RefreshAccessTokenAsync(request.RefreshToken);
                return Ok(tokensDto);
            }
            catch (Exception err)
            {
                return BadRequest(err.Message);
            }
        }
    }
}