package api

import (
	"backend/internal/core/services"
	"backend/internal/handlers"
	"backend/internal/repositories"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func RoutesDashboard(db *gorm.DB) *fiber.App {
	if db == nil {
		panic("Database connection is nil")
	}

	app := fiber.New()

	DashboardRepository := repositories.NewDashboardRepositoryDB(db)
	DashboardService := services.NewDashboardService(DashboardRepository)
	DashboardHandler := handlers.NewDashboardHandler(DashboardService)

	app.Get("/summary", DashboardHandler.GetDashboardSummary)
	return app
}
