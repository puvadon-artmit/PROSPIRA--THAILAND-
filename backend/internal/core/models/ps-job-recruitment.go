package models

type JobRecruitmentReq struct {
	JobRecruitmentID string   `json:"job_recruitment_id"`
	Title            string   `json:"title"`
	TitleEN          string   `json:"title_en"`
	Department       string   `json:"department"`
	Location         string   `json:"location"`
	Type             string   `json:"type"`
	Salary           string   `json:"salary"`
	Hot              bool     `json:"hot"`
	Description      string   `json:"description"`
	DescriptionEN    string   `json:"description_en"`
	Requirements     []string `json:"requirements"`
	RequirementsEN   []string `json:"requirements_en"`
	UsernameCreator  string   `json:"username_creator"`
	CreatedAt        string   `json:"created_at"`
	UpdatedAt        string   `json:"updated_at"`
	DeletedAt        string   `json:"deleted_at"`
}

type JobRecruitmentListResp struct {
	Total      int64               `json:"total"`
	TotalPages int                 `json:"total_pages"`
	Limit      int                 `json:"limit"`
	Offset     int                 `json:"offset"`
	Data       []JobRecruitmentReq `json:"data"`
}

type JobRecruitmentResp struct {
	JobRecruitmentID string   `json:"job_recruitment_id"`
	Title            string   `json:"title"`
	TitleEN          string   `json:"title_en"`
	Department       string   `json:"department"`
	Location         string   `json:"location"`
	Type             string   `json:"type"`
	Salary           string   `json:"salary"`
	Hot              bool     `json:"hot"`
	Description      string   `json:"description"`
	DescriptionEN    string   `json:"description_en"`
	Requirements     []string `json:"requirements"`
	UsernameCreator  string   `json:"username_creator"`
	CreatedAt        string   `json:"created_at"`
	UpdatedAt        string   `json:"updated_at"`
	DeletedAt        string   `json:"deleted_at"`
}
