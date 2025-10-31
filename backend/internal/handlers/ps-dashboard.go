package handlers

import (
	services "backend/internal/core/ports/services"

	"github.com/gofiber/fiber/v2"
)

type DashboardHandler struct {
	dashboardService services.DashboardService
}

func NewDashboardHandler(dashboardService services.DashboardService) *DashboardHandler {
	return &DashboardHandler{dashboardService: dashboardService}
}

func (h *DashboardHandler) GetDashboardSummary(c *fiber.Ctx) error {
	summary, err := h.dashboardService.GetDashboardSummary()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to get dashboard summary",
		})
	}

	return c.JSON(fiber.Map{
		"summary": summary,
	})
}
