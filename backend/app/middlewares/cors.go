package middlewares

import (
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

var NewCorsMiddleware = cors.New(cors.Config{
	AllowOrigins: strings.Join([]string{
		"http://localhost:3000",
		"http://localhost:5173",
		"http://10.0.98.208:13002",
		"http://10.0.98.208",
		"http://10.0.98.208:5757",
		"http://localhost:3001",
		"http://localhost:13002",
	}, ","),
	AllowMethods: strings.Join([]string{
		fiber.MethodGet,
		fiber.MethodPost,
		fiber.MethodHead,
		fiber.MethodPut,
		fiber.MethodDelete,
		fiber.MethodPatch,
	}, ","),
	AllowHeaders: strings.Join([]string{
		"Content-Type",
		"Authorization",
		"X-Frame-Options",
		"Access-Control-Allow-Origin",
		"Access-Control-Allow-Headers",
	}, ","),
	AllowCredentials: true,
	ExposeHeaders:    "",
	MaxAge:           0,
})
