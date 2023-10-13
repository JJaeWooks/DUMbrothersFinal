package com.example.dumbrothers.dto;

import com.example.dumbrothers.entity.Dum;
import com.example.dumbrothers.entity.Folder;
import com.example.dumbrothers.entity.Member;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.*;

@AllArgsConstructor
@ToString
@Getter
@NoArgsConstructor
@Setter
public class DumForm {
    private Long id;
    private String link;
    private String firstTag;
    private String secondTag;
    private String thirdTag;
    private Member userId;
    private Long folderId;
    private String title;
    private String image;
    private String description;


    public static DumForm createlinkDto(Dum dum){
        return new DumForm(
                dum.getId(),
                dum.getLink(),
                dum.getFirstTag(),
                dum.getSecondTag(),
                dum.getThirdTag(),
                dum.getMember(),
                dum.getFolder().getFolderId(),
                dum.getTitle(),
                dum.getImage(),
                dum.getDescription()
        );
    }
}