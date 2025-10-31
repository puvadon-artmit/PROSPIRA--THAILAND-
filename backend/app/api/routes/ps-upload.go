package api

import (
	"backend/internal/handlers"

	"github.com/gofiber/fiber/v2"
)

func RoutesUpload() *fiber.App {
	app := fiber.New()

	app.Get("/get-file", handlers.ServeUploadFile)

	return app
}
