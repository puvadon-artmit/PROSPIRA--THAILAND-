package ports

import "backend/internal/core/domains"

type JobApplicationRepository interface {
	CreateJobApplicationRepository(User *domains.JobApplication) error
	GetJobApplicationByID(jobApplicationID string) (domains.JobApplication, error)
	GetAllJobApplication() ([]domains.JobApplication, error)
	GetJobApplications(limit, offset int) ([]domains.JobApplication, error)
	UpdateJobApplicationWithMap(jobApplicationID string, updates map[string]interface{}) error
	GetJobApplicationCount() (int64, error)
}
