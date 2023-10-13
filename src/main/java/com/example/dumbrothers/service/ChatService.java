package com.example.dumbrothers.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class ChatService {
    private final WebClient webClient;
    private final Logger logger = LoggerFactory.getLogger(ChatService.class);

    public ChatService() {
        this.webClient = WebClient.create();
    }
    //http://203.255.3.32:8001/chat/?metaTags
    public String getTags(String parameterValue) {
        URI uri = UriComponentsBuilder
                .fromUriString("http://203.255.3.32:8082")
                .path("/chat/")
                .encode()
                .build()
                .toUri();

        Map<String, String> parameters = new HashMap<>();
        parameters.put("metaTags", parameterValue);

        // JSON 객체 생성
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonParameters = null;
        try {
            jsonParameters = objectMapper.writeValueAsString(parameters);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        ResponseEntity<String> responseEntity = webClient.post()
                .uri(uri)
                .contentType(MediaType.APPLICATION_JSON) // 요청 본문의 Content-Type을 설정
                .body(BodyInserters.fromValue(jsonParameters)) // JSON 객체를 본문에 추가
                .retrieve()
                .toEntity(String.class)
                .block();

        logger.info("status code: {}", responseEntity.getStatusCode());
        logger.info("body: {}", responseEntity.getBody());

        return responseEntity.getBody();
    }
}