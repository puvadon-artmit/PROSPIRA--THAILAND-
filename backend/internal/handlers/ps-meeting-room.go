package handlers

import (
	"backend/internal/core/models"
	services "backend/internal/core/ports/services"
	"backend/internal/pkgs/utils"
	"strconv"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type MeetingRoomHandler struct {
	meetingRoomService services.MeetingRoomService
}

func NewMeetingRoomHandler(meetingRoomService services.MeetingRoomService) *MeetingRoomHandler {
	return &MeetingRoomHandler{meetingRoomService: meetingRoomService}
}

func (h *MeetingRoomHandler) CreateMeetingRoomHandler(c *fiber.Ctx) error {
	// รับไฟล์
	file, err := c.FormFile("file")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "file is required",
		})
	}

	fileData, err := file.Open()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to read file",
		})
	}
	defer fileData.Close()

	documentURL, err := utils.UploadSignedUrl("meeting-room", file.Filename, fileData)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to upload file",
		})
	}

	// แปลง capacity
	capacity, err := strconv.Atoi(c.FormValue("capacity"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "capacity must be a number",
		})
	}

	facilities := strings.Split(c.FormValue("facilities"), ",")
	availableAt := strings.Split(c.FormValue("available_at"), ",")

	meetingRoomResp := models.MeetingRoomResp{
		MeetingRoomID:    uuid.New().String(),
		MeetingRoomImage: documentURL,
		MeetingRoomName:  c.FormValue("meeting_room_name"),
		Capacity:         capacity,
		Description:      c.FormValue("description"),
		Facilities:       facilities,
		AvailableAt:      availableAt,
	}

	// สร้าง meeting room
	err = h.meetingRoomService.CreateMeetingRoomService(meetingRoomResp)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to create meeting room",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "Meeting room created successfully",
	})
}

func (h *MeetingRoomHandler) GetAllMeetingRoomHandler(c *fiber.Ctx) error {
	meetingRooms, err := h.meetingRoomService.GetAllMeetingRoomService()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to retrieve meeting rooms",
		})
	}
	return c.JSON(meetingRooms)
}

func (h *MeetingRoomHandler) GetMeetingRoomByIDHandler(c *fiber.Ctx) error {
	meetingRoomID := c.Params("meeting_room_id")
	if meetingRoomID == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "meeting room ID is required",
		})
	}

	meetingRoom, err := h.meetingRoomService.GetMeetingRoomByIDService(meetingRoomID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to retrieve meeting room",
		})
	}
	return c.JSON(meetingRoom)
}

func (h *MeetingRoomHandler) UpdateMeetingRoomHandler(c *fiber.Ctx) error {
	meetingRoomID := c.Params("meeting_room_id")
	if meetingRoomID == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "meeting room ID is required",
		})
	}

	meetingRoom, err := h.meetingRoomService.GetMeetingRoomByIDService(meetingRoomID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to retrieve meeting room",
		})
	}
	return c.JSON(meetingRoom)
}

func (h *MeetingRoomHandler) CreateBookingHandler(c *fiber.Ctx) error {
	var bookingReq models.BookingResp

	if err := c.BodyParser(&bookingReq); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request body",
			"error":   err.Error(),
		})
	}

	if err := h.meetingRoomService.CreateBookingService(bookingReq); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to create booking",
			"error":   err.Error(),
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "Booking created successfully",
	})
}

func (h *MeetingRoomHandler) GetBookingsNext7DaysWithUserRoomHandler(c *fiber.Ctx) error {
	roomID := c.Params("meeting_room_id")
	if roomID == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "meeting room ID is required"})
	}

	bookings, err := h.meetingRoomService.GetBookingsNext7DaysWithUserRoomService(roomID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "Failed to retrieve bookings"})
	}

	return c.JSON(bookings)
}

func (h *MeetingRoomHandler) GetBookingsByTimeBookingHandler(c *fiber.Ctx) error {
	roomID := c.Query("meeting_room_id")
	timeBooking := c.Query("time_booking")
	if roomID == "" || timeBooking == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "meeting room ID and time booking are required"})
	}

	bookings, err := h.meetingRoomService.GetBookingsByTimeBookingService(roomID, timeBooking)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "Failed to retrieve bookings"})
	}

	return c.JSON(bookings)
}

func (h *MeetingRoomHandler) GetAllMeetingRoomWithDateHandler(c *fiber.Ctx) error {
	date := c.Query("date")
	if date == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "date is required"})
	}

	bookings, err := h.meetingRoomService.GetAllMeetingRoomWithDateService(date)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "Failed to retrieve bookings"})
	}

	return c.JSON(bookings)
}

func (h *MeetingRoomHandler) GetBookingsByMonthHandler(c *fiber.Ctx) error {
	roomID := c.Query("meeting_room_id")
	if roomID == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "meeting room ID is required"})
	}

	bookings, err := h.meetingRoomService.GetBookingsByMonthService(roomID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "Failed to retrieve bookings"})
	}

	return c.JSON(bookings)
}

func (h *MeetingRoomHandler) GetAllBookingStatusCountHandler(c *fiber.Ctx) error {
	bookings, err := h.meetingRoomService.GetAllBookingStatusCountService()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "Failed to retrieve bookings"})
	}

	return c.JSON(bookings)
}

func (h *MeetingRoomHandler) GetMeetingRoomCountHandler(c *fiber.Ctx) error {
	count, err := h.meetingRoomService.GetMeetingRoomCountService()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to retrieve meeting room count",
		})
	}

	return c.JSON(fiber.Map{
		"total_meeting_rooms": count,
	})
}

func (h *MeetingRoomHandler) GetAllBookingHandler(c *fiber.Ctx) error {
	bookings, err := h.meetingRoomService.GetAllBookingService()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "Failed to retrieve bookings"})
	}

	return c.JSON(bookings)
}
