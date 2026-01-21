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
	lang := c.Query("lang", "th")

	// Validate language parameter
	if lang != "en" && lang != "th" {
		lang = "th"
	}

	jobs, err := h.JobRecruitmentSrv.GetJobRecruitments(limit, offset)
	if err != nil {
		log.Printf("[GetJobRecruitmentsHandler] Error: %v\n", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to retrieve job recruitments",
		})
	}

	// Process jobs based on language
	processedJobs := processJobsByLanguage(jobs, lang)

	return c.JSON(processedJobs)
}

func (h *JobRecruitmentHandler) GetJobRecruitmentByIDHandler(c *fiber.Ctx) error {
	jobRecruitmentID := c.Params("job_recruitment_id")
	lang := c.Query("lang", "th")

	// Validate language parameter
	if lang != "en" && lang != "th" {
		lang = "th"
	}

	job, err := h.JobRecruitmentSrv.GetJobRecruitmentByIDService(jobRecruitmentID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to retrieve job recruitment",
		})
	}

	// Process job based on language
	processedJob := processJobByLanguage(&job, lang)

	return c.JSON(processedJob)
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

// processJobsByLanguage processes job list to use English or Thai titles/descriptions
func processJobsByLanguage(jobs []models.JobRecruitmentReq, lang string) []fiber.Map {
	processedJobs := make([]fiber.Map, len(jobs))

	for i, item := range jobs {
		jobMap := fiber.Map{
			"job_recruitment_id": item.JobRecruitmentID,
			"title":              item.Title,
			"department":         item.Department,
			"location":           item.Location,
			"type":               item.Type,
			"salary":             item.Salary,
			"hot":                item.Hot,
			"description":        item.Description,
			"requirements":       item.Requirements,
			"username_creator":   item.UsernameCreator,
			"created_at":         item.CreatedAt,
			"updated_at":         item.UpdatedAt,
		}

		// Replace with English content if lang is "en"
		if lang == "en" {
			jobMap["title"] = item.TitleEN
			jobMap["description"] = item.DescriptionEN
			jobMap["requirements"] = item.RequirementsEN
		}

		processedJobs[i] = jobMap
	}

	return processedJobs
}

// processJobByLanguage processes single job item to use English or Thai title/description
func processJobByLanguage(job *models.JobRecruitmentReq, lang string) fiber.Map {
	jobMap := fiber.Map{
		"job_recruitment_id": job.JobRecruitmentID,
		"title":              job.Title,
		"department":         job.Department,
		"location":           job.Location,
		"type":               job.Type,
		"salary":             job.Salary,
		"hot":                job.Hot,
		"description":        job.Description,
		"requirements":       job.Requirements,
		"username_creator":   job.UsernameCreator,
		"created_at":         job.CreatedAt,
		"updated_at":         job.UpdatedAt,
	}

	// Replace with English content if lang is "en"
	if lang == "en" {
		jobMap["title"] = job.TitleEN
		jobMap["description"] = job.DescriptionEN
	}

	return jobMap
}
