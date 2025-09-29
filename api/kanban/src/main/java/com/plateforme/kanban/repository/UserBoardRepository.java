package com.plateforme.kanban.repository;

import com.plateforme.kanban.model.UserBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserBoardRepository extends JpaRepository<UserBoard, Long> {
    Optional<UserBoard> findByUser_IdAndBoard_Id(Long userId, Long boardId);
}
