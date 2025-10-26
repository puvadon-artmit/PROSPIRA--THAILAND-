package ports

import "backend/internal/core/domains"

type JobRecruitmentRepository interface {
	CreateJobRecruitmentRepository(User *domains.JobRecruitment) error
	GetJobRecruitmentByID(jobRecruitmentID string) (domains.JobRecruitment, error)
	GetAllJobRecruitment() ([]domains.JobRecruitment, error)
	UpdateJobRecruitmentWithMap(jobRecruitmentID string, updates map[string]interface{}) error
	GetJobRecruitmentCount() (int64, error)
	GetJobRecruitments(limit, offset int) ([]domains.JobRecruitment, error)
}
