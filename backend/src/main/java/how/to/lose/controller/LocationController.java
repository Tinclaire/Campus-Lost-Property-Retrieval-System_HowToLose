package how.to.lose.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import how.to.lose.model.Location;
import how.to.lose.model.User;
import how.to.lose.repository.LocationRepository;
import how.to.lose.repository.UserRepository;

@RestController
@RequestMapping("api/")
public class LocationController {

	@Autowired
	private LocationRepository locationRepository;
	@GetMapping("locations")
	public List<Location> getLocations(){
		return locationRepository.findAll();
	}
}
