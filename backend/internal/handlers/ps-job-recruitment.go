package handlers

import (
	"backend/internal/core/models"
	services "backend/internal/core/ports/services"
	"log"

	"github.com/gofiber/fiber/v2"
)

type JobRecruitmentHandler struct {
	JobRecruitmentSrv services.JobRecruitmentService
}

func NewJobRecruitmentHandler(insSrv services.JobRecruitmentService) *JobRecruitmentHandler {
	return &JobRecruitmentHandler{JobRecruitmentSrv: insSrv}
}

func (h *JobRecruitmentHandler) CreateJobRecruitmentHandler(c *fiber.Ctx) error {
	var req models.JobRecruitmentResp

	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request payload",
		})
	}

	if h.JobRecruitmentSrv == nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Service is not available",
		})
	}

	err := h.JobRecruitmentSrv.CreateJobRecruitmentService(req)
	if err != nil {
		log.Println("Error creating  User:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to create  User",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "User  created successfully",
	})
}

func (h *JobRecruitmentHandler) GetJobRecruitmentsHandler(c *fiber.Ctx) error {
	limit, offset := c.QueryInt("limit", 10), c.QueryInt("offset", 0)

	jobs, err := h.JobRecruitmentSrv.GetJobRecruitments(limit, offset)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to retrieve job recruitments",
		})
	}

	return c.JSON(jobs)
}
