package how.to.lose.service;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import how.to.lose.DTO.CommentDTO;
import how.to.lose.model.Comment;
import how.to.lose.model.Post;
import how.to.lose.model.User;
import how.to.lose.repository.CommentRepository;
import how.to.lose.repository.PostRepository;
import io.jsonwebtoken.Claims;

@Service
public class CommentService {
	
	@Autowired
	private CommentRepository commentRepository;
	@Autowired
	private PostRepository postRepository;
	@Autowired
	private UserService userService;
	@Autowired
	private PostService postService;
	
	public CommentService(CommentRepository commentRepository, UserService userService,
			PostService postService, PostRepository postRepository) {
		this.commentRepository = commentRepository;
		this.userService = userService;
		this.postService = postService;
		this.postRepository = postRepository;
	}
	
	public void comment(CommentDTO commentDTO, int postId, Claims claims) {
		User u = userService.hasUser(claims);
		Post p = postService.getOnePost(postId);
		Comment c = new Comment(u, p, commentDTO.values);
		commentRepository.save(c);
	}
	
	public ArrayList<Comment> commentInOnePost(int postId){
		ArrayList<Comment> cs = new ArrayList<Comment>();
		int count = 0;
		int size = commentRepository.findAll().size();
		for(long i = 1; i <= size; i++) {
			Optional<Comment> c = commentRepository.findById(i);
			if(c.get().getOnWPost().getId() == postId) {
				cs.add(c.get());
				count++;
			}
		}
		Post p = postService.getOnePost(postId);
		p.setcNum(count);
		postRepository.save(p);
		return cs;
	}
	
	public int commentNumber(int postId) {
		int count = 0;
		int size = commentRepository.findAll().size();
		for(long i = 1; i <= size; i++) {
			Optional<Comment> c = commentRepository.findById(i);
			if(c.get().getOnWPost().getId() == postId) {
				count++;
			}
		}
		return count;
	}

}
