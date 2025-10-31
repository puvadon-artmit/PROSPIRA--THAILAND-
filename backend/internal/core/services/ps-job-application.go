package services

import (
	"backend/internal/core/domains"
	"backend/internal/core/models"
	ports "backend/internal/core/ports/repositories"
	servicesports "backend/internal/core/ports/services"
	"backend/internal/pkgs/logs"
	"fmt"
	"log"
	"time"

	"github.com/google/uuid"
)

type JobApplicationService struct {
	jobApplicationRepo ports.JobApplicationRepository
}

func NewJobApplicationService(jobApplicationRepo ports.JobApplicationRepository) servicesports.JobApplicationService {
	return &JobApplicationService{jobApplicationRepo: jobApplicationRepo}
}

func (s *JobApplicationService) CreateJobApplicationService(req models.JobApplicationResp) error {
	newID := uuid.New()

	domainISR := domains.JobApplication{
		JobApplicationID: newID.String(),
		FullName:         req.FullName,
		Email:            req.Email,
		Phone:            req.Phone,
		Position:         req.Position,
		Resume:           req.Resume,
		Note:             req.Note,
		Status:           req.Status,
		CreatedAt:        time.Now(),
		UpdatedAt:        time.Now(),
	}

	if s.jobApplicationRepo == nil {
		log.Println("UserRepo is nil")
		return fmt.Errorf("user repository is not initialized")
	}

	err := s.jobApplicationRepo.CreateJobApplicationRepository(&domainISR)
	if err != nil {
		logs.Error(err)
		return fmt.Errorf("failed to create user: %w", err)
	}

	return nil
}

func (s *JobApplicationService) GetJobApplications(limit, offset int) ([]models.JobApplicationReq, error) {
	var jobs []models.JobApplicationReq

	query, err := s.jobApplicationRepo.GetJobApplications(limit, offset)
	if err != nil {
		return nil, err
	}

	for _, job := range query {
		jobReq := models.JobApplicationReq{
			JobApplicationID: job.JobApplicationID,
			FullName:         job.FullName,
			Email:            job.Email,
			Phone:            job.Phone,
			Position:         job.Position,
			Resume:           job.Resume,
			Note:             job.Note,
			Status:           job.Status,
			CreatedAt:        job.CreatedAt.Format("2006-01-02 15:04:05"),
			UpdatedAt:        job.UpdatedAt.Format("2006-01-02 15:04:05"),
		}
		jobs = append(jobs, jobReq)
	}

	return jobs, nil
}
