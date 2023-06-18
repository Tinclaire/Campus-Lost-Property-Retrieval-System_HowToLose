package how.to.lose.model;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "users")
public class User {
	
	//有啥啊 我想一下
	@Id
	@Column(name = "USER_ID", unique = true, nullable = false)
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long u_id; //student id
	
	@Column(name = "USER_NAME")
	private String u_name;
	@Column(name = "USER_PW")
	private String u_pw;
//	@Column(name = "USER_ICON")
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	private int u_icon;
	
	public User() {
		
	}
	public User(String name, long id, String pw){
		this.u_name = name;
		this.u_id = id;
		this.u_pw = pw;
//		this.u_icon = icon;
	}
	
	//getter and setter
	public String getName() {
		return u_name;
	}
	public long getId() {
		return u_id;
	}
	public String getPw() {
		return u_pw;
	}
//	public int getIcon() {
//		return u_icon;
//	}
	
	public void setName(String name) {
		this.u_name = name;
	}
	public void setId(int id) {
		this.u_id = id;
	}
	public void setPw(String pw) {
		this.u_pw = pw;
	}
//	public void setIcon(int icon) {
//		this.u_icon = icon;
//	}
	
	

}
