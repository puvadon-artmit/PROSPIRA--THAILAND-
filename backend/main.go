package main

import (
	routes "backend/app/api"
	"backend/app/middlewares"
	"backend/configs"
	database "backend/external/db"
	redisconfig "backend/external/redis"
	"backend/internal/pkgs/logs"
	"context"
	"fmt"
	"log"
	"net/http"
	_ "net/http/pprof"
	"os"
	"os/signal"

	"github.com/gofiber/fiber/v2"
	"github.com/redis/go-redis/v9"

	"github.com/spf13/viper"
	"gorm.io/gorm"
)

var (
	db          *gorm.DB
	redisClient *redis.Client
)

func init() {
	configs.Init()
	logs.LogInit()
	db = database.InitDataBase()
	redisClient = redisconfig.ConnectRedis()

	pong, err := redisClient.Ping(context.Background()).Result()
	if err != nil {
		log.Fatalf("Could not connect to Redis: %v", err)
	}
	fmt.Println("Connected to Redis:", pong)
}

func main() {
	app := fiber.New(fiber.Config{
		AppName:   "atelnord",
		BodyLimit: 50 * 1024 * 1024,
	})

	go func() {
		log.Println(http.ListenAndServe("0.0.0.0:6060", nil))
	}()

	app.Use(
		middlewares.NewLoggerMiddleware,
		middlewares.NewCorsMiddleware,
	)

	routes.SetupRoutes(app, db)

	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)
	go func() {
		serv := <-c
		if serv.String() == "interrupt" {
			fmt.Println("Gracefully shutting down...")
			app.Shutdown()
		}
	}()

	err := app.Listen("0.0.0.0:" + viper.GetString("server.port"))
	if err != nil {
		log.Fatal(err)
	}
}
