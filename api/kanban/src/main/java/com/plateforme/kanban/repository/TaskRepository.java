package com.plateforme.kanban.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.plateforme.kanban.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
    @Query("SELECT t FROM Task t WHERE " +
           "(:id IS NULL OR t.id = :id) AND " +
           "(:listId IS NULL OR t.list.id = :listId) AND " +
           "(:name IS NULL OR t.name = :name) AND " +
           "(:userId IS NULL OR t.user.id = :userId)")
    List<Task> findTasks(
        @Param("id") Long id,
        @Param("listId") Long listId,
        @Param("name") String name,
        @Param("userId") Long userId
    );

}
