package com.example.dumbrothers.dto;

import com.example.dumbrothers.entity.Dum;
import com.example.dumbrothers.entity.Folder;
import com.example.dumbrothers.entity.Member;
import lombok.*;

@AllArgsConstructor
@ToString
@Getter
@NoArgsConstructor
public class FolderForm {
    private Long folderId;
    private String folderName;
    private Member userId;
    private Long urlCounter;

    public Folder toEntity(){
        return new Folder(folderId, folderName, userId, urlCounter);
    }

}
