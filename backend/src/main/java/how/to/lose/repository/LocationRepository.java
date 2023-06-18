package how.to.lose.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import how.to.lose.model.Location;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long>{

}
