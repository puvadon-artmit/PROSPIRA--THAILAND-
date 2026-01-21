package handlers

import (
	"log"

	"github.com/gofiber/fiber/v2"

	"backend/internal/core/models"
	services "backend/internal/core/ports/services"
	uploader "backend/internal/pkgs/utils"
)

type CompanyNewsHandler struct {
	CompanyNewsSrv services.CompanyNewsService
}

func NewCompanyNewsHandler(insSrv services.CompanyNewsService) *CompanyNewsHandler {
	return &CompanyNewsHandler{CompanyNewsSrv: insSrv}
}

func (h *CompanyNewsHandler) GetCompanyNewsHandler(c *fiber.Ctx) error {
	limit, offset := c.QueryInt("limit", 10), c.QueryInt("offset", 0)
	lang := c.Query("lang", "th")

	// Validate language parameter
	if lang != "en" && lang != "th" {
		lang = "th"
	}

	jobs, err := h.CompanyNewsSrv.GetCompanyNews(limit, offset)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to retrieve company news",
		})
	}

	// Process company news based on language
	processedNews := processNewsByLanguage(jobs.Data, lang)

	return c.JSON(fiber.Map{
		"total":       jobs.Total,
		"total_pages": jobs.TotalPages,
		"limit":       jobs.Limit,
		"offset":      jobs.Offset,
		"data":        processedNews,
	})
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
	lang := c.Query("lang", "th")

	// Validate language parameter
	if lang != "en" && lang != "th" {
		lang = "th"
	}

	job, err := h.CompanyNewsSrv.GetCompanyNewsByTitle(title)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to retrieve company news",
		})
	}

	// Process news based on language
	processedNews := processNewsItemByLanguage(&job, lang)

	return c.JSON(processedNews)
}

func (h *CompanyNewsHandler) GetCompanyNewsByIDHandler(c *fiber.Ctx) error {
	id := c.Query("id")
	lang := c.Query("lang", "th")
	log.Printf("[GetCompanyNewsByIDHandler] Received ID: %s, Lang: %s\n", id, lang)

	// Validate language parameter
	if lang != "en" && lang != "th" {
		lang = "th"
	}

	if id == "" {
		log.Println("[GetCompanyNewsByIDHandler] Error: ID is empty")
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Company news ID is required",
		})
	}

	job, err := h.CompanyNewsSrv.GetCompanyNewsByID(id)
	if err != nil {
		log.Printf("[GetCompanyNewsByIDHandler] Error retrieving company news: %v\n", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to retrieve company news",
		})
	}

	// Process news based on language
	processedNews := processNewsItemByLanguage(&job, lang)

	return c.JSON(processedNews)
}

func (h *CompanyNewsHandler) UpdateCompanyNewsFormHandler(c *fiber.Ctx) error {
	companyNewsID := c.Params("company_news_id")
	log.Printf("[UpdateCompanyNewsFormHandler] Received ID from URL: %s\n", companyNewsID)

	if companyNewsID == "" {
		log.Println("[UpdateCompanyNewsFormHandler] Error: Company news ID is empty")
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Company news ID is required",
		})
	}

	// Validate UUID format (basic check for proper GUID format)
	// Valid UUID format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx or without dashes
	if len(companyNewsID) < 32 {
		log.Printf("[UpdateCompanyNewsFormHandler] Error: ID too short (length: %d)\n", len(companyNewsID))
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid Company news ID format - ID too short",
		})
	}

	log.Printf("[UpdateCompanyNewsFormHandler] Received ID: %s (length: %d)\n", companyNewsID, len(companyNewsID))

	// Handle optional image upload
	var relPath string
	if c.Request().Header.Peek("Content-Type") != nil {
		log.Println("[UpdateCompanyNewsFormHandler] Processing image upload...")
		var err error
		relPath, _, err = uploader.UploadFromForm(c, "image", uploader.Options{
			Dir:          "./uploads/company_news",
			AllowedMIMEs: []string{"image/jpeg", "image/png", "image/webp"},
			MaxSize:      10 << 20,
			BaseURL:      "",
			Required:     false,
		})
		if err != nil {
			log.Printf("[UpdateCompanyNewsFormHandler] Image upload error: %v\n", err)
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
		}
		log.Printf("[UpdateCompanyNewsFormHandler] Image uploaded successfully: %s\n", relPath)
	} else {
		log.Println("[UpdateCompanyNewsFormHandler] No image upload in this request")
	}

	title := c.FormValue("title")
	content := c.FormValue("content")
	category := c.FormValue("category")
	usernameCreator := c.FormValue("username_creator")

	log.Printf("[UpdateCompanyNewsFormHandler] Form values:\n")
	log.Printf("[UpdateCompanyNewsFormHandler]   title: '%s'\n", title)
	log.Printf("[UpdateCompanyNewsFormHandler]   content: '%s'\n", content)
	log.Printf("[UpdateCompanyNewsFormHandler]   category: '%s'\n", category)
	log.Printf("[UpdateCompanyNewsFormHandler]   username_creator: '%s'\n", usernameCreator)
	log.Printf("[UpdateCompanyNewsFormHandler]   photo path: '%s'\n", relPath)

	req := models.CompanyNewsResp{
		Title:            title,
		Content:          content,
		Category:         category,
		CompanyNewsPhoto: relPath,
		UsernameCreator:  usernameCreator,
	}

	log.Printf("[UpdateCompanyNewsFormHandler] Calling UpdateCompanyNewsService with ID: %s\n", companyNewsID)
	if err := h.CompanyNewsSrv.UpdateCompanyNewsService(companyNewsID, req); err != nil {
		log.Printf("[UpdateCompanyNewsFormHandler] Service error: %v\n", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to update company news"})
	}

	log.Println("[UpdateCompanyNewsFormHandler] Update completed successfully")
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Company news updated successfully",
	})
}

func (h *CompanyNewsHandler) DeleteCompanyNewsHandler(c *fiber.Ctx) error {
	companyNewsID := c.Params("company_news_id")
	log.Printf("[DeleteCompanyNewsHandler] Received ID from URL: %s\n", companyNewsID)

	if companyNewsID == "" {
		log.Println("[DeleteCompanyNewsHandler] Error: Company news ID is empty")
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Company news ID is required",
		})
	}

	// Validate UUID format (basic check for proper GUID format)
	if len(companyNewsID) < 32 {
		log.Printf("[DeleteCompanyNewsHandler] Error: ID too short (length: %d)\n", len(companyNewsID))
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid Company news ID format - ID too short",
		})
	}

	log.Printf("[DeleteCompanyNewsHandler] Calling DeleteCompanyNewsService with ID: %s\n", companyNewsID)
	if err := h.CompanyNewsSrv.DeleteCompanyNewsService(companyNewsID); err != nil {
		log.Printf("[DeleteCompanyNewsHandler] Service error: %v\n", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to delete company news"})
	}

	log.Println("[DeleteCompanyNewsHandler] Delete completed successfully")
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Company news deleted successfully",
	})
}

// processNewsByLanguage processes company news list to use English or Thai titles/content
func processNewsByLanguage(news []models.CompanyNewsReq, lang string) []fiber.Map {
	processedNews := make([]fiber.Map, len(news))

	for i, item := range news {
		newsMap := fiber.Map{
			"company_news_id":    item.CompanyNewsID,
			"title":              item.Title,
			"content":            item.Content,
			"category":           item.Category,
			"company_news_photo": item.CompanyNewsPhoto,
			"username_creator":   item.UsernameCreator,
			"created_at":         item.CreatedAt,
			"updated_at":         item.UpdatedAt,
		}

		// Replace with English content if lang is "en"
		if lang == "en" {
			newsMap["title"] = item.TitleEN
			newsMap["content"] = item.ContentEN
		}

		processedNews[i] = newsMap
	}

	return processedNews
}

// processNewsItemByLanguage processes single news item to use English or Thai title/content
func processNewsItemByLanguage(news *models.CompanyNewsReq, lang string) fiber.Map {
	newsMap := fiber.Map{
		"company_news_id":    news.CompanyNewsID,
		"title":              news.Title,
		"content":            news.Content,
		"category":           news.Category,
		"company_news_photo": news.CompanyNewsPhoto,
		"username_creator":   news.UsernameCreator,
		"created_at":         news.CreatedAt,
		"updated_at":         news.UpdatedAt,
	}

	// Replace with English content if lang is "en"
	if lang == "en" {
		newsMap["title"] = news.TitleEN
		newsMap["content"] = news.ContentEN
	}

	return newsMap
}
