package handlers

import (
	"fmt"
	"os"
	"path/filepath"

	"github.com/gofiber/fiber/v2"
)

func ServeUploadFile(c *fiber.Ctx) error {

	folder := c.Query("folder")
	filename := c.Query("filename")

	if folder == "" || filename == "" {
		return c.Status(fiber.StatusBadRequest).SendString("Invalid path")
	}
	filePath := filepath.Join("uploads", folder, filename)

	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		return c.Status(fiber.StatusNotFound).SendString(fmt.Sprintf("File not found: %s", filename))
	}

	return c.SendFile(filePath)
}
