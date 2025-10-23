package repositories

import (
	ports "backend/internal/core/ports/repositories"
	"fmt"
	"time"

	"backend/internal/core/domains"

	"gorm.io/gorm"
)

type MeetingRoomRepositoryDB struct {
	db *gorm.DB
}

func NewMeetingRoomRepositoryDB(db *gorm.DB) ports.MeetingRoomRepository {
	// if err := db.AutoMigrate(&domains.Booking{}); err != nil {
	// 	fmt.Printf("failed to auto migrate: %v", err)
	// }
	return &MeetingRoomRepositoryDB{db: db}
}

func (r *MeetingRoomRepositoryDB) CreateMeetingRoom(meetingRoom *domains.MeetingRoom) error {
	if err := r.db.Create(meetingRoom).Error; err != nil {
		fmt.Printf("CreateMeetingRoom error: %v\n", err)
		return err
	}
	return nil
}

func (r *MeetingRoomRepositoryDB) GetAllMeetingRoom() ([]domains.MeetingRoom, error) {
	var reviews []domains.MeetingRoom
	return reviews, r.db.Find(&reviews).Error
}

func (r *MeetingRoomRepositoryDB) GetMeetingRoomByID(meetingRoomID string) (domains.MeetingRoom, error) {
	var meetingRoom domains.MeetingRoom
	return meetingRoom, r.db.Where("meeting_room_id = ?", meetingRoomID).First(&meetingRoom).Error
}

func (r *MeetingRoomRepositoryDB) UpdateMeetingRoomWithMap(meetingRoomID string, updates map[string]interface{}) error {
	if err := r.db.Model(&domains.MeetingRoom{}).
		Where("meeting_room_id = ?", meetingRoomID).
		Updates(updates).Error; err != nil {
		fmt.Printf("UpdateMeetingRoomWithMap error: %v\n", err)
		return err
	}
	return nil
}

func (r *MeetingRoomRepositoryDB) DeleteMeetingRoom(meetingRoomID string) error {
	if err := r.db.Delete(&domains.MeetingRoom{}, "meeting_room_id = ?", meetingRoomID).Error; err != nil {
		fmt.Printf("DeleteMeetingRoom error: %v\n", err)
		return err
	}
	return nil
}

func (r *MeetingRoomRepositoryDB) DeleteBooking(bookingID string) error {
	if err := r.db.Delete(&domains.Booking{}, "booking_id = ?", bookingID).Error; err != nil {
		fmt.Printf("DeleteBooking error: %v\n", err)
		return err
	}
	return nil
}

func (r *MeetingRoomRepositoryDB) CreateBooking(booking *domains.Booking) error {
	if err := r.db.Create(booking).Error; err != nil {
		fmt.Printf("CreateBooking error: %v\n", err)
		return err
	}
	return nil
}

func (r *MeetingRoomRepositoryDB) GetAllBooking() ([]domains.Booking, error) {
	var bookings []domains.Booking
	return bookings, r.db.Preload("User").Find(&bookings).Error
}

func (r *MeetingRoomRepositoryDB) GetBookingByID(bookingID string) (domains.Booking, error) {
	var booking domains.Booking
	return booking, r.db.Where("booking_id = ?", bookingID).First(&booking).Error
}

func (r *MeetingRoomRepositoryDB) UpdateBookingWithMap(bookingID string, updates map[string]interface{}) error {
	if err := r.db.Model(&domains.Booking{}).
		Where("booking_id = ?", bookingID).
		Updates(updates).Error; err != nil {
		fmt.Printf("UpdateBookingWithMap error: %v\n", err)
		return err
	}
	return nil
}

func (r *MeetingRoomRepositoryDB) GetBookingByMeetingRoomID(meetingRoomID string) ([]domains.Booking, error) {
	var bookings []domains.Booking
	return bookings, r.db.Where("meeting_room_id = ?", meetingRoomID).Find(&bookings).Error
}

func (r *MeetingRoomRepositoryDB) GetBookingByUserID(userID string) ([]domains.Booking, error) {
	var bookings []domains.Booking
	return bookings, r.db.Where("user_id = ?", userID).Find(&bookings).Error
}

func (r *MeetingRoomRepositoryDB) GetBookingByMeetingRoomIDAndUserID(meetingRoomID string, userID string) ([]domains.Booking, error) {
	var bookings []domains.Booking
	return bookings, r.db.Where("meeting_room_id = ? AND user_id = ?", meetingRoomID, userID).Find(&bookings).Error
}

func (r *MeetingRoomRepositoryDB) GetBookingByMeetingRoomIDAndUserIDAndStatus(meetingRoomID string, userID string, status string) ([]domains.Booking, error) {
	var bookings []domains.Booking
	return bookings, r.db.Where("meeting_room_id = ? AND user_id = ? AND status = ?", meetingRoomID, userID, status).Find(&bookings).Error
}

func (r *MeetingRoomRepositoryDB) IsRoomBooked(roomID string, startTime, endTime time.Time) (bool, error) {
	var count int64

	err := r.db.Model(&domains.Booking{}).
		Where("room_id = ? AND status = ? AND start_time < ? AND end_time > ?",
			roomID, "approved", endTime, startTime).
		Count(&count).Error

	if err != nil {
		return false, err
	}

	return count > 0, nil
}

func (r *MeetingRoomRepositoryDB) GetBookingsNext7Days(roomID string) ([]domains.Booking, error) {
	var bookings []domains.Booking

	today := time.Now().Truncate(24 * time.Hour)
	end := today.Add(7 * 24 * time.Hour)

	err := r.db.Preload("User").Preload("MeetingRoom").
		Where("meeting_room_id = ? AND start_time >= ? AND start_time < ?", roomID, today, end).
		Order("start_time ASC").
		Find(&bookings).Error

	if err != nil {
		return nil, err
	}
	return bookings, nil
}

func (r *MeetingRoomRepositoryDB) GetBookingsByTimeBooking(
	roomID string, timeBooking string,
) ([]domains.Booking, error) {
	var bookings []domains.Booking

	err := r.db.Preload("User").Preload("MeetingRoom").
		Where("meeting_room_id = ? AND time_booking = ?", roomID, timeBooking).
		Order("start_time ASC").
		Find(&bookings).Error

	if err != nil {
		return nil, err
	}

	return bookings, nil
}

func (r *MeetingRoomRepositoryDB) GetBookingsByMonth(
	roomID string,
) ([]domains.Booking, error) {
	var bookings []domains.Booking

	err := r.db.Preload("User").Preload("MeetingRoom").
		Where("meeting_room_id = ?", roomID).
		Order("start_time ASC").
		Find(&bookings).Error

	if err != nil {
		return nil, err
	}

	return bookings, nil
}

func (r *MeetingRoomRepositoryDB) GetAllBookingStatusCount() ([]domains.BookingStatusCount, error) {
	var results []domains.BookingStatusCount

	err := r.db.Model(&domains.Booking{}).
		Select("status, COUNT(*) as count").
		Group("status").
		Order("status").
		Scan(&results).Error

	if err != nil {
		return nil, err
	}

	return results, nil
}

func (r *MeetingRoomRepositoryDB) GetMeetingRoomCount() (int64, error) {
	var count int64
	err := r.db.Model(&domains.MeetingRoom{}).Count(&count).Error
	return count, err
}
