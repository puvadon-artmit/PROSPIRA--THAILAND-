package ports

import "backend/internal/core/models"

type JobApplicationService interface {
	CreateJobApplicationService(req models.JobApplicationResp) error
	GetJobApplications(limit, offset int) ([]models.JobApplicationReq, error)
}
