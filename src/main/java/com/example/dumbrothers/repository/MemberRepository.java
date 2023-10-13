package com.example.dumbrothers.repository;

import com.example.dumbrothers.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    public Optional<Member> findByName(String name);

    Optional<Member> findByproviderId(String memberName);
}
