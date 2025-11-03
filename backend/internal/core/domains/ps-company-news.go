package domains

import "time"

type CompanyNews struct {
	CompanyNewsID    string    `gorm:"type:uuid;primaryKey;default:gen_random_uuid()"  json:"company_news_id"`
	CompanyNewsPhoto string    `json:"company_news_photo"`
	Title            string    `json:"title"`
	Content          string    `json:"content"`
	Category         string    `json:"category"`
	UsernameCreator  string    `json:"username_creator"`
	CreatedAt        time.Time `json:"created_at"`
	UpdatedAt        time.Time `json:"updated_at"`
}
