package models

type CompanyNewsReq struct {
	CompanyNewsID    string `json:"company_news_id"`
	CompanyNewsPhoto string `json:"company_news_photo"`
	Title            string `json:"title"`
	Content          string `json:"content"`
	Category         string `json:"category"`
	UsernameCreator  string `json:"username_creator"`
	CreatedAt        string `json:"created_at"`
	UpdatedAt        string `json:"updated_at"`
}

type CompanyNewsResp struct {
	CompanyNewsID    string `json:"company_news_id"`
	CompanyNewsPhoto string `json:"company_news_photo"`
	Title            string `json:"title"`
	Content          string `json:"content"`
	Category         string `json:"category"`
	UsernameCreator  string `json:"username_creator"`
	CreatedAt        string `json:"created_at"`
	UpdatedAt        string `json:"updated_at"`
}
