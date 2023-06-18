package how.to.lose.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import how.to.lose.DTO.PostDTO;
import how.to.lose.model.Post;
import how.to.lose.model.User;
import how.to.lose.repository.PostRepository;
import how.to.lose.service.PostService;
import how.to.lose.service.UserService;
import io.jsonwebtoken.Claims;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/posts")
public class PostController {
	
	@Autowired
	private PostService postService;
	@Autowired
	private UserService userService;
	
//	public PostController(PostService postService) {
//		this.postService = postService;
//	}
	
	@GetMapping("/post")
	public ResponseEntity<Post> getOnePost(@RequestHeader("id") int id){
		return ResponseEntity.ok(postService.getOnePost(id));
	}
	@GetMapping("/list")
	public ResponseEntity<List<Post>> getPosts(){
		return ResponseEntity.ok(postService.getPosts());
	}
	
	@GetMapping("/findlist")
	public ResponseEntity<ArrayList<Post>> getFindPosts(){
		return ResponseEntity.ok(postService.getFindPosts());
	}
	
	@GetMapping("/lostlist")
	public ResponseEntity<ArrayList<Post>> getLostPosts(){
		return ResponseEntity.ok(postService.getLostPosts());
	}
	
	@GetMapping("/personallist")
	public ArrayList<Post> getPersonalPosts(@RequestHeader("token") String token){
		Claims claims = UserService.checkJwt(token);
		return postService.getPersonalPosts(claims);
	}
	
	//這個不知道怎麼寫 結果根本沒用到哈哈哈
	@RequestMapping(value="/{id}" , method=RequestMethod.GET)
	public String getPostURL(@PathVariable("id") int id){
		System.out.println(id);
		return "id" + id;
	}
	
//	@RequestMapping(value = "/post", method = RequestMethod.POST)
	@PostMapping("/post")
	public void postPost(@RequestBody PostDTO body, @RequestHeader("token") String token) {
		System.out.println(token);
		Claims claims = UserService.checkJwt(token);
		System.out.println(claims.getSubject());
		
		if(userService.validation(claims.getSubject())){
			postService.addPost(body, claims);
		}
	}

}

