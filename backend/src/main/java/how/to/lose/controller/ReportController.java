package how.to.lose.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import how.to.lose.DTO.ReportDTO;
import how.to.lose.model.Report;
import how.to.lose.service.ReportService;
import how.to.lose.service.UserService;
import io.jsonwebtoken.Claims;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/report")
public class ReportController {
	@Autowired
	private ReportService reportService;
	@Autowired
	private UserService userService;
	
	@GetMapping("/list")
	public List<Report> getReports(){
		return reportService.getReports();
	}
	
	@PostMapping("/action")
	public void report(@RequestBody ReportDTO body, @RequestHeader("token")String token) {
		System.out.println(token);
		Claims claims = UserService.checkJwt(token);
		System.out.println(body.reportId);
		System.out.println(body.reportReason);
		System.out.println(claims.getSubject());
		
		if(userService.validation(claims.getSubject())){
			reportService.report(body, claims);
		}
	}
}
