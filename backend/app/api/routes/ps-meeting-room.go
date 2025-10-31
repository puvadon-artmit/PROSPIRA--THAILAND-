package api

import (
	"backend/internal/core/services"
	"backend/internal/handlers"
	"backend/internal/repositories"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func RoutesMeetingRoom(db *gorm.DB) *fiber.App {
	if db == nil {
		panic("database connection is nil")
	}

	app := fiber.New()

	MeetingRoomRepository := repositories.NewMeetingRoomRepositoryDB(db)
	MeetingRoomService := services.NewMeetingRoomService(MeetingRoomRepository)
	MeetingRoomHandler := handlers.NewMeetingRoomHandler(MeetingRoomService)

	app.Post("/create-meeting-room", MeetingRoomHandler.CreateMeetingRoomHandler)
	app.Get("/get-all-meeting-room", MeetingRoomHandler.GetAllMeetingRoomHandler)
	app.Get("/get-meeting-room-by-id/:meeting_room_id", MeetingRoomHandler.GetMeetingRoomByIDHandler)
	app.Patch("/update-meeting-room/:meeting_room_id", MeetingRoomHandler.UpdateMeetingRoomHandler)
	app.Post("/create-booking", MeetingRoomHandler.CreateBookingHandler)
	app.Get("/get-bookings-next-7-day/:meeting_room_id", MeetingRoomHandler.GetBookingsNext7DaysWithUserRoomHandler)
	app.Get("/get-bookings-by-time-booking", MeetingRoomHandler.GetBookingsByTimeBookingHandler)
	app.Get("/get-all-meeting-room-with-date", MeetingRoomHandler.GetAllMeetingRoomWithDateHandler)
	app.Get("/get-bookings-by-month", MeetingRoomHandler.GetBookingsByMonthHandler)
	app.Get("/get-all-booking-status-count", MeetingRoomHandler.GetAllBookingStatusCountHandler)
	app.Get("/get-meeting-room-count", MeetingRoomHandler.GetMeetingRoomCountHandler)
	app.Get("/get-all-booking", MeetingRoomHandler.GetAllBookingHandler)
	return app
}
