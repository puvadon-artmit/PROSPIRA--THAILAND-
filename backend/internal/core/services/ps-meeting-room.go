package services

import (
	"backend/internal/core/domains"
	"backend/internal/core/models"
	repositorieports "backend/internal/core/ports/repositories"
	serviceports "backend/internal/core/ports/services"
	"backend/internal/pkgs/logs"
	"encoding/json"
	"errors"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/spf13/viper"
)

type MeetingRoomService struct {
	MeetingRoomRepo repositorieports.MeetingRoomRepository
}

func NewMeetingRoomService(MeetingRoomRepo repositorieports.MeetingRoomRepository) serviceports.MeetingRoomService {
	if MeetingRoomRepo == nil {
		logs.Error("MeetingRoomRepo is nil")
		return nil
	}
	return &MeetingRoomService{
		MeetingRoomRepo: MeetingRoomRepo,
	}
}

func (s *MeetingRoomService) CreateMeetingRoomService(req models.MeetingRoomResp) error {

	facilitiesJSON, err := json.Marshal(req.Facilities)
	if err != nil {
		return err
	}

	availableAtJSON, err := json.Marshal(req.AvailableAt)
	if err != nil {
		return err
	}

	if err := s.MeetingRoomRepo.CreateMeetingRoom(&domains.MeetingRoom{
		MeetingRoomImage: req.MeetingRoomImage,
		MeetingRoomName:  req.MeetingRoomName,
		Capacity:         req.Capacity,
		Description:      req.Description,
		Facilities:       facilitiesJSON,
		AvailableAt:      availableAtJSON,
	}); err != nil {
		logs.Error(fmt.Sprintf("CreateMeetingRoom error: %v", err))
		return err
	}
	return nil
}

func (s *MeetingRoomService) GetAllMeetingRoomService() ([]models.MeetingRoomReq, error) {
	domainMeetingRoomss, err := s.MeetingRoomRepo.GetAllMeetingRoom()
	if err != nil {
		logs.Error(err)
		return nil, errors.New("ไม่สามารถดึงข้อมูล meeting rooms ได้")
	}

	var MeetingRoomRequests []models.MeetingRoomReq
	for _, domainMeetingRoom := range domainMeetingRoomss {
		var facilities []string
		if err := json.Unmarshal(domainMeetingRoom.Facilities, &facilities); err != nil {
			logs.Error(fmt.Sprintf("Failed to unmarshal facilities: %v", err))
			facilities = []string{}
		}

		var availableAt []string
		if err := json.Unmarshal(domainMeetingRoom.AvailableAt, &availableAt); err != nil {
			logs.Error(fmt.Sprintf("Failed to unmarshal available_at: %v", err))
			availableAt = []string{}
		}

		filePath := domainMeetingRoom.MeetingRoomImage
		fileURL := fmt.Sprintf("https://%s/%s/%s",
			viper.GetString("minio.endpoint"),
			viper.GetString("minio.bucket_name"),
			filePath,
		)

		MeetingRoomRequest := models.MeetingRoomReq{
			MeetingRoomID:    domainMeetingRoom.MeetingRoomID,
			MeetingRoomImage: fileURL,
			MeetingRoomName:  domainMeetingRoom.MeetingRoomName,
			Capacity:         domainMeetingRoom.Capacity,
			Description:      domainMeetingRoom.Description,
			Facilities:       facilities,
			AvailableAt:      availableAt,
		}
		MeetingRoomRequests = append(MeetingRoomRequests, MeetingRoomRequest)
	}

	return MeetingRoomRequests, nil
}

func (s *MeetingRoomService) GetMeetingRoomByIDService(meetingRoomID string) (models.MeetingRoomReq, error) {
	user, err := s.MeetingRoomRepo.GetMeetingRoomByID(meetingRoomID)
	if err != nil {
		return models.MeetingRoomReq{}, err
	}

	var facilities []string
	if err := json.Unmarshal(user.Facilities, &facilities); err != nil {
		logs.Error(fmt.Sprintf("Failed to unmarshal facilities: %v", err))
		facilities = []string{}
	}

	var availableAt []string
	if err := json.Unmarshal(user.AvailableAt, &availableAt); err != nil {
		logs.Error(fmt.Sprintf("Failed to unmarshal available_at: %v", err))
		availableAt = []string{}
	}

	userReq := models.MeetingRoomReq{
		MeetingRoomID:    user.MeetingRoomID,
		MeetingRoomImage: user.MeetingRoomImage,
		MeetingRoomName:  user.MeetingRoomName,
		Capacity:         user.Capacity,
		Description:      user.Description,
		Facilities:       facilities,
		AvailableAt:      availableAt,
	}

	return userReq, nil
}

func (s *MeetingRoomService) UpdateMeetingRoomWithMapService(meetingRoomID string, updates map[string]interface{}) error {
	if err := s.MeetingRoomRepo.UpdateMeetingRoomWithMap(meetingRoomID, updates); err != nil {
		logs.Error(fmt.Sprintf("UpdateMeetingRoomWithMap error: %v", err))
		return err
	}
	return nil
}

func (s *MeetingRoomService) CreateBookingService(booking models.BookingResp) error {
	if err := s.MeetingRoomRepo.CreateBooking(&domains.Booking{
		BookingID:     uuid.New().String(),
		MeetingRoomID: booking.MeetingRoomID,
		UserID:        booking.UserID,
		StartTime:     booking.StartTime,
		EndTime:       booking.EndTime,
		Status:        booking.Status,
		TimeBooking:   booking.TimeBooking,
	}); err != nil {
		logs.Error(fmt.Sprintf("CreateBooking error: %v", err))
		return err
	}
	return nil
}

func (s *MeetingRoomService) GetBookingByMeetingRoomIDAndUserIDAndStatusService(meetingRoomID string, userID string, status string) ([]models.BookingReq, error) {
	bookings, err := s.MeetingRoomRepo.GetBookingByMeetingRoomIDAndUserIDAndStatus(meetingRoomID, userID, status)
	var BookingRequests []models.BookingReq
	for _, booking := range bookings {
		BookingRequest := models.BookingReq{
			BookingID:     booking.BookingID,
			MeetingRoomID: booking.MeetingRoomID,
			UserID:        booking.UserID,
			StartTime:     booking.StartTime,
			EndTime:       booking.EndTime,
			Status:        booking.Status,
		}
		BookingRequests = append(BookingRequests, BookingRequest)
	}
	if err != nil {
		return nil, err
	}
	return BookingRequests, nil
}

func (s *MeetingRoomService) GetAllBookingService() ([]models.BookingReq, error) {
	bookings, err := s.MeetingRoomRepo.GetAllBooking()
	var BookingRequests []models.BookingReq
	for _, booking := range bookings {
		BookingRequest := models.BookingReq{
			BookingID:     booking.BookingID,
			MeetingRoomID: booking.MeetingRoomID,
			UserID:        booking.UserID,
			StartTime:     booking.StartTime,
			EndTime:       booking.EndTime,
			Status:        booking.Status,
			User: models.UserReq{
				Firstname: booking.User.Firstname,
				Lastname:  booking.User.Lastname,
				Email:     booking.User.Email,
				Username:  booking.User.Username,
				Status:    booking.User.Status,
			},
		}
		BookingRequests = append(BookingRequests, BookingRequest)
	}
	if err != nil {
		return nil, err
	}
	return BookingRequests, nil
}

func (s *MeetingRoomService) IsRoomBookedService(roomID string, startTime, endTime time.Time) (bool, error) {
	isBooked, err := s.MeetingRoomRepo.IsRoomBooked(roomID, startTime, endTime)
	if err != nil {
		return false, err
	}
	if isBooked {
		return true, nil
	}

	return false, nil
}

func (s *MeetingRoomService) GetBookingsNext7DaysWithUserRoomService(roomID string) ([]models.BookingWithUserRoomResp, error) {
	bookings, err := s.MeetingRoomRepo.GetBookingsNext7Days(roomID)
	if err != nil {
		return nil, err
	}

	result := make([]models.BookingWithUserRoomResp, 0, len(bookings))
	for _, b := range bookings {
		var facilities []string
		if err := json.Unmarshal(b.MeetingRoom.Facilities, &facilities); err != nil {
			facilities = []string{}
		}

		var availableAt []string
		if err := json.Unmarshal(b.MeetingRoom.AvailableAt, &availableAt); err != nil {
			availableAt = []string{}
		}
		resp := models.BookingWithUserRoomResp{
			BookingID: b.BookingID,
			Status:    b.Status,
			StartTime: b.StartTime,
			EndTime:   b.EndTime,
			User: models.UserResp{
				UserID:    b.User.UserID,
				Firstname: b.User.Firstname,
				Lastname:  b.User.Lastname,
				Email:     b.User.Email,
			},
			MeetingRoom: models.MeetingRoomResp{
				MeetingRoomID:    b.MeetingRoom.MeetingRoomID,
				MeetingRoomName:  b.MeetingRoom.MeetingRoomName,
				MeetingRoomImage: b.MeetingRoom.MeetingRoomImage,
				Capacity:         b.MeetingRoom.Capacity,
				Description:      b.MeetingRoom.Description,
				Facilities:       facilities,
				AvailableAt:      availableAt,
			},
		}
		result = append(result, resp)
	}

	return result, nil
}

func (s *MeetingRoomService) GetBookingsByTimeBookingService(roomID string, timeBooking string) ([]models.BookingWithUserRoomResp, error) {
	bookings, err := s.MeetingRoomRepo.GetBookingsByTimeBooking(roomID, timeBooking)
	if err != nil {
		return nil, err
	}

	result := make([]models.BookingWithUserRoomResp, 0, len(bookings))
	for _, b := range bookings {
		var facilities []string
		if err := json.Unmarshal(b.MeetingRoom.Facilities, &facilities); err != nil {
			facilities = []string{}
		}

		var availableAt []string
		if err := json.Unmarshal(b.MeetingRoom.AvailableAt, &availableAt); err != nil {
			availableAt = []string{}
		}
		resp := models.BookingWithUserRoomResp{
			BookingID: b.BookingID,
			Status:    b.Status,
			StartTime: b.StartTime,
			EndTime:   b.EndTime,
			User: models.UserResp{
				UserID:    b.User.UserID,
				Firstname: b.User.Firstname,
				Lastname:  b.User.Lastname,
				Email:     b.User.Email,
			},
			MeetingRoom: models.MeetingRoomResp{
				MeetingRoomID:    b.MeetingRoom.MeetingRoomID,
				MeetingRoomName:  b.MeetingRoom.MeetingRoomName,
				MeetingRoomImage: b.MeetingRoom.MeetingRoomImage,
				Capacity:         b.MeetingRoom.Capacity,
				Description:      b.MeetingRoom.Description,
				Facilities:       facilities,
				AvailableAt:      availableAt,
			},
		}
		result = append(result, resp)
	}

	return result, nil
}

func (s *MeetingRoomService) GetAllMeetingRoomWithDateService(date string) ([]models.MeetingRoomReq, error) {
	domainMeetingRoomss, err := s.MeetingRoomRepo.GetAllMeetingRoom()
	if err != nil {
		logs.Error(err)
		return nil, errors.New("ไม่สามารถดึงข้อมูล meeting rooms ได้")
	}

	var MeetingRoomRequests []models.MeetingRoomReq
	for _, domainMeetingRoom := range domainMeetingRoomss {
		var facilities []string
		if err := json.Unmarshal(domainMeetingRoom.Facilities, &facilities); err != nil {
			logs.Error(err)
			facilities = []string{}
		}

		var availableAt []string
		if err := json.Unmarshal(domainMeetingRoom.AvailableAt, &availableAt); err != nil {
			logs.Error(err)
			availableAt = []string{}
		}

		bookings, _ := s.MeetingRoomRepo.GetBookingsByTimeBooking(domainMeetingRoom.MeetingRoomID, date)

		adjustedAvailable := adjustAvailability(availableAt, bookings)

		filePath := domainMeetingRoom.MeetingRoomImage
		fileURL := fmt.Sprintf("https://%s/%s/%s",
			viper.GetString("minio.endpoint"),
			viper.GetString("minio.bucket_name"),
			filePath,
		)

		MeetingRoomRequest := models.MeetingRoomReq{
			MeetingRoomID:    domainMeetingRoom.MeetingRoomID,
			MeetingRoomImage: fileURL,
			MeetingRoomName:  domainMeetingRoom.MeetingRoomName,
			Capacity:         domainMeetingRoom.Capacity,
			Description:      domainMeetingRoom.Description,
			Facilities:       facilities,
			AvailableAt:      adjustedAvailable,
		}
		MeetingRoomRequests = append(MeetingRoomRequests, MeetingRoomRequest)
	}

	return MeetingRoomRequests, nil
}

func adjustAvailability(availableAt []string, bookings []domains.Booking) []string {
	blocked := map[string]bool{}

	for _, b := range bookings {
		start := b.StartTime.Format("15:04") // HH:MM
		end := b.EndTime.Format("15:04")

		for _, slot := range availableAt {
			if slot >= start && slot < end {
				blocked[slot] = true
			}
		}
	}

	adjusted := make([]string, 0, len(availableAt))
	for _, slot := range availableAt {
		if !blocked[slot] {
			adjusted = append(adjusted, slot)
		}
	}

	return adjusted
}

func (s *MeetingRoomService) GetBookingsByMonthService(roomID string) ([]models.BookingWithUserRoomResp, error) {
	bookings, err := s.MeetingRoomRepo.GetBookingsByMonth(roomID)
	if err != nil {
		return nil, err
	}

	result := make([]models.BookingWithUserRoomResp, 0, len(bookings))
	for _, b := range bookings {
		var facilities []string
		if err := json.Unmarshal(b.MeetingRoom.Facilities, &facilities); err != nil {
			facilities = []string{}
		}

		var availableAt []string
		if err := json.Unmarshal(b.MeetingRoom.AvailableAt, &availableAt); err != nil {
			availableAt = []string{}
		}
		resp := models.BookingWithUserRoomResp{
			BookingID: b.BookingID,
			Status:    b.Status,
			StartTime: b.StartTime,
			EndTime:   b.EndTime,
			User: models.UserResp{
				UserID:    b.User.UserID,
				Firstname: b.User.Firstname,
				Lastname:  b.User.Lastname,
				Email:     b.User.Email,
			},
			MeetingRoom: models.MeetingRoomResp{
				MeetingRoomID:    b.MeetingRoom.MeetingRoomID,
				MeetingRoomName:  b.MeetingRoom.MeetingRoomName,
				MeetingRoomImage: b.MeetingRoom.MeetingRoomImage,
				Capacity:         b.MeetingRoom.Capacity,
				Description:      b.MeetingRoom.Description,
				Facilities:       facilities,
				AvailableAt:      availableAt,
			},
		}
		result = append(result, resp)
	}

	return result, nil
}

func (s *MeetingRoomService) GetAllBookingStatusCountService() ([]models.BookingStatusCountReq, error) {
	bookings, err := s.MeetingRoomRepo.GetAllBookingStatusCount()
	if err != nil {
		return nil, err
	}

	var result []models.BookingStatusCountReq
	for _, b := range bookings {
		result = append(result, models.BookingStatusCountReq{
			Status: b.Status,
			Count:  b.Count,
		})
	}

	return result, nil
}

func (s *MeetingRoomService) GetMeetingRoomCountService() (int64, error) {
	count, err := s.MeetingRoomRepo.GetMeetingRoomCount()
	if err != nil {
		return 0, err
	}
	return count, nil
}
