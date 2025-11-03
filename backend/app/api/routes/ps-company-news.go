package api

import (
	"backend/internal/core/services"
	"backend/internal/handlers"
	"backend/internal/repositories"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func RoutesCompanyNews(db *gorm.DB) *fiber.App {
	if db == nil {
		panic("Database connection is nil")
	}

	app := fiber.New()

	CompanyNewsRepository := repositories.NewCompanyNewsRepositoryDB(db)
	CompanyNewsService := services.NewCompanyNewsService(CompanyNewsRepository)
	CompanyNewsHandler := handlers.NewCompanyNewsHandler(CompanyNewsService)

	app.Post("/create-company-news", CompanyNewsHandler.CreateCompanyNewsFormHandler)
	app.Get("/get-company-news", CompanyNewsHandler.GetCompanyNewsHandler)
	app.Get("/get-company-news-by-title", CompanyNewsHandler.GetCompanyNewsByTitleHandler)
	return app
}
