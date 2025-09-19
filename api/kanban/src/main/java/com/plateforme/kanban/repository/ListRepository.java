package com.plateforme.kanban.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.plateforme.kanban.model.List;

public interface ListRepository extends JpaRepository<List, Long> {

    @Query("SELECT l FROM List l WHERE l.id = :id AND l.name = :name AND l.user.id = :userId")
    Optional<List> findCustom(@Param("id") Long id, @Param("name") String name, @Param("userId") Long userId);

    java.util.List<List> findByName(String name);
} 
