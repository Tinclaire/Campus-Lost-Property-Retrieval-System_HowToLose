package how.to.lose.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import how.to.lose.DTO.PostDTO;
import how.to.lose.DTO.UserDTO;
import how.to.lose.model.Post;
import how.to.lose.model.User;
import how.to.lose.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class UserService {
	
	private UserRepository userRepository;
	
	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	public List<User> getAllUsers(){
		return this.userRepository.findAll();
	}
//	public Optional<User> getOneUser(long id) {
//		return userRepository.findById(id);
//	}
	public User getOneUser(String token) {
		Claims claims = UserService.checkJwt(token);
		long id = Long.valueOf(claims.getSubject());
		Optional<User> user = userRepository.findById(id);
		return user.get();
	}

	public User hasUser(Claims claims) {
		long id = Long.valueOf(claims.getSubject());
		Optional<User> u = userRepository.findById(id);
		return u.get();
	}
	
	public void addUser(UserDTO userDTO) {
//		boolean ok = false;
		int name = userDTO.username.length();
		int id = userDTO.studentId.length();
		int pw = userDTO.password.length();
		int cpw = userDTO.confirmPassword.length();
		if(name > 2 && name < 17 && id==9 && pw > 7 && pw < 21 && userDTO.password.equals(userDTO.confirmPassword)) {
			User user = new User(userDTO.username, Long.valueOf(userDTO.studentId), userDTO.password);
			userRepository.save(user);
//			ok = true;
		}else {
			throw new Error("doesn't fit the format");
		}
//		return ok;
	}
	
	public boolean changeName(UserDTO userDTO, Claims claims) {
		boolean success = false;
		User user = this.hasUser(claims);
		int nameLength = userDTO.newUsername.length();
		if(nameLength> 2 && nameLength < 17) {
			user.setName(userDTO.newUsername);
			this.userRepository.save(user);
			success = true;
		}
		return success;
	}
	
	public boolean changePw(UserDTO userDTO , Claims claims) {
		boolean success = false;
		int pwLength = userDTO.newPassword.length();
		if(pwLength> 2 && pwLength < 17 && userDTO.newPassword.equals(userDTO.confirmNewPassword)){
			User user = hasUser(claims);
			user.setPw(userDTO.newPassword);
			this.userRepository.save(user);
			success = true;
		}else {
			throw new Error("confirmPw is wrong");
		}
		return success;
	}
	
	public String verifyUser(long id, String pw){
        /*
         0000 login success
         0001 wrong id
         0002 wrong pw
         0004 acct locked
         9999 unknown error
         */
        Optional<User> user=userRepository.findById(id);
        String result="";
        if(user.isPresent()){ //isPresent() confirm user是否存在
            if(user.get().getPw().equals(pw)){
//            	Date expireDate = new Date(System.currentTimeMillis()+ 30 * 60 * 1000);
            	//設定30min過期
                String jwtToken = Jwts.builder()
                	.setSubject(String.valueOf(id)) //我以id當subject
//                    .setExpiration(expireDate)
                    //MySecret是自訂的私鑰，HS512是自選的演算法，可以任意改變
                    .signWith(SignatureAlgorithm.HS512,"MySecret")
                    .compact();
                //直接將JWT傳回
                result=jwtToken;
//                result="0000";
            }else{
                throw new Error("wrong password");
            }
        }else{
            throw new Error("user not found");
        }
        return result;        
    }
	
	//解碼token
	public static Claims checkJwt(String token) {
		try {
			final Claims claims = Jwts.parser().setSigningKey("MySecret")
					.parseClaimsJws(token.replace("", ""))
					.getBody();
			return claims;
				
		}catch(Exception e) {
			return null;
		}
	}
		
	public boolean validation(String claimsId) {
		boolean has = false;
		System.out.println("claims::" + claimsId);
		long id = Long.valueOf(claimsId);
		Optional<User> u = userRepository.findById(id);
		System.out.println("user:" + u);
		if(u.get().getId() == (Long.valueOf(claimsId))) {
			has = true;
		}else {
			throw new Error("Wronggggggg");				
		} 
		return has;
	}
}
