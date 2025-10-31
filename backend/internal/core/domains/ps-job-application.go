package domains

import "time"

type JobApplication struct {
	JobApplicationID string    `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"job_application_id"`
	FullName         string    `json:"full_name"`
	Email            string    `json:"email"`
	Phone            string    `json:"phone"`
	Resume           string    `json:"resume"`
	Note             string    `json:"note"`
	Status           string    `json:"status"`
	Position         string    `json:"position"`
	CreatedAt        time.Time `json:"created_at"`
	UpdatedAt        time.Time `json:"updated_at"`
}
