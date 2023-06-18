package how.to.lose.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "reports")
public class Report {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "REPORT_ID", unique = true, nullable = false)
	private int id;
	
//	@ManyToOne
//	@JoinColumn(name = "USER_BE_REPORTED_ID", insertable = false, updatable=false)
	@Column(name = "USER_BE_REPORTED_ID")
	private long beReported;
//	@ManyToOne
//	@JoinColumn(name = "USER_REPORT_ID", insertable = false, updatable=false)
	@Column(name = "USER_REPORT_ID")
	private long report;
	@Column(name = "REPORT_REASON")
	private String reason;
	
	public Report() {
		
	}
	public Report(long beReported, long report, String reason) {
		this.beReported = beReported;
		this.report = report;
		this.reason = reason;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public long getBeReported() {
		return beReported;
	}
	public void setBeReported(long beReported) {
		this.beReported = beReported;
	}
	public long getReport() {
		return report;
	}
	public void setReport(long report) {
		this.report = report;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	
}
