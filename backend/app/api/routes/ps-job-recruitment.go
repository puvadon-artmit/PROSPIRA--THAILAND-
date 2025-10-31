package api

import (
	"backend/internal/core/services"
	"backend/internal/handlers"
	"backend/internal/repositories"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func RoutesJobRecruitment(db *gorm.DB) *fiber.App {
	if db == nil {
		panic("Database connection is nil")
	}

	app := fiber.New()

	JobRecruitmentRepository := repositories.NewJobRecruitmentRepositoryDB(db)
	JobRecruitmentService := services.NewJobRecruitmentService(JobRecruitmentRepository)
	JobRecruitmentHandler := handlers.NewJobRecruitmentHandler(JobRecruitmentService)

	app.Post("/create-job-recruitment", JobRecruitmentHandler.CreateJobRecruitmentHandler)
	app.Get("/get-job-recruitments", JobRecruitmentHandler.GetJobRecruitmentsHandler)
	return app
}
