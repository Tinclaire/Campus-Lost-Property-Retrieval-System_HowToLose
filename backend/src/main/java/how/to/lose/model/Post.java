package how.to.lose.model;

//import java.awt.image.BufferedImage;
import java.time.Instant;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "posts")
public class Post {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "POST_ID", unique = true, nullable = false)
	private int id;
	
	@Column(name = "POST_TITLE")
	private String title;
	
	@Column(name = "POST_TIME")
	private String time; //撿掉物時間
	
	@ManyToOne
	@JoinColumn(name = "LOCATION_ID")
	private Location location;
	@ManyToOne
	@JoinColumn(name = "USER_ID")
	private User poster;
//	private int locaId;
//	private int posterId;
	
//	@Column(name = "LOCATION_POST_TIME")
//	private Instant postTime; //po文時間
//	private BufferedImage img;
	
	@Column(name = "POST_THING")
	private String objectName;
	
	@Column(name = "POST_CONTACT")
	private String contact;
	
	@Column(name = "POST_OR") //撿東西或是掉東西
	private String findOrLost;
	
	@Column(name = "POST_COMMENT_NUMBER")
	private int cNum;
	
//	@Column(name = "LOCATION_IMG")
//	private String img;
	
	public Post() {
		
	}
	public Post(String title, String time, Location location, User poster,
			String objectName, String contact, String findOrLost, int cNum){
		this.title = title;
		this.location = location;
		this.time = time;
		this.poster = poster;
		this.objectName = objectName;
		this.contact = contact;
		this.findOrLost = findOrLost;
		this.cNum = cNum;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public Location getLocation() {
		return location;
	}
	public void setLocation(Location location) {
		this.location = location;
	}
	public User getPoster() {
		return poster;
	}
	public void setPoster(User poster) {
		this.poster = poster;
	}
//	public Instant getPostTime() {
//		return postTime;
//	}
//	public void setPostTime(Instant postTime) {
//		this.postTime = postTime;
//	}
//	public BufferedImage getImg() {
//		return img;
//	}
//	public void setImg(BufferedImage img) {
//		this.img = img;
//	}
	public String getObjectName() {
		return objectName;
	}
	public void setObjectName(String objectName) {
		this.objectName = objectName;
	}
	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}
	public String getFindOrLost() {
		return findOrLost;
	}
	public void setFindOrLost(String findOrLost) {
		this.findOrLost = findOrLost;
	}
	public int getcNum() {
		return cNum;
	}
	public void setcNum(int cNum) {
		this.cNum = cNum;
	}
	
}
