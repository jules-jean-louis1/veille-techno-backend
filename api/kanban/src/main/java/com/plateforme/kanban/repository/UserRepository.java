package com.plateforme.kanban.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.plateforme.kanban.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
    
}
