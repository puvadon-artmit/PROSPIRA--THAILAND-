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

func (s *CompanyNewsService) GetCompanyNews(limit, offset int) (models.CompanyNewsListResp, error) {
	if limit <= 0 {
		limit = 10
	}
	if offset < 0 {
		offset = 0
	}

	query, total, err := s.companyNewsRepo.GetCompanyNews(limit, offset)
	if err != nil {
		return models.CompanyNewsListResp{}, err
	}

	jobs := make([]models.CompanyNewsReq, 0, len(query))
	for _, job := range query {
		jobs = append(jobs, models.CompanyNewsReq{
			CompanyNewsID:    job.CompanyNewsID,
			CompanyNewsPhoto: job.CompanyNewsPhoto,
			Title:            job.Title,
			Content:          job.Content,
			Category:         job.Category,
			UsernameCreator:  job.UsernameCreator,
			CreatedAt:        job.CreatedAt.Format("2006-01-02 15:04:05"),
			UpdatedAt:        job.UpdatedAt.Format("2006-01-02 15:04:05"),
		})
	}

	totalPages := 0
	if total > 0 {
		totalPages = int((total + int64(limit) - 1) / int64(limit))
	}

	return models.CompanyNewsListResp{
		Data:       jobs,
		Total:      total,
		TotalPages: totalPages,
		Limit:      limit,
		Offset:     offset,
	}, nil
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
