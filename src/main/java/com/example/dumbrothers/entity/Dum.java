package com.example.dumbrothers.entity;

import com.example.dumbrothers.dto.DumForm;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class Dum {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String link;
    @Column
    private String firstTag;
    @Column
    private String secondTag;
    @Column
    private String thirdTag;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
    //나중에 date 타입으로 user별 url 추가 시간 순으로 가장 먼저 보이게 해야한다.

    @ManyToOne
    @JoinColumn(name = "folder_id")
    private Folder folder;

    @Column
    private String title;
    @Column
    private String image;
    @Column
    private String description;



    public static Dum createDum(DumForm dto, Folder folder) {
        //if (dto.getId() != null)
        // throw new IllegalArgumentException("링크생성 실패 댓글의 id가 잇어야함");

        //      if (dto.getFolderId() != folder.getFolderId())
        //         throw new IllegalArgumentException("링크생성 실패 id가 잘못되엇음");
        return new Dum(
                dto.getId(),
                dto.getLink(),
                dto.getFirstTag(),
                dto.getSecondTag(),
                dto.getThirdTag(),
                dto.getUserId(),
                folder,
                dto.getTitle(),
                dto.getImage(),
                dto.getDescription()

        );
    }

    public Object showFolderId() {
        return this.folder.getFolderId();
    }

    public List<String> showTags() {
        return List.of(this.firstTag, this.secondTag, this.thirdTag);
    }
//    public void patch(DumForm dto) {
//
//        //예외 발생
//        if (this.id != dto.getId())
//            throw new IllegalArgumentException("댓글 수정실패 잘못된 id가 입력");
//        //객체를 갱신
//        System.out.println("#######"+this.folder.getFolderId());
//        if(this.folder.getFolderId()!=null)
//           this.folder.set()=dto.getFolderId();
//        if(dto.getBody()!=null)
//            this.body=dto.getBody();
//    }
}
