package api

import (
	routes "backend/app/api/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"gorm.io/gorm"
)

func SetupRoutes(app *fiber.App, db *gorm.DB) {
	if db == nil {
		panic("Database connection is nil")
	}

	api := app.Group("/api", logger.New())
	api.Mount("/user", routes.RoutesUser(db))
	api.Mount("/meeting-room", routes.RoutesMeetingRoom(db))
	api.Mount("/job-recruitment", routes.RoutesJobRecruitment(db))
	api.Mount("/job-application", routes.RoutesJobApplication(db))
	api.Mount("/dashboard", routes.RoutesDashboard(db))
	api.Mount("/questionnaire", routes.RoutesQuestionnaire(db))
	api.Mount("/uploads", routes.RoutesUpload())
}
