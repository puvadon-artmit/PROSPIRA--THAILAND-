package models

import (
	"time"
)

type MeetingRoomResp struct {
	MeetingRoomID    string   `json:"meeting_room_id"`
	MeetingRoomImage string   `json:"meeting_room_image"`
	MeetingRoomName  string   `json:"meeting_room_name"`
	Capacity         int      `json:"capacity"`
	Description      string   `json:"description"`
	Facilities       []string `json:"facilities"`
	AvailableAt      []string `json:"available_at"`
}

type MeetingRoomReq struct {
	MeetingRoomID    string   `json:"meeting_room_id"`
	MeetingRoomImage string   `json:"meeting_room_image"`
	MeetingRoomName  string   `json:"meeting_room_name"`
	Capacity         int      `json:"capacity"`
	Description      string   `json:"description"`
	Facilities       []string `json:"facilities"`
	AvailableAt      []string `json:"available_at"`
}

type BookingResp struct {
	BookingID     string    `json:"booking_id"`
	MeetingRoomID string    `json:"meeting_room_id"`
	UserID        string    `json:"user_id"`
	Status        string    `json:"status"`
	StartTime     time.Time `json:"start_time"`
	EndTime       time.Time `json:"end_time"`
	TimeBooking   string    `json:"time_booking"`
}

type BookingReq struct {
	BookingID     string    `json:"booking_id"`
	MeetingRoomID string    `json:"meeting_room_id"`
	UserID        string    `json:"user_id"`
	Status        string    `json:"status"`
	StartTime     time.Time `json:"start_time"`
	EndTime       time.Time `json:"end_time"`
	User          UserReq   `json:"user"`
}

type BookingWithUserRoomResp struct {
	BookingID   string          `json:"booking_id"`
	Status      string          `json:"status"`
	StartTime   time.Time       `json:"start_time"`
	EndTime     time.Time       `json:"end_time"`
	User        UserResp        `json:"user"`
	MeetingRoom MeetingRoomResp `json:"meeting_room"`
}

type BookingStatusCountReq struct {
	Status string `json:"status"`
	Count  int64  `json:"count"`
}
