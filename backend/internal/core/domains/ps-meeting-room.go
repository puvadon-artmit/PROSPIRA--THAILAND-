package domains

import (
	"time"

	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type MeetingRoom struct {
	MeetingRoomID    string         `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"meeting_room_id"`
	MeetingRoomImage string         `json:"meeting_room_image"` // รูปภาพ
	MeetingRoomName  string         `json:"meeting_room_name"`  // ชื่อห้องประชุม
	Capacity         int            `json:"capacity"`           // จำนวนคนที่รองรับ
	Description      string         `json:"description"`        // รายละเอียด เช่น "Modern creative space..."
	Facilities       datatypes.JSON `gorm:"type:jsonb" json:"facilities"`
	AvailableAt      datatypes.JSON `gorm:"type:jsonb" json:"available_at"`
	CreatedAt        time.Time      `json:"created_at"`
	UpdatedAt        time.Time      `json:"updated_at"`
	DeletedAt        gorm.DeletedAt `gorm:"index" json:"deleted_at"`
}

type Booking struct {
	BookingID string `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"booking_id"`

	MeetingRoomID string      `gorm:"type:uuid;not null;index" json:"meeting_room_id"`
	MeetingRoom   MeetingRoom `gorm:"foreignKey:MeetingRoomID;references:MeetingRoomID" json:"meeting_room"`

	UserID string `gorm:"type:uuid;index" json:"user_id"`
	User   User   `gorm:"foreignKey:UserID;references:UserID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;" json:"user"`

	TimeBooking string         `json:"time_booking"`
	Status      string         `gorm:"type:varchar(20);default:'pending'" json:"status"`
	StartTime   time.Time      `json:"start_time"` // เวลาเริ่ม
	EndTime     time.Time      `json:"end_time"`   // เวลาสิ้นสุด
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"deleted_at"`
}

type BookingStatusCount struct {
	Status string `json:"status"`
	Count  int64  `json:"count"`
}
