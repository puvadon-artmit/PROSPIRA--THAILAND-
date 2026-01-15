package handlers

import (
	"log"

	"github.com/gofiber/fiber/v2"

	"backend/internal/core/models"
	services "backend/internal/core/ports/services"
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

func (h *JobRecruitmentHandler) GetJobRecruitmentByIDHandler(c *fiber.Ctx) error {
	jobRecruitmentID := c.Params("job_recruitment_id")

	job, err := h.JobRecruitmentSrv.GetJobRecruitmentByIDService(jobRecruitmentID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to retrieve job recruitment",
		})
	}

	return c.JSON(job)
}

func (h *JobRecruitmentHandler) UpdateJobRecruitmentWithMapHandler(c *fiber.Ctx) error {
	jobRecruitmentID := c.Params("job_recruitment_id")
	var updates map[string]interface{}

	if err := c.BodyParser(&updates); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request payload",
		})
	}

	if h.JobRecruitmentSrv == nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Service is not available",
		})
	}

	err := h.JobRecruitmentSrv.UpdateJobRecruitmentWithMapService(jobRecruitmentID, updates)
	if err != nil {
		log.Println("Error updating job recruitment:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to update job recruitment",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Job recruitment updated successfully",
	})
}

func (h *JobRecruitmentHandler) DeleteJobRecruitmentHandler(c *fiber.Ctx) error {
	jobRecruitmentID := c.Params("job_recruitment_id")
	log.Printf("[DeleteJobRecruitmentHandler] Received ID: %s\n", jobRecruitmentID)

	if jobRecruitmentID == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Job recruitment ID is required",
		})
	}

	if h.JobRecruitmentSrv == nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Service is not available",
		})
	}

	err := h.JobRecruitmentSrv.DeleteJobRecruitmentService(jobRecruitmentID)
	if err != nil {
		log.Printf("[DeleteJobRecruitmentHandler] Error: %v\n", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to delete job recruitment",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Job recruitment deleted successfully",
	})
}
