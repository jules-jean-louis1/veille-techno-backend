package com.plateforme.kanban.service;

import com.plateforme.kanban.model.Board;
import com.plateforme.kanban.model.User;
import com.plateforme.kanban.model.UserBoard;
import com.plateforme.kanban.model.UserBoardRole;
import com.plateforme.kanban.repository.BoardRepository;
import com.plateforme.kanban.repository.UserBoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private UserBoardRepository userBoardRepository;

    public List<Board> allBoards() {
        return boardRepository.findAll();
    }

    public Optional<Board> singleBoard(Long id) {
        return boardRepository.findById(id);
    }

    @Transactional
    public Board createBoard(Board board, User currentUser) {
        board.setUser(currentUser); // Keep track of the original creator
        Board newBoard = boardRepository.save(board);

        UserBoard userBoard = UserBoard.builder()
                .user(currentUser)
                .board(newBoard)
                .role(UserBoardRole.ADMIN)
                .build();
        userBoardRepository.save(userBoard);

        return newBoard;
    }

    @Transactional
    public Optional<Board> updateBoard(Long id, Board boardDetails, User currentUser) {
        return userBoardRepository.findByUser_IdAndBoard_Id(currentUser.getId(), id)
                .filter(ub -> ub.getRole() == UserBoardRole.ADMIN)
                .flatMap(ub -> boardRepository.findById(id))
                .map(board -> {
                    board.setName(boardDetails.getName());
                    return boardRepository.save(board);
                });
    }

    @Transactional
    public boolean deleteBoard(Long id, User currentUser) {
        return userBoardRepository.findByUser_IdAndBoard_Id(currentUser.getId(), id)
                .filter(ub -> ub.getRole() == UserBoardRole.ADMIN)
                .map(ub -> {
                    boardRepository.deleteById(id);
                    return true;
                }).orElse(false);
    }

    @Transactional
    public Optional<UserBoard> addUserToBoard(Long boardId, User user, UserBoardRole role, User adminUser) {
        // Check if the person adding is an admin
        return userBoardRepository.findByUser_IdAndBoard_Id(adminUser.getId(), boardId)
                .filter(ub -> ub.getRole() == UserBoardRole.ADMIN)
                .flatMap(ub -> boardRepository.findById(boardId))
                .map(board -> {
                    UserBoard newUserBoard = UserBoard.builder()
                            .user(user)
                            .board(board)
                            .role(role)
                            .build();
                    return userBoardRepository.save(newUserBoard);
                });
    }
}
