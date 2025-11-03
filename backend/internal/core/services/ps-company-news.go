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

type CompanyNewsService struct {
	companyNewsRepo ports.CompanyNewsRepository
}

func NewCompanyNewsService(companyNewsRepo ports.CompanyNewsRepository) servicesports.CompanyNewsService {
	return &CompanyNewsService{companyNewsRepo: companyNewsRepo}
}

func (s *CompanyNewsService) CreateCompanyNewsService(req models.CompanyNewsResp) error {
	newID := uuid.New()

	domainISR := domains.CompanyNews{
		CompanyNewsID:    newID.String(),
		CompanyNewsPhoto: req.CompanyNewsPhoto,
		Title:            req.Title,
		Content:          req.Content,
		Category:         req.Category,
		UsernameCreator:  req.UsernameCreator,
		CreatedAt:        time.Now(),
		UpdatedAt:        time.Now(),
	}

	if s.companyNewsRepo == nil {
		log.Println("UserRepo is nil")
		return fmt.Errorf("user repository is not initialized")
	}

	err := s.companyNewsRepo.CreateCompanyNews(&domainISR)
	if err != nil {
		logs.Error(err)
		return fmt.Errorf("failed to create user: %w", err)
	}

	return nil
}

func (s *CompanyNewsService) GetCompanyNews(limit, offset int) ([]models.CompanyNewsReq, error) {
	var jobs []models.CompanyNewsReq

	query, err := s.companyNewsRepo.GetCompanyNews(limit, offset)
	if err != nil {
		return nil, err
	}

	for _, job := range query {
		jobReq := models.CompanyNewsReq{
			CompanyNewsID:    job.CompanyNewsID,
			CompanyNewsPhoto: job.CompanyNewsPhoto,
			Title:            job.Title,
			Content:          job.Content,
			Category:         job.Category,
			UsernameCreator:  job.UsernameCreator,
			CreatedAt:        job.CreatedAt.Format("2006-01-02 15:04:05"),
			UpdatedAt:        job.UpdatedAt.Format("2006-01-02 15:04:05"),
		}
		jobs = append(jobs, jobReq)
	}

	return jobs, nil
}

func (s *CompanyNewsService) GetCompanyNewsByTitle(title string) (models.CompanyNewsReq, error) {
	job, err := s.companyNewsRepo.GetCompanyNewsByTitle(title)
	if err != nil {
		return models.CompanyNewsReq{}, err
	}

	jobReq := models.CompanyNewsReq{
		CompanyNewsID:    job.CompanyNewsID,
		CompanyNewsPhoto: job.CompanyNewsPhoto,
		Title:            job.Title,
		Content:          job.Content,
		Category:         job.Category,
		UsernameCreator:  job.UsernameCreator,
		CreatedAt:        job.CreatedAt.Format("2006-01-02 15:04:05"),
		UpdatedAt:        job.UpdatedAt.Format("2006-01-02 15:04:05"),
	}

	return jobReq, nil
}
