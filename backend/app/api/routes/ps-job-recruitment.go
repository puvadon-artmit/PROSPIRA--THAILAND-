package api

import (
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"

	"backend/internal/core/services"
	"backend/internal/handlers"
	"backend/internal/repositories"
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
	app.Get("/get-job-recruitment/:job_recruitment_id", JobRecruitmentHandler.GetJobRecruitmentByIDHandler)
	app.Put("/update-job-recruitment/:job_recruitment_id", JobRecruitmentHandler.UpdateJobRecruitmentWithMapHandler)
	app.Delete("/delete-job-recruitment/:job_recruitment_id", JobRecruitmentHandler.DeleteJobRecruitmentHandler)
	return app
}
