package models

type JobApplicationReq struct {
	JobApplicationID string `json:"job_application_id"`
	FullName         string `json:"full_name"`
	Email            string `json:"email"`
	Phone            string `json:"phone"`
	Resume           string `json:"resume"`
	Note             string `json:"note"`
	Status           string `json:"status"`
	UsernameCreator  string `json:"username_creator"`
	Position         string `json:"position"`
	CreatedAt        string `json:"created_at"`
	UpdatedAt        string `json:"updated_at"`
	DeletedAt        string `json:"deleted_at"`
}

type JobApplicationResp struct {
	JobApplicationID string `json:"job_application_id"`
	FullName         string `json:"full_name"`
	Email            string `json:"email"`
	Phone            string `json:"phone"`
	Resume           string `json:"resume"`
	Note             string `json:"note"`
	Status           string `json:"status"`
	Position         string `json:"position"`
	CreatedAt        string `json:"created_at"`
	UpdatedAt        string `json:"updated_at"`
	DeletedAt        string `json:"deleted_at"`
}
