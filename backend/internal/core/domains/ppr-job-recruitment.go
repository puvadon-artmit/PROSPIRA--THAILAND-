package domains

import (
	"time"

	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type JobRecruitment struct {
	JobRecruitmentID string         `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"job_recruitment_id"`
	Title            string         `json:"title"`
	Department       string         `json:"department"`
	Location         string         `json:"location"`
	Type             string         `json:"type"`
	Salary           string         `json:"salary"`
	Hot              bool           `json:"hot"`
	Description      string         `json:"description"`
	Requirements     datatypes.JSON `gorm:"type:jsonb" json:"requirements"`
	UsernameCreator  string         `json:"username_creator"`
	CreatedAt        time.Time      `json:"created_at"`
	UpdatedAt        time.Time      `json:"updated_at"`
	DeletedAt        gorm.DeletedAt `json:"deleted_at"`
}
