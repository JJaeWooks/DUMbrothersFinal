package com.example.dumbrothers.controller;

import com.example.dumbrothers.dto.DumForm;
import com.example.dumbrothers.entity.Dum;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.dumbrothers.service.DumService;

import java.security.Principal;
import java.util.List;

@RestController
@Slf4j
@CrossOrigin("*")
public class FirstController {

    @Autowired
    private DumService dumService;

    //모든 url 출력
    @GetMapping("/dum")
    public List<Dum> show(Principal principal) {
        return dumService.show(principal.getName());
    }

    //모든 tag 출력 (중복제거)
    @GetMapping("/dum/tags")
    public List<String> tags(Principal principal) {
        return dumService.tags(principal.getName());
    }

    //특정 tag를 가지는 url 출력
    @GetMapping("/dum/tags/{tags}")
    public List<Dum> tags(@PathVariable String tags,Principal principal) {
        return dumService.tagsearch(tags,principal.getName());
    }

    //folder id 기준으로 folder 가 가진 url 모두 출력
    @GetMapping("/dum/folder/{id}")
    public List<Dum> inshow(@PathVariable Long id,Principal principal) {
        return dumService.inshow(id,principal.getName());
    }

    //url 입력
    @PostMapping("dum/input")
    public ResponseEntity<DumForm> create(@RequestBody DumForm dto,Principal principal) {

        //서비스에게 위임
        DumForm createdDto = dumService.create(dto,principal.getName());
        return ResponseEntity.status(HttpStatus.OK).body(createdDto);
    }

    //url id 기준으로 folder id 변경
    @PatchMapping("dum/{id}")
    public ResponseEntity<Dum> update(@PathVariable Long id, @RequestBody DumForm dto) {

        Dum updatedDto = dumService.update(id, dto);
        return ResponseEntity.status(HttpStatus.OK).body(updatedDto);
    }

    //url id 기준으로 url 삭제
    @DeleteMapping("dum/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id,Principal principal) {
        Dum deleted = dumService.delete(id,principal.getName());

        if (deleted != null) {
            return ResponseEntity.status(HttpStatus.OK).body("ID값이 " + deleted.getId() + "인 url 삭제에 성공하였습니다.");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ID값이 " + id + "인 url 삭제에 실패하였습니다");
    }
}
