package com.example.mini_project_Backend.config;

import com.example.mini_project_Backend.entity.UserAccount;
import com.example.mini_project_Backend.repository.UserAccountRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DatabaseSeeder {

    @Bean
    public CommandLineRunner seedUsers(UserAccountRepository userAccountRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userAccountRepository.findByEmail("parvaparmar41@gmail.com").isEmpty()) {
                UserAccount ua = new UserAccount();
                ua.setEmail("parvaparmar41@gmail.com");
                ua.setPassword(passwordEncoder.encode("password123"));
                ua.setRoles("ACCOUNTS");
                userAccountRepository.save(ua);
            }

            if (userAccountRepository.findByEmail("parvaparmar42@gmail.com").isEmpty()) {
                UserAccount ua = new UserAccount();
                ua.setEmail("parvaparmar42@gmail.com");
                ua.setPassword(passwordEncoder.encode("password123"));
                ua.setRoles("ACCOUNTS");
                userAccountRepository.save(ua);
            }
        };
    }
}
