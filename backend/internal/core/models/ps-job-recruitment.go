package models

type JobRecruitmentReq struct {
	JobRecruitmentID string   `json:"job_recruitment_id"`
	Title            string   `json:"title"`
	Department       string   `json:"department"`
	Location         string   `json:"location"`
	Type             string   `json:"type"`
	Salary           string   `json:"salary"`
	Hot              bool     `json:"hot"`
	Description      string   `json:"description"`
	Requirements     []string `json:"requirements"`
	UsernameCreator  string   `json:"username_creator"`
	CreatedAt        string   `json:"created_at"`
	UpdatedAt        string   `json:"updated_at"`
	DeletedAt        string   `json:"deleted_at"`
}

type JobRecruitmentResp struct {
	JobRecruitmentID string   `json:"job_recruitment_id"`
	Title            string   `json:"title"`
	Department       string   `json:"department"`
	Location         string   `json:"location"`
	Type             string   `json:"type"`
	Salary           string   `json:"salary"`
	Hot              bool     `json:"hot"`
	Description      string   `json:"description"`
	Requirements     []string `json:"requirements"`
	UsernameCreator  string   `json:"username_creator"`
	CreatedAt        string   `json:"created_at"`
	UpdatedAt        string   `json:"updated_at"`
	DeletedAt        string   `json:"deleted_at"`
}
