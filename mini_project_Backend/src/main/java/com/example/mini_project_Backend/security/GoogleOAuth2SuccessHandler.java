package com.example.mini_project_Backend.security;

import com.example.mini_project_Backend.repository.UserAccountRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
public class GoogleOAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final UserAccountRepository userAccountRepository;

    public GoogleOAuth2SuccessHandler(JwtService jwtService,
                                      UserDetailsService userDetailsService,
                                      UserAccountRepository userAccountRepository) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
        this.userAccountRepository = userAccountRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        org.springframework.security.core.Authentication authentication)
            throws IOException, ServletException {

        if (!(authentication instanceof OAuth2AuthenticationToken oAuthToken)) {
            redirectWithError(response, "Unsupported authentication type");
            return;
        }

        OAuth2User oAuth2User = oAuthToken.getPrincipal();
        String email = oAuth2User.getAttribute("email");

        if (email == null) {
            redirectWithError(response, "No email from Google account");
            return;
        }

        // Ensure this user already exists in our DB with roles
        var userOpt = userAccountRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            redirectWithError(response, "User not registered in system");
            return;
        }

        var userAccount = userOpt.get();
        String roles = userAccount.getRoles();
        if (roles == null || !roles.contains("ACCOUNTS")) {
            redirectWithError(response, "User is not an accounts employee");
            return;
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(email);
        String token = jwtService.generateToken(userDetails);

        String frontendUrl = "http://localhost:5173/oauth2/success";
        String redirectUrl = frontendUrl
                + "?tokenType=" + URLEncoder.encode("Bearer", StandardCharsets.UTF_8)
                + "&token=" + URLEncoder.encode(token, StandardCharsets.UTF_8)
                + "&email=" + URLEncoder.encode(email, StandardCharsets.UTF_8);

        response.sendRedirect(redirectUrl);
    }

    private void redirectWithError(HttpServletResponse response, String message) throws IOException {
        String frontendLoginUrl = "http://localhost:5173/login";
        String redirectUrl = frontendLoginUrl
                + "?oauthError=" + URLEncoder.encode(message, StandardCharsets.UTF_8);
        response.sendRedirect(redirectUrl);
    }
}
