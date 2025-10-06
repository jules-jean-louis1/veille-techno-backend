package com.plateforme.kanban.controller;

import com.plateforme.kanban.model.List;
import com.plateforme.kanban.model.User;
import com.plateforme.kanban.model.UserBoardRole;
import com.plateforme.kanban.repository.BoardRepository;
import com.plateforme.kanban.repository.ListRepository;
import com.plateforme.kanban.repository.UserBoardRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;

@RestController
@RequestMapping("/api/v1/boards/{boardId}/lists")
public class ListController {

    private final ListRepository listRepository;
    private final BoardRepository boardRepository;
    private final UserBoardRepository userBoardRepository;

    public ListController(ListRepository listRepository, BoardRepository boardRepository, UserBoardRepository userBoardRepository) {
        this.listRepository = listRepository;
        this.boardRepository = boardRepository;
        this.userBoardRepository = userBoardRepository;
    }

    @PostMapping
    public ResponseEntity<List> createList(@PathVariable Long boardId, @RequestBody List list, @AuthenticationPrincipal User currentUser) {
        if (currentUser == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        return userBoardRepository.findByUser_IdAndBoard_Id(currentUser.getId(), boardId)
                .filter(ub -> ub.getRole() == UserBoardRole.ADMIN || ub.getRole() == UserBoardRole.MEMBER)
                .flatMap(ub -> boardRepository.findById(boardId))
                .map(board -> {
                    list.setBoard(board);
                    list.setCreatedDate(Instant.now());
                    List newList = listRepository.save(list);
                    return new ResponseEntity<>(newList, HttpStatus.CREATED);
                })
                .orElse(new ResponseEntity<>(HttpStatus.FORBIDDEN));
    }

    @GetMapping("/{listId}")
    public ResponseEntity<List> getList(@PathVariable Long boardId, @PathVariable Long listId, @AuthenticationPrincipal User currentUser) {
        if (currentUser == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        return userBoardRepository.findByUser_IdAndBoard_Id(currentUser.getId(), boardId)
                .flatMap(ub -> listRepository.findById(listId))
                .filter(list -> list.getBoard().getId().equals(boardId))
                .map(list -> new ResponseEntity<>(list, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{listId}")
    public ResponseEntity<List> updateList(@PathVariable Long boardId, @PathVariable Long listId, @RequestBody List listDetails, @AuthenticationPrincipal User currentUser) {
        if (currentUser == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        return userBoardRepository.findByUser_IdAndBoard_Id(currentUser.getId(), boardId)
                .filter(ub -> ub.getRole() == UserBoardRole.ADMIN || ub.getRole() == UserBoardRole.MEMBER)
                .flatMap(ub -> listRepository.findById(listId))
                .filter(list -> list.getBoard().getId().equals(boardId))
                .map(list -> {
                    list.setName(listDetails.getName());
                    list.setDescription(listDetails.getDescription());
                    list.setUpdatedDate(Instant.now());
                    List updatedList = listRepository.save(list);
                    return new ResponseEntity<>(updatedList, HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(HttpStatus.FORBIDDEN));
    }

    @DeleteMapping("/{listId}")
    public ResponseEntity<HttpStatus> deleteList(@PathVariable Long boardId, @PathVariable Long listId, @AuthenticationPrincipal User currentUser) {
        if (currentUser == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        return userBoardRepository.findByUser_IdAndBoard_Id(currentUser.getId(), boardId)
                .filter(ub -> ub.getRole() == UserBoardRole.ADMIN) // Only admins can delete lists
                .flatMap(ub -> listRepository.findById(listId))
                .filter(list -> list.getBoard().getId().equals(boardId))
                .map(list -> {
                    listRepository.delete(list);
                    return new ResponseEntity<HttpStatus>(HttpStatus.NO_CONTENT);
                })
                .orElse(new ResponseEntity<>(HttpStatus.FORBIDDEN));
    }
}
