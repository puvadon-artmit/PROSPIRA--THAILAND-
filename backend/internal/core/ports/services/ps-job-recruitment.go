package ports

import "backend/internal/core/models"

type JobRecruitmentService interface {
	CreateJobRecruitmentService(req models.JobRecruitmentResp) error
	GetJobRecruitments(limit, offset int) ([]models.JobRecruitmentReq, error)
	// GetJobRecruitmentByID(jobRecruitmentID string) (models.JobRecruitmentResp, error)
	// GetAllJobRecruitment() ([]models.JobRecruitmentResp, error)
	// GetJobRecruitments(limit, offset int) ([]models.JobRecruitmentResp, error)
	// UpdateJobRecruitmentWithMap(jobRecruitmentID string, updates map[string]interface{}) error
	// GetJobRecruitmentCount() (int64, error)
}
