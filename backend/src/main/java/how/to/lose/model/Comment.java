package how.to.lose.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="COMMENT")
public class Comment {
	
	@Id
	@Column(name = "COMMENT_ID", unique = true, nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne
	@JoinColumn(name = "USER_ID")
	private User currUser;
	
	@ManyToOne
	@JoinColumn(name = "POST_ID")
	private Post onWPost;
	
	@Column(name = "COMMENT_COMMENT")
	private String comment;
	
	public Comment() {
		
	}
	public Comment(User currUser, Post onWPost, String comment) {
		this.currUser = currUser;
		this.onWPost = onWPost;
		this.comment = comment;
	}
//	public Comment(User currUser, Post onWPost, String comment) {
//		this.comment = comment;
//	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public User getCurrUser() {
		return currUser;
	}
	public void setCurrUser(User currUser) {
		this.currUser = currUser;
	}
	public Post getOnWPost() {
		return onWPost;
	}
	public void setOnWPost(Post onWPost) {
		this.onWPost = onWPost;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	

}
