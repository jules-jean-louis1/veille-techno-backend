package com.plateforme.kanban.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.plateforme.kanban.model.UserList;

public interface UserListRepository extends JpaRepository<UserList, Long> {
    @Transactional
    @Modifying
    @Query("DELETE FROM UserList ul WHERE ul.list.id = :listId")
    void deleteByListId(@Param("listId") Long listId);
}