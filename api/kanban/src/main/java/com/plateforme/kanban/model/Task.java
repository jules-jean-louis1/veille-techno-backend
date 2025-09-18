package com.plateforme.kanban.model;

import org.springframework.data.annotation.CreatedBy;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.Instant;
import jakarta.persistence.Entity;

@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String description;
    @ManyToOne(optional = false)
    @JoinColumn(name = "list_id", nullable = false)
    private List list;
    @CreatedBy
    private User user;
    @ManyToOne(optional = true)
    @JoinColumn(name = "assigned_to", nullable = true)
    private User assignedTo;
    private Instant createdAt;
    private Instant updatedAt;

    public Task() {
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public List getList() {
        return list;
    }

    public User getUser() {
        return user;
    }

    public User getAssignedTo() {
        return assignedTo;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setList(List list) {
        this.list = list;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setAssignedTo(User assignedTo) {
        this.assignedTo = assignedTo;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }
}
