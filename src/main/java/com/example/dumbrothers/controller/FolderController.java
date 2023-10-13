package com.example.dumbrothers.controller;

import com.example.dumbrothers.dto.FolderForm;
import com.example.dumbrothers.entity.Dum;
import com.example.dumbrothers.entity.Folder;
import com.example.dumbrothers.repository.FolderRepository;
import com.example.dumbrothers.service.DumService;
import com.example.dumbrothers.service.FolderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin("*")
public class FolderController {

    @Autowired
    private FolderRepository folderRepository;

    @Autowired
    private FolderService folderService;

    @Autowired
    private DumService dumService;

    public FolderController(DumService dumService) {
        this.dumService = dumService;
    }

    //폴더랑 폴더내linkcount를 같이 보여준다.
    @GetMapping("/dum/folder")
    public List<Folder> showFoldersWithLinkCount(Principal principal) {
        List<Folder> folders = folderService.show(principal.getName());
        return folderService.showFolderCount(folders,principal.getName());
    }

    //모든폴더를 보여주는 페이지
//    @GetMapping("/dum/folder")
//    public List<Folder> showfolder() {
//        return folderService.show();
//    }

    //폴더이름을 기준으로 폴더 추가
    @PostMapping("/dum/folder/add")
    public ResponseEntity<Folder> create(@RequestBody FolderForm folderForm, Principal principal){
        Folder folder=folderService.save(folderForm,principal.getName());
        return ResponseEntity.status(HttpStatus.OK).body(folder);
    }

    //폴더 id 기준으로 폴더이름 수정
    @PatchMapping("/dum/folder/{id}")
    public ResponseEntity<Folder> update(@PathVariable Long id, @RequestBody FolderForm dto){

        Folder updated=folderService.update(id,dto);
        return (updated!=null) ?
                ResponseEntity.status(HttpStatus.OK).body(updated):
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    //폴더 id 기준으로 폴더 삭제
    @DeleteMapping("/dum/folder/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id,Principal principal){

        //대상찾기
        Folder target=folderRepository.findById(id).orElse(null);

        List<Dum> delLinks = dumService.inshow(id,principal.getName());

        //잘못된 요청처리 (없는 folder나 dumfolder 삭제)
        if (target == null || target == folderRepository.findById(1L).orElse(null)){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ID값이 " + id +  "인 folder 삭제에 실패하였습니다.");
        }

        //대상 삭제 if 폴더내 링크 있다 -> dumfolder(id:1)로 이동
        if (delLinks.isEmpty()) {
            folderRepository.delete(target);
        } else {
            Folder folder =folderRepository.findById(1L)
                    .orElseThrow(()->new IllegalArgumentException("폴더가 없어요")
                    );
            for(Dum dto : delLinks ){
                dto.setFolder(folder);
            }
        }
        folderRepository.delete(target);
        return ResponseEntity.status(HttpStatus.OK).body("ID값이 " + target.getFolderId() +  "인 folder 삭제에 성공하였습니다.");
    }

}

