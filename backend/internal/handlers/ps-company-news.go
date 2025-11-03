package handlers

import (
	"backend/internal/core/models"
	services "backend/internal/core/ports/services"
	uploader "backend/internal/pkgs/utils"
	"log"

	"github.com/gofiber/fiber/v2"
)

type CompanyNewsHandler struct {
	CompanyNewsSrv services.CompanyNewsService
}

func NewCompanyNewsHandler(insSrv services.CompanyNewsService) *CompanyNewsHandler {
	return &CompanyNewsHandler{CompanyNewsSrv: insSrv}
}

func (h *CompanyNewsHandler) GetCompanyNewsHandler(c *fiber.Ctx) error {
	limit, offset := c.QueryInt("limit", 10), c.QueryInt("offset", 0)

	jobs, err := h.CompanyNewsSrv.GetCompanyNews(limit, offset)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to retrieve company news",
		})
	}

	return c.JSON(jobs)
}

func (h *CompanyNewsHandler) CreateCompanyNewsFormHandler(c *fiber.Ctx) error {
	relPath, publicURL, err := uploader.UploadFromForm(c, "image", uploader.Options{
		Dir:          "./uploads/company_news",
		AllowedMIMEs: []string{"image/jpeg", "image/png", "image/webp"},
		MaxSize:      10 << 20,
		BaseURL:      "",
		Required:     false,
	})
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}

	req := models.CompanyNewsResp{
		Title:            c.FormValue("title"),
		Content:          c.FormValue("content"),
		Category:         c.FormValue("category"),
		CompanyNewsPhoto: relPath,
		UsernameCreator:  c.FormValue("username_creator"),
	}

	if err := h.CompanyNewsSrv.CreateCompanyNewsService(req); err != nil {
		log.Println("Error creating company news:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create company news"})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "Company news created successfully",
		"file":    relPath,
		"url":     publicURL,
	})
}

func (h *CompanyNewsHandler) GetCompanyNewsByTitleHandler(c *fiber.Ctx) error {
	title := c.Query("title")

	job, err := h.CompanyNewsSrv.GetCompanyNewsByTitle(title)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to retrieve company news",
		})
	}

	return c.JSON(job)
}
