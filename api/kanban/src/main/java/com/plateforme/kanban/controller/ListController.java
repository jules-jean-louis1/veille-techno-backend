package com.plateforme.kanban.controller;

import java.time.Instant;
import java.util.Map;
import java.util.Optional;
import com.plateforme.kanban.model.List;
import com.plateforme.kanban.model.User;
import com.plateforme.kanban.model.UserList;
import com.plateforme.kanban.model.UserListRole;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.plateforme.kanban.repository.ListRepository;
import com.plateforme.kanban.repository.UserListRepository;

@RestController
@RequestMapping("/api/v1")
public class ListController {

    private ListRepository listRepository;
    private UserListRepository userListRepository;

    public ListController(ListRepository listRepository, UserListRepository userListRepository) {
        this.listRepository = listRepository;
        this.userListRepository = userListRepository;
    }

    @GetMapping("/list")
    public List get(@RequestBody Map<String, String> payload) {
        Long id = Long.parseLong(payload.get("id"));
        String name = payload.get("name");
        Long userId = Long.parseLong(payload.get("user_id"));
        Optional<List> list = listRepository.findCustom(id, name, userId);
        return list.orElse(null);
    }

    @GetMapping("/list/{id}")
    public ResponseEntity<List> getOne(@PathVariable Long id) {
        Optional<List> list = listRepository.findById(id);

        if (list.isPresent()) {
            return ResponseEntity.ok(list.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/list")
    public List create(@RequestBody List list, @AuthenticationPrincipal User currentUser) {
        if (currentUser == null) {
            throw new IllegalStateException("User must be authenticated to create a list.");
        }

        // Set the authenticated user as the owner
        list.setUser(currentUser);
        list.setCreatedDate(Instant.now());
        List newList = listRepository.save(list);

        // Create the link in UserList table
        UserList userList = new UserList();
        userList.setUser(currentUser);
        userList.setList(newList);
        userList.setRole(UserListRole.OWNER);
        userListRepository.save(userList);

        return newList;
    }

    @DeleteMapping("/list/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id, @AuthenticationPrincipal User currentUser) {
        if (currentUser == null) {
            throw new IllegalStateException("User must be authenticated to create a list.");
        }

        Optional<List> listOptional = listRepository.findById(id);
        if (listOptional.isPresent()) {
            // Delete all related entries in UserList first
            userListRepository.deleteByListId(id);
            // Then delete the list
            listRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
