package how.to.lose.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "locations")
public class Location {
	
	@Id
	@Column(name = "LOCATION_ID", unique = true, nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "LOCATION_NAME")
	private String locaName;
	
//	@OneToMany
//	private List<Post> posts;
	
	public Location() {
		
	}
	public Location(String locaName) {
//		this.id = id;
		this.locaName = locaName;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getLocaName() {
		return locaName;
	}
	public void setLocaName(String locaNmae) {
		this.locaName = locaNmae;
	}
	
	
}
