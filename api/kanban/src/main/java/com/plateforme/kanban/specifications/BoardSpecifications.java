package com.plateforme.kanban.specifications;

import com.plateforme.kanban.model.Board;
import com.plateforme.kanban.model.User;
import com.plateforme.kanban.model.UserBoard;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;

public class BoardSpecifications {

    public static Specification<Board> withDynamicQuery(Long id, Long userId) {
        return (root, query, criteriaBuilder) -> {
            // Une liste de prédicats (conditions WHERE)
            java.util.List<jakarta.persistence.criteria.Predicate> predicates = new java.util.ArrayList<>();

            // 1. Si l'ID du board est fourni, on ajoute la condition "id = ?"
            if (id != null) {
                predicates.add(criteriaBuilder.equal(root.get("id"), id));
            }

            // 2. Si l'ID de l'utilisateur est fourni, on ajoute la condition
            if (userId != null) {
                // On fait une jointure entre Board et UserBoard
                Join<Board, UserBoard> userBoardJoin = root.join("userBoards");
                // On fait une jointure entre UserBoard et User
                Join<UserBoard, User> userJoin = userBoardJoin.join("user");
                // On ajoute la condition sur l'ID de l'utilisateur
                predicates.add(criteriaBuilder.equal(userJoin.get("id"), userId));
            }

            // On combine tous les prédicats avec un "AND"
            return criteriaBuilder.and(predicates.toArray(new jakarta.persistence.criteria.Predicate[0]));
        };
    }
}