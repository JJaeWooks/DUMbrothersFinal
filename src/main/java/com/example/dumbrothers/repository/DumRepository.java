package com.example.dumbrothers.repository;

import com.example.dumbrothers.entity.Dum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.util.Pair;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public interface DumRepository extends JpaRepository<Dum,Long> {

    @Query("SELECT d FROM Dum d where d.member.providerId=:username ORDER BY d.id DESC")
    ArrayList<Dum> findAllOrderByDescId(String username);

}
