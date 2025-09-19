package com.plateforme.kanban.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class UserList {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Enumerated(EnumType.ORDINAL)
    private UserListRole role;
    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    @ManyToOne(optional = false)
    @JoinColumn(name = "list_id", nullable = false)
    private List list;

    public UserList() {
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public List getList() {
        return list;
    }

    public UserListRole getRole() {
        return role;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setList(List list) {
        this.list = list;
    }

    public void setRole(UserListRole role) {
        this.role = role;
    }
}
