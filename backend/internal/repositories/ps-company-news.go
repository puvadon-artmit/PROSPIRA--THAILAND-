package repositories

import (
	"backend/internal/core/domains"
	ports "backend/internal/core/ports/repositories"
	"fmt"
	"strings"
	"time"

	"gorm.io/gorm"
)

type CompanyNewsRepositoryDB struct {
	db *gorm.DB
}

func NewCompanyNewsRepositoryDB(db *gorm.DB) ports.CompanyNewsRepository {
	if err := db.AutoMigrate(&domains.CompanyNews{}); err != nil {
		fmt.Printf("failed to auto migrate: %v", err)
	}
	return &CompanyNewsRepositoryDB{db: db}
}

func (r *CompanyNewsRepositoryDB) CreateCompanyNews(n *domains.CompanyNews) error {
	now := time.Now()
	if n.CreatedAt.IsZero() {
		n.CreatedAt = now
	}
	if n.UpdatedAt.IsZero() {
		n.UpdatedAt = now
	}

	const q = `
		INSERT INTO company_news
			(company_news_photo, title, content, category, username_creator, created_at, updated_at)
		VALUES
			($1, $2, $3, $4, $5, $6, $7)
		RETURNING company_news_id, created_at, updated_at;
	`

	type ret struct {
		CompanyNewsID string
		CreatedAt     time.Time
		UpdatedAt     time.Time
	}

	var out ret
	if err := r.db.
		Raw(q,
			n.CompanyNewsPhoto,
			n.Title,
			n.Content,
			n.Category,
			n.UsernameCreator,
			n.CreatedAt,
			n.UpdatedAt,
		).
		Scan(&out).Error; err != nil {
		fmt.Printf("CreateCompanyNews error: %v\n", err)
		return err
	}

	n.CompanyNewsID = out.CompanyNewsID
	n.CreatedAt = out.CreatedAt
	n.UpdatedAt = out.UpdatedAt
	return nil
}

func (r *CompanyNewsRepositoryDB) GetCompanyNewsByID(companyNewsID string) (domains.CompanyNews, error) {
	const q = `
		SELECT company_news_id, company_news_photo, title, content, category,
		       username_creator, created_at, updated_at
		FROM company_news
		WHERE company_news_id = $1
		LIMIT 1;
	`

	var row domains.CompanyNews
	if err := r.db.Raw(q, companyNewsID).Scan(&row).Error; err != nil {
		return domains.CompanyNews{}, err
	}
	return row, nil
}

func (r *CompanyNewsRepositoryDB) GetAllCompanyNews() ([]domains.CompanyNews, error) {
	const q = `
		SELECT company_news_id, company_news_photo, title, content, category,
		       username_creator, created_at, updated_at
		FROM company_news
		ORDER BY created_at DESC;
	`

	var list []domains.CompanyNews
	if err := r.db.Raw(q).Scan(&list).Error; err != nil {
		return nil, err
	}
	return list, nil
}

func (r *CompanyNewsRepositoryDB) GetCompanyNews(limit, offset int) ([]domains.CompanyNews, int64, error) {
	var total int64
	const countQ = `SELECT COUNT(*) FROM company_news;`
	if err := r.db.Raw(countQ).Scan(&total).Error; err != nil {
		return nil, 0, err
	}
	const q = `
        SELECT company_news_id, company_news_photo, title, content, category,
               username_creator, created_at, updated_at
        FROM company_news
        ORDER BY created_at DESC
        LIMIT $1 OFFSET $2;
    `
	var list []domains.CompanyNews
	if err := r.db.Raw(q, limit, offset).Scan(&list).Error; err != nil {
		return nil, 0, err
	}

	return list, total, nil
}

func (r *CompanyNewsRepositoryDB) UpdateCompanyNewsWithMap(companyNewsID string, updates map[string]interface{}) error {
	if len(updates) == 0 {
		return nil
	}

	allowed := map[string]bool{
		"company_news_photo": true,
		"title":              true,
		"content":            true,
		"category":           true,
		"username_creator":   true,
	}

	setParts := make([]string, 0, len(updates)+1)
	args := make([]interface{}, 0, len(updates)+2)
	argIdx := 1

	for k, v := range updates {
		if !allowed[k] {
			continue
		}
		setParts = append(setParts, k+" = $"+fmt.Sprint(argIdx))
		args = append(args, v)
		argIdx++
	}

	if len(setParts) == 0 {
		return nil
	}

	setParts = append(setParts, "updated_at = NOW()")

	q := "UPDATE company_news SET " + strings.Join(setParts, ", ") + " WHERE company_news_id = $" + fmt.Sprint(argIdx) + ";"

	args = append(args, companyNewsID)

	if err := r.db.Exec(q, args...).Error; err != nil {
		return err
	}
	return nil
}

func (r *CompanyNewsRepositoryDB) GetCompanyNewsCount() (int64, error) {
	const q = `SELECT COUNT(*) AS cnt FROM company_news;`
	var cnt int64
	if err := r.db.Raw(q).Scan(&cnt).Error; err != nil {
		return 0, err
	}
	return cnt, nil
}

func (r *CompanyNewsRepositoryDB) GetCompanyNewsByTitle(title string) (domains.CompanyNews, error) {
	const q = `
		SELECT company_news_id, company_news_photo, title, content, category,
		       username_creator, created_at, updated_at
		FROM company_news
		WHERE title = $1
		LIMIT 1;
	`

	var row domains.CompanyNews
	if err := r.db.Raw(q, title).Scan(&row).Error; err != nil {
		return domains.CompanyNews{}, err
	}
	return row, nil
}
