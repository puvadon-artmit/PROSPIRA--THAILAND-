package ports

import "backend/internal/core/models"

type JobRecruitmentService interface {
	CreateJobRecruitmentService(req models.JobRecruitmentResp) error
	GetJobRecruitments(limit, offset int) ([]models.JobRecruitmentReq, error)
	GetJobRecruitmentByIDService(jobRecruitmentID string) (models.JobRecruitmentReq, error)
	UpdateJobRecruitmentWithMapService(jobRecruitmentID string, updates map[string]interface{}) error
	DeleteJobRecruitmentService(jobRecruitmentID string) error
}
