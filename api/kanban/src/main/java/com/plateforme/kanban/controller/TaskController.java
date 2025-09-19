package com.plateforme.kanban.controller;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.plateforme.kanban.model.Task;
import com.plateforme.kanban.model.User;
import com.plateforme.kanban.repository.TaskRepository;

@RestController
@RequestMapping("/api/v1/tasks")
public class TaskController {
    private final TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    // CREATE
    @PostMapping
    public Task create(@RequestBody Task task, @AuthenticationPrincipal User currentUser) {
        if (currentUser == null) {
            throw new IllegalStateException("User must be authenticated to create a task.");
        }
        if (task.getName() == null || task.getName().isEmpty()) {
            throw new IllegalStateException("Task name cannot be empty.");
        }
        if (task.getList() == null || task.getList().getId() == null) {
            throw new IllegalStateException("Task must be associated with a list.");
        }

        task.setUser(currentUser);
        task.setCreatedAt(Instant.now());
        task.setUpdatedAt(Instant.now());

        return taskRepository.save(task);
    }

    // READ (recherche dynamique)
    @GetMapping
    public List<Task> findTasks(
            @RequestParam(required = false) Long id,
            @RequestParam(required = false) Long listId,
            @RequestParam(required = false) String name,
            @AuthenticationPrincipal User currentUser) {

        Long userId = (currentUser != null) ? currentUser.getId() : null;
        return taskRepository.findTasks(id, listId, name, userId);
    }

    // READ (par ID)
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        return taskRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task taskDetails,
            @AuthenticationPrincipal User currentUser) {
        
        // 1. Chercher la tâche
        Optional<Task> optionalTask = taskRepository.findById(id);
        if (!optionalTask.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Task task = optionalTask.get();

        // 2. Vérifier les permissions
        if (currentUser == null || !task.getUser().getId().equals(currentUser.getId())) {
            return ResponseEntity.status(403).build(); // Forbidden
        }

        // 3. Mettre à jour les champs
        if (taskDetails.getName() != null) {
            task.setName(taskDetails.getName());
        }
        if (taskDetails.getDescription() != null) {
            task.setDescription(taskDetails.getDescription());
        }
        if (taskDetails.getList() != null) {
            task.setList(taskDetails.getList());
        }
        task.setUpdatedAt(Instant.now());

        // 4. Sauvegarder et retourner la tâche mise à jour
        Task updatedTask = taskRepository.save(task);
        return ResponseEntity.ok(updatedTask);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id, @AuthenticationPrincipal User currentUser) {
        return taskRepository.findById(id)
                .map(task -> {
                    if (currentUser == null || !task.getUser().getId().equals(currentUser.getId())) {
                        return ResponseEntity.status(403).build(); // Forbidden
                    }
                    taskRepository.delete(task);
                    return ResponseEntity.noContent().build();
                }).orElse(ResponseEntity.notFound().build());
    }
}
