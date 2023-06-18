package how.to.lose.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import how.to.lose.DTO.CommentDTO;
import how.to.lose.model.Comment;
import how.to.lose.repository.CommentRepository;
import how.to.lose.service.CommentService;
import how.to.lose.service.UserService;
import io.jsonwebtoken.Claims;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/comment")
public class CommentController {
	@Autowired
	private CommentRepository commentRepository;
	@Autowired
	private CommentService commentService;
	@Autowired
	private UserService userService;
	
	@GetMapping("/list")
	public List<Comment> getComments(){
		return commentRepository.findAll();
	}
	
	@GetMapping("/conc")
	public ResponseEntity<ArrayList<Comment>> commentInOnePost(@RequestHeader("id") int id){
		return ResponseEntity.ok(commentService.commentInOnePost(id));
	}
	
	@PostMapping("/saysomething")
	public ResponseEntity<String> comment(@RequestBody CommentDTO values, @RequestHeader("token") String token, @RequestHeader("id") String id) {
		Claims claims = UserService.checkJwt(token);
		if(userService.validation(claims.getSubject())){
			commentService.comment(values, Integer.parseInt(id), claims);
		}
		return ResponseEntity.ok("success");
	}
}
