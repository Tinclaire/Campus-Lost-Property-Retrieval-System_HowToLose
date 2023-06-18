package how.to.lose.service;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import how.to.lose.DTO.PostDTO;
import how.to.lose.model.Location;
import how.to.lose.model.Post;
import how.to.lose.model.User;
import how.to.lose.repository.LocationRepository;
import how.to.lose.repository.PostRepository;
import how.to.lose.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

@Service
public class PostService {
	
	@Autowired
	private PostRepository postRepository;
	@Autowired
	private LocationRepository locationRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private UserService userService;
	
	public PostService(PostRepository postRepository, LocationRepository locationRepository,
			UserService userService) {
	    this.postRepository = postRepository;
	    this.locationRepository = locationRepository;
	    this.userService = userService;
	}
	
	public Location hasLocation(String location) {
//		Location locaReturn = null;
		int size = locationRepository.findAll().size();
		for(long i = 1; i <= size; i++) {
			Optional<Location> loca = locationRepository.findById(i);
			if(loca.get().getLocaName().equals(location)) {
				return loca.get();
			}else {
				Location locationReturn = locationRepository.save(new Location(location));
				return locationReturn;
			}
		}
		return null;
	}
	    
	public void addPost(PostDTO postDTO, Claims claims) {
		DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
		String t = postDTO.time.format(dateTimeFormatter);
		User u = userService.hasUser(claims);
		if(postDTO.title.length() != 0 && postDTO.object.length() != 0
				&& postDTO.contact.length() != 0 && postDTO.location.length() != 0
				&& postDTO.findOrLost.length() != 0 && postDTO.time != null
				&&(postDTO.findOrLost.equals("撿") || postDTO.findOrLost.equals("掉"))) {
			Post post = new Post(postDTO.title, t, this.hasLocation(postDTO.location),
					u, postDTO.object, postDTO.contact, postDTO.findOrLost, 0);
			postRepository.save(post);
		}else {
			throw new Error("blank blank");
		}
	}
	
	public List<Post> getPosts(){
		return postRepository.findAll();
	}
	public Post getOnePost(int id) {
		Optional<Post> post = postRepository.findById(Long.valueOf(id));
		return post.get();
	}
	
	public ArrayList<Post> getFindPosts(){
		ArrayList<Post> fs = new ArrayList<Post>();
		long size = postRepository.findAll().size();
		for(long i = size; i > 0; i--) {
			Optional<Post> f = postRepository.findById(i);
			if(f.get().getFindOrLost().equals("撿")) {
				fs.add(f.get());
			}
		}
		return fs;
	}
	public ArrayList<Post> getLostPosts(){
		ArrayList<Post> ls = new ArrayList<Post>();
		long size = postRepository.findAll().size();
		for(long i = size; i > 0; i--) {
			Optional<Post> l = postRepository.findById(i);
			if(l.get().getFindOrLost().equals("掉")) {
				ls.add(l.get());
			}
		}
		return ls;
	}
	
	public ArrayList<Post> getPersonalPosts(Claims claims){
		ArrayList<Post> ps = new ArrayList<Post>();
		long id = Long.valueOf(claims.getSubject());
		long size = postRepository.findAll().size();
		for(long i = size; i > 0; i--) {
			Optional<Post> p = postRepository.findById(i);
			if(p.get().getPoster().getId() == id) {
				ps.add(p.get());
			}
		}
		return ps;
	}
}
