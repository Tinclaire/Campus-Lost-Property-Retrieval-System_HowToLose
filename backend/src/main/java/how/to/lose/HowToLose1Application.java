package how.to.lose;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import how.to.lose.model.Comment;
import how.to.lose.model.Location;
import how.to.lose.model.Post;
import how.to.lose.model.User;
import how.to.lose.repository.CommentRepository;
import how.to.lose.repository.LocationRepository;
import how.to.lose.repository.PostRepository;
import how.to.lose.repository.UserRepository;

@SpringBootApplication
public class HowToLose1Application implements CommandLineRunner{

	public static void main(String[] args) {
		SpringApplication.run(HowToLose1Application.class, args);
	}
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PostRepository postRepository;
	@Autowired
	private LocationRepository locationRepository;
	@Autowired
	private CommentRepository commentRepository;
	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
//		User tintin = new User("Tintin", 110306065, "Tintin0408", 1);
//		User carson = new User("Carson", 110307004, "Carson0408", 2);
		User tintin = new User("Tintin", 110306065, "Tintin0408");
		User carson = new User("Carson", 110307004, "Carson0408");
		Location sunt = new Location("商圖");
		DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
		LocalDateTime tRaw = LocalDateTime.of(2020, 6, 29, 14, 0, 0);
		String t = tRaw.format(dateTimeFormatter);
		Post p = new Post("幫找東西", t,
				sunt, tintin, "學生證", "0966503050", "掉", 1);
		Post p2 = new Post("幫找東西2", t,
				sunt, tintin, "學生證", "0966503050", "掉", 0);
		Post pp = new Post("嘻嘻嘻嘻嘻依稀西西", t,
				sunt, tintin, "學生證", "0966503050", "撿", 2);
		Comment c = new Comment(tintin, pp, "這是第一個留言");
		Comment cc = new Comment(tintin, pp, "會成功嗎");
		Comment ccc = new Comment(tintin, p, "緊張喔...");

		this.userRepository.save(tintin);
		this.userRepository.save(carson);
		this.locationRepository.save(sunt);
		this.postRepository.save(p);
		this.postRepository.save(p2);
		this.postRepository.save(pp);
		this.commentRepository.save(c);
		this.commentRepository.save(cc);
		this.commentRepository.save(ccc);
	}

}
