package how.to.lose.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import how.to.lose.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
//	public User 
}
