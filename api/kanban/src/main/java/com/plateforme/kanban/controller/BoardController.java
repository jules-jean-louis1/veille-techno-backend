package com.plateforme.kanban.controller;

import com.plateforme.kanban.model.Board;
import com.plateforme.kanban.model.User;
import com.plateforme.kanban.model.UserBoard;
import com.plateforme.kanban.model.UserBoardRole;
import com.plateforme.kanban.repository.BoardRepository;
import com.plateforme.kanban.repository.UserRepository;
import com.plateforme.kanban.service.BoardService;
import com.plateforme.kanban.specifications.BoardSpecifications;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/boards")
public class BoardController {

    @Autowired
    private BoardService boardService;

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<Board>> getAllBoards(@RequestParam(required = false) Long boardId,@RequestParam(required = false) Long userId) {
        Specification<Board> spec = BoardSpecifications.withDynamicQuery(boardId, userId);
        return new ResponseEntity<>(boardRepository.findAll(spec), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Board> getSingleBoard(@PathVariable Long id) {
        return boardService.singleBoard(id)
                .map(board -> new ResponseEntity<>(board, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Board> createBoard(@RequestBody Board board, @AuthenticationPrincipal User currentUser) {
        if (currentUser == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        Board createdBoard = boardService.createBoard(board, currentUser);
        return new ResponseEntity<>(createdBoard, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Board> updateBoard(@PathVariable Long id, @RequestBody Board boardDetails,
            @AuthenticationPrincipal User currentUser) {
        if (currentUser == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return boardService.updateBoard(id, boardDetails, currentUser)
                .map(board -> new ResponseEntity<>(board, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.FORBIDDEN));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteBoard(@PathVariable Long id, @AuthenticationPrincipal User currentUser) {
        if (currentUser == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        if (boardService.deleteBoard(id, currentUser)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/{boardId}/users")
    public ResponseEntity<UserBoard> addUserToBoard(@PathVariable Long boardId,
            @RequestBody Map<String, String> payload, @AuthenticationPrincipal User currentUser) {
        if (currentUser == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        String userEmail = payload.get("email");
        UserBoardRole role = UserBoardRole.valueOf(payload.get("role"));

        return userRepository.findByEmail(userEmail)
                .flatMap(user -> boardService.addUserToBoard(boardId, user, role, currentUser))
                .map(userBoard -> new ResponseEntity<>(userBoard, HttpStatus.CREATED))
                .orElse(new ResponseEntity<>(HttpStatus.BAD_REQUEST));
    }
}
