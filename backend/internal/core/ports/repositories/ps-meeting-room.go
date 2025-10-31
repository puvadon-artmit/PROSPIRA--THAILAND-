package ports

import (
	"backend/internal/core/domains"
	"time"
)

type MeetingRoomRepository interface {
	CreateMeetingRoom(meetingRoom *domains.MeetingRoom) error
	GetAllMeetingRoom() ([]domains.MeetingRoom, error)
	GetMeetingRoomByID(meetingRoomID string) (domains.MeetingRoom, error)
	UpdateMeetingRoomWithMap(meetingRoomID string, updates map[string]interface{}) error
	CreateBooking(booking *domains.Booking) error
	GetAllBooking() ([]domains.Booking, error)
	GetBookingByMeetingRoomIDAndUserID(meetingRoomID string, userID string) ([]domains.Booking, error)
	GetBookingByMeetingRoomIDAndUserIDAndStatus(meetingRoomID string, userID string, status string) ([]domains.Booking, error)
	IsRoomBooked(roomID string, startTime, endTime time.Time) (bool, error)
	UpdateBookingWithMap(bookingID string, updates map[string]interface{}) error
	DeleteBooking(bookingID string) error
	GetBookingByUserID(userID string) ([]domains.Booking, error)
	GetBookingByMeetingRoomID(meetingRoomID string) ([]domains.Booking, error)
	GetBookingsNext7Days(roomID string) ([]domains.Booking, error)
	GetBookingsByTimeBooking(roomID string, timeBooking string) ([]domains.Booking, error)
	GetBookingsByMonth(roomID string) ([]domains.Booking, error)
	GetAllBookingStatusCount() ([]domains.BookingStatusCount, error)
	GetMeetingRoomCount() (int64, error)
}
