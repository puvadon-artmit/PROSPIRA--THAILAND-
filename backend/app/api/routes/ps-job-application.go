package api

import (
	"backend/internal/core/services"
	"backend/internal/handlers"
	"backend/internal/repositories"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func RoutesJobApplication(db *gorm.DB) *fiber.App {
	if db == nil {
		panic("Database connection is nil")
	}

	app := fiber.New()

	JobApplicationRepository := repositories.NewJobApplicationRepositoryDB(db)
	JobApplicationService := services.NewJobApplicationService(JobApplicationRepository)
	JobApplicationHandler := handlers.NewJobApplicationHandler(JobApplicationService)

	app.Post("/create-job-application", JobApplicationHandler.CreateJobApplicationFormHandler)
	app.Get("/get-job-applications", JobApplicationHandler.GetJobApplicationsHandler)
	return app
}
