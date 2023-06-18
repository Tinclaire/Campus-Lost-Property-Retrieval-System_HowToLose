package how.to.lose.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import how.to.lose.model.Report;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long>{

}
