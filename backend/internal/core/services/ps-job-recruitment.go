package services

import (
	"encoding/json"
	"fmt"
	"log"
	"time"

	"github.com/google/uuid"

	"backend/internal/core/domains"
	"backend/internal/core/models"
	ports "backend/internal/core/ports/repositories"
	servicesports "backend/internal/core/ports/services"
	"backend/internal/pkgs/logs"
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
		Requirements:     string(requirementsBytes),
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
		if job.Requirements != "" {
			if err := json.Unmarshal([]byte(job.Requirements), &requirements); err != nil {
				log.Printf("[GetJobRecruitments] Warning: failed to unmarshal requirements for job %s: %v, using empty array\n", job.JobRecruitmentID, err)
				requirements = []string{}
			}
		} else {
			requirements = []string{}
		}

		var requirementsEN []string
		if job.RequirementsEN != "" {
			if err := json.Unmarshal([]byte(job.RequirementsEN), &requirementsEN); err != nil {
				log.Printf("[GetJobRecruitments] Warning: failed to unmarshal requirements_en for job %s: %v, using empty array\n", job.JobRecruitmentID, err)
				requirementsEN = []string{}
			}
		} else {
			requirementsEN = []string{}
		}

		jobReq := models.JobRecruitmentReq{
			JobRecruitmentID: job.JobRecruitmentID,
			Title:            job.Title,
			TitleEN:          job.TitleEN,
			Department:       job.Department,
			Location:         job.Location,
			Type:             job.Type,
			Salary:           job.Salary,
			Hot:              job.Hot,
			Description:      job.Description,
			DescriptionEN:    job.DescriptionEN,
			Requirements:     requirements,
			RequirementsEN:   requirementsEN,
			UsernameCreator:  job.UsernameCreator,
			CreatedAt:        job.CreatedAt.Format("2006-01-02 15:04:05"),
			UpdatedAt:        job.UpdatedAt.Format("2006-01-02 15:04:05"),
		}
		jobs = append(jobs, jobReq)
	}

	// fmt.Println("JobRecruitmentID : ", jobs)

	return jobs, nil
}

func (s *JobRecruitmentService) UpdateJobRecruitmentWithMapService(jobRecruitmentID string, updates map[string]interface{}) error {
	return s.jobRecruitmentRepo.UpdateJobRecruitmentWithMap(jobRecruitmentID, updates)
}

func (s *JobRecruitmentService) GetJobRecruitmentByIDService(jobRecruitmentID string) (models.JobRecruitmentReq, error) {
	var out models.JobRecruitmentReq

	query, err := s.jobRecruitmentRepo.GetJobRecruitmentByID(jobRecruitmentID)
	if err != nil {
		return out, err
	}

	var requirements []string
	if query.Requirements != "" {
		if err := json.Unmarshal([]byte(query.Requirements), &requirements); err != nil {
			log.Printf("[GetJobRecruitmentByIDService] Warning: failed to unmarshal requirements for job %s: %v, using empty array\n", query.JobRecruitmentID, err)
			requirements = []string{}
		}
	} else {
		requirements = []string{}
	}

	var requirementsEN []string
	if query.RequirementsEN != "" {
		if err := json.Unmarshal([]byte(query.RequirementsEN), &requirementsEN); err != nil {
			log.Printf("[GetJobRecruitmentByIDService] Warning: failed to unmarshal requirements_en for job %s: %v, using empty array\n", query.JobRecruitmentID, err)
			requirementsEN = []string{}
		}
	} else {
		requirementsEN = []string{}
	}

	out = models.JobRecruitmentReq{
		JobRecruitmentID: query.JobRecruitmentID,
		Title:            query.Title,
		TitleEN:          query.TitleEN,
		Department:       query.Department,
		Location:         query.Location,
		Type:             query.Type,
		Salary:           query.Salary,
		Hot:              query.Hot,
		Description:      query.Description,
		DescriptionEN:    query.DescriptionEN,
		Requirements:     requirements,
		RequirementsEN:   requirementsEN,
		UsernameCreator:  query.UsernameCreator,
		CreatedAt:        query.CreatedAt.Format("2006-01-02 15:04:05"),
		UpdatedAt:        query.UpdatedAt.Format("2006-01-02 15:04:05"),
	}

	return out, nil
}

func (s *JobRecruitmentService) DeleteJobRecruitmentService(jobRecruitmentID string) error {
	log.Printf("[DeleteJobRecruitmentService] Starting delete for ID: %s\n", jobRecruitmentID)

	if jobRecruitmentID == "" {
		log.Println("[DeleteJobRecruitmentService] Job recruitment ID is empty!")
		return fmt.Errorf("job recruitment ID is required")
	}

	if s.jobRecruitmentRepo == nil {
		log.Println("[DeleteJobRecruitmentService] JobRecruitmentRepo is nil")
		return fmt.Errorf("job recruitment repository is not initialized")
	}

	err := s.jobRecruitmentRepo.DeleteJobRecruitment(jobRecruitmentID)
	if err != nil {
		log.Printf("[DeleteJobRecruitmentService] Repository error: %v\n", err)
		logs.Error(err)
		return fmt.Errorf("failed to delete job recruitment: %w", err)
	}

	log.Println("[DeleteJobRecruitmentService] Delete completed successfully")
	return nil
}
