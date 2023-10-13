package com.example.dumbrothers.controller;

import com.example.dumbrothers.service.ChatService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chat")
@CrossOrigin("*")
public class ChatController {
    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @GetMapping("/getTags")
    public String getTags(@RequestParam("metaTags") String parameterValue) {
        return chatService.getTags(parameterValue);
    }
}