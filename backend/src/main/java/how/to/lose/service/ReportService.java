package how.to.lose.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import how.to.lose.DTO.ReportDTO;
import how.to.lose.model.Location;
import how.to.lose.model.Report;
import how.to.lose.model.User;
import how.to.lose.repository.ReportRepository;
import how.to.lose.repository.UserRepository;
import io.jsonwebtoken.Claims;

@Service
public class ReportService {

	@Autowired
	private ReportRepository reportRepository;
	@Autowired
	private UserService userService;
	@Autowired
	private UserRepository userRepository;
	
	public ReportService(ReportRepository reportRepository, UserService userService, UserRepository userRepository) {
		this.reportRepository = reportRepository;
		this.userService = userService;
		this.userRepository = userRepository;
	}
	
	public List<Report> getReports(){
		return reportRepository.findAll();
	}
	
	public void report(ReportDTO reportDTO, Claims claims) {
		User u = userService.hasUser(claims);
		Report report = new Report(this.hasUser(reportDTO.reportId).getId(), u.getId(), reportDTO.reportReason);
		reportRepository.save(report);
	}
	
	public User hasUser(String reportIdDTO) {
		long id = Long.valueOf(reportIdDTO);
		Optional<User> user = userRepository.findById(id);
		System.out.println(user.get());
		return user.get();
	}
}
