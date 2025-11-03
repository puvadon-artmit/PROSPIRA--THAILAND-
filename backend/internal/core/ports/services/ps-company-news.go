package ports

import "backend/internal/core/models"

type CompanyNewsService interface {
	CreateCompanyNewsService(req models.CompanyNewsResp) error
	GetCompanyNews(limit, offset int) ([]models.CompanyNewsReq, error)
	GetCompanyNewsByTitle(title string) (models.CompanyNewsReq, error)
}
