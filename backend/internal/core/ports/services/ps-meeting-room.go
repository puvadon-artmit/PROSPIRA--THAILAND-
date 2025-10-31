package ports

import "backend/internal/core/models"

type MeetingRoomService interface {
	CreateMeetingRoomService(req models.MeetingRoomResp) error
	GetAllMeetingRoomService() ([]models.MeetingRoomReq, error)
	GetMeetingRoomByIDService(meetingRoomID string) (models.MeetingRoomReq, error)
	UpdateMeetingRoomWithMapService(meetingRoomID string, updates map[string]interface{}) error
	CreateBookingService(booking models.BookingResp) error
	GetBookingsNext7DaysWithUserRoomService(roomID string) ([]models.BookingWithUserRoomResp, error)
	GetBookingsByTimeBookingService(roomID string, timeBooking string) ([]models.BookingWithUserRoomResp, error)
	GetAllMeetingRoomWithDateService(date string) ([]models.MeetingRoomReq, error)
	GetBookingsByMonthService(roomID string) ([]models.BookingWithUserRoomResp, error)
	GetAllBookingService() ([]models.BookingReq, error)
	GetAllBookingStatusCountService() ([]models.BookingStatusCountReq, error)
	GetMeetingRoomCountService() (int64, error)
}
