package com.example.dumbrothers.service;



public interface RestTemplateService {

    //chat() 이때 입력으로,, message를 주어야 한다. 이때 message틀을 짜서 넘겨주어야한다.
    public String chat(String message);

    public String create_url(String url);



}
