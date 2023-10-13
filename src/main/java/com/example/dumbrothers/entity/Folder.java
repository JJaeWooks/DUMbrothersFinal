package com.example.dumbrothers.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Folder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long folderId;
    @Column
    private String folderName;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
    @Column
    private Long urlCounter;

    public void patch(Folder folder) {
        if(folder.folderName !=null){
            this.folderName=folder.folderName;
        }
    }
}
