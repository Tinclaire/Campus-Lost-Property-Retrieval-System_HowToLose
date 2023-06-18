package how.to.lose.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import how.to.lose.DTO.UserDTO;
import how.to.lose.model.User;
import how.to.lose.repository.UserRepository;
import how.to.lose.service.UserService;
import io.jsonwebtoken.Claims;
import io.micrometer.common.util.StringUtils;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("api/user")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	public UserController(UserService userService) {
		this.userService = userService;
	}
	
	@GetMapping("/users")
	public List<User> getUsers(){
		return userService.getAllUsers();
	}
	@GetMapping("/personal") //PersonalPage user info
	public ResponseEntity<User> getOneUser(@RequestHeader("token") String token){
		return ResponseEntity.ok(userService.getOneUser(token));
	}
	
	
	@PostMapping("/register")
	public void register(@RequestBody UserDTO body) {
		userService.addUser(body);
	}
	@PostMapping("/changeName")
	public ResponseEntity<ReturnTypeB> changeName(@RequestBody UserDTO body, @RequestHeader("token") String token){
		Claims claims = UserService.checkJwt(token);
		return ResponseEntity.ok(new ReturnTypeB(userService.changeName(body, claims)));
	}
	@PostMapping("/changePw")
	public ResponseEntity<ReturnTypeB> changePw(@RequestBody UserDTO body, @RequestHeader("token") String token){
		Claims claims = UserService.checkJwt(token);
		return ResponseEntity.ok(new ReturnTypeB(userService.changePw(body, claims)));
	}
	
	@PostMapping(value = "/login", produces = "application/json;charset=UTF-8")
    public ResponseEntity<ReturnType> userLogin(@RequestBody UserDTO user){
        String id= user.id;
        String password= user.password;
        String result="null data";
        if(StringUtils.isBlank(id)||StringUtils.isBlank(password)){
            return ResponseEntity.ok(new ReturnType(result));
        }else{
            result=userService.verifyUser(Long.parseLong(id), password);
            System.out.println("ok");
            System.out.println(result);
            return ResponseEntity.ok(new ReturnType(result)); 
        }
    }
}

class ReturnType {
	public String result;
	
	public ReturnType(String result) {
		this.result = result;
	}
}
class ReturnTypeB {
	public boolean result;
	
	public ReturnTypeB(boolean result) {
		this.result = result;
	}
}