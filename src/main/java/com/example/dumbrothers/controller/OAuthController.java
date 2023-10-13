package com.example.dumbrothers.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class OAuthController {
    @GetMapping("/loginForm")
    public String home() {
        return "loginForm.html";
    }

    @GetMapping("/private")
    public String privatePage() {
        return "privatePage";
    }
    @GetMapping("/admin")
    public String adminPage() {
        return "adminPage";
    }


}
