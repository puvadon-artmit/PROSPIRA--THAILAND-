package services

import (
	"backend/internal/core/domains"
	"backend/internal/core/models"
	ports "backend/internal/core/ports/repositories"
	servicesports "backend/internal/core/ports/services"
	"backend/internal/pkgs/logs"
	"encoding/json"
	"fmt"
	"log"
	"time"

	"github.com/google/uuid"
	"gorm.io/datatypes"
)

type JobRecruitmentService struct {
	jobRecruitmentRepo ports.JobRecruitmentRepository
}

func NewJobRecruitmentService(jobRecruitmentRepo ports.JobRecruitmentRepository) servicesports.JobRecruitmentService {
	return &JobRecruitmentService{jobRecruitmentRepo: jobRecruitmentRepo}
}

func (s *JobRecruitmentService) CreateJobRecruitmentService(req models.JobRecruitmentResp) error {
	newID := uuid.New()
	requirementsBytes, err := json.Marshal(req.Requirements)
	if err != nil {
		return fmt.Errorf("failed to marshal requirements: %w", err)
	}

	domainISR := domains.JobRecruitment{
		JobRecruitmentID: newID.String(),
		Title:            req.Title,
		Department:       req.Department,
		Location:         req.Location,
		Type:             req.Type,
		Salary:           req.Salary,
		Hot:              req.Hot,
		Description:      req.Description,
		Requirements:     datatypes.JSON(requirementsBytes),
		UsernameCreator:  req.UsernameCreator,
		CreatedAt:        time.Now(),
		UpdatedAt:        time.Now(),
	}

	if s.jobRecruitmentRepo == nil {
		log.Println("UserRepo is nil")
		return fmt.Errorf("user repository is not initialized")
	}

	err = s.jobRecruitmentRepo.CreateJobRecruitmentRepository(&domainISR)
	if err != nil {
		logs.Error(err)
		return fmt.Errorf("failed to create user: %w", err)
	}

	return nil
}

func (s *JobRecruitmentService) GetJobRecruitments(limit, offset int) ([]models.JobRecruitmentReq, error) {
	var jobs []models.JobRecruitmentReq

	query, err := s.jobRecruitmentRepo.GetJobRecruitments(limit, offset)
	if err != nil {
		return nil, err
	}

	for _, job := range query {
		var requirements []string
		if err := json.Unmarshal(job.Requirements, &requirements); err != nil {
			return nil, fmt.Errorf("failed to unmarshal requirements: %w", err)
		}

		jobReq := models.JobRecruitmentReq{
			JobRecruitmentID: job.JobRecruitmentID,
			Title:            job.Title,
			Department:       job.Department,
			Location:         job.Location,
			Type:             job.Type,
			Salary:           job.Salary,
			Hot:              job.Hot,
			Description:      job.Description,
			Requirements:     requirements,
			UsernameCreator:  job.UsernameCreator,
			CreatedAt:        job.CreatedAt.Format("2006-01-02 15:04:05"),
			UpdatedAt:        job.UpdatedAt.Format("2006-01-02 15:04:05"),
		}
		jobs = append(jobs, jobReq)
	}

	return jobs, nil
}
