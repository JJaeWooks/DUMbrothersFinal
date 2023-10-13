package com.example.dumbrothers.repository;
import com.example.dumbrothers.entity.Dum;
import com.example.dumbrothers.entity.Folder;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;
import java.util.List;

public interface FolderRepository extends CrudRepository<Folder,Long> {
    @Override
    ArrayList<Folder> findAll();

    List<Folder> findBymemberId(Long id);
}
