package com.example.dumbrothers.connect;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.select.Elements;
import org.springframework.data.util.Pair;

import org.jsoup.nodes.Document;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;



public class LinkScrap {

    private final static String DEFAULT_URL_IMAGE = "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FmNxd9%2FbtsjcaQQ6Yt%2F1MAaZUmCsoUzyf7wkAxVbk%2Fimg.png";
    private final static String DEFAULT_USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36";
    public static Map<String, String> handleSendText(String url) throws IOException {

        Map<String, String> ogMap = new LinkedHashMap<>();
        Document document = Jsoup.connect(url).userAgent(DEFAULT_USER_AGENT).get();

        Elements elements = document.select("meta[property^=og:]");

        ogMap.put("image", DEFAULT_URL_IMAGE);
        ogMap.put("title",document.select("head > title").text());
        ogMap.put("description", document.select("meta[name=description]").attr("content"));
        ogMap.put("site_name", document.select("meta[property=og:site_name]").attr("content"));

        if (!elements.isEmpty()) {
            elements.stream().filter(element -> element.hasAttr("content")).forEach(element -> {
                switch (element.attr("property")) {
                    case "og:image":
                        ogMap.put("image", element.attr("content"));
                        break;
                    case "og:title":
                        ogMap.put("title", element.attr("content"));
                        break;
                    case "og:description":
                        ogMap.put("description", element.attr("content"));
                        break;
                    case "og:site_name":
                        ogMap.put("site_name", element.attr("content"));
                        break;
                }
            });
//            for (int i = 0; i < elements.size(); i++) {
//                switch (elements.get(i).attr("property")) {
//                    case "og:image":
//                        String content = elements.get(i).attr("content");
//                        if (content != null) {
//                            ogMap.put("image", content);
//                            break;
//                        }
//                    case "og:url":
//                        if (elements.get(i).attr("content") != null) {
//                            ogMap.put("url", elements.get(i).attr("content"));
//                            break;
//                        }
//                    case "og:title":
//                        if (elements.get(i).attr("title") != null) {
//                            ogMap.put("title", elements.get(0).attr("content"));
//                            break;
//                        }
//                    case "og:description":
//                        if (elements.get(i).attr("content") != null) {
//                            ogMap.put("description", elements.get(i).attr("content"));
//                            break;
//                        }
//                    case "og:site_name":
//                        if (elements.get(i).attr("content") != null) {
//                            ogMap.put("site_name", elements.get(i).attr("content"));
//                            break;
//                        }
//                }
//            }
        }

        return ogMap;
    }
}