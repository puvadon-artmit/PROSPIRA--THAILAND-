package repositories

import (
	"encoding/json"
	"fmt"
	"time"

	"gorm.io/datatypes"
	"gorm.io/gorm"

	"backend/internal/core/domains"
	ports "backend/internal/core/ports/repositories"
	"backend/internal/pkgs/utils"
)

type JobRecruitmentRepositoryDB struct {
	db *gorm.DB
}

func NewJobRecruitmentRepositoryDB(db *gorm.DB) ports.JobRecruitmentRepository {
	if err := db.AutoMigrate(&domains.JobRecruitment{}); err != nil {
		fmt.Printf("failed to auto migrate: %v", err)
	}
	return &JobRecruitmentRepositoryDB{db: db}
}

func (r *JobRecruitmentRepositoryDB) CreateJobRecruitmentRepository(User *domains.JobRecruitment) error {
	if err := r.db.Debug().Create(User).Error; err != nil {
		fmt.Printf("CreateUserRepository error: %v\n", err)
		return err
	}
	return nil
}

func (r *JobRecruitmentRepositoryDB) GetJobRecruitmentByID(jobRecruitmentID string) (domains.JobRecruitment, error) {
	const q = `
		SELECT CONVERT(NVARCHAR(36), job_recruitment_id) AS job_recruitment_id,
		       title, department, location, type, salary, hot, description,
		       requirements, username_creator, created_at, updated_at,
		       title_en, description_en, requirements_en
		FROM job_recruitments
		WHERE job_recruitment_id = ? AND deleted_at IS NULL;
	`

	var row domains.JobRecruitment
	if err := r.db.Raw(q, jobRecruitmentID).Scan(&row).Error; err != nil {
		return domains.JobRecruitment{}, err
	}

	return domains.JobRecruitment{
		JobRecruitmentID: row.JobRecruitmentID,
		Title:            row.Title,
		TitleEN:          row.TitleEN,
		Department:       row.Department,
		Location:         row.Location,
		Type:             row.Type,
		Salary:           row.Salary,
		Hot:              row.Hot,
		Description:      row.Description,
		DescriptionEN:    row.DescriptionEN,
		Requirements:     row.Requirements,
		RequirementsEN:   row.RequirementsEN,
		UsernameCreator:  row.UsernameCreator,
		CreatedAt:        row.CreatedAt,
		UpdatedAt:        row.UpdatedAt,
	}, nil
}

func (r *JobRecruitmentRepositoryDB) GetAllJobRecruitment() ([]domains.JobRecruitment, error) {
	const q = `
		SELECT CONVERT(NVARCHAR(36), job_recruitment_id) AS job_recruitment_id,
		       title, department, location, type, salary, hot, description,
		       requirements, username_creator, created_at, updated_at,
		       title_en, description_en, requirements_en
		FROM job_recruitments
		WHERE deleted_at IS NULL
		ORDER BY created_at DESC;
	`

	type jobRow struct {
		JobRecruitmentID string    `gorm:"column:job_recruitment_id"`
		Title            string    `gorm:"column:title"`
		TitleEN          string    `gorm:"column:title_en"`
		Department       string    `gorm:"column:department"`
		Location         string    `gorm:"column:location"`
		Type             string    `gorm:"column:type"`
		Salary           string    `gorm:"column:salary"`
		Hot              bool      `gorm:"column:hot"`
		Description      string    `gorm:"column:description"`
		DescriptionEN    string    `gorm:"column:description_en"`
		Requirements     string    `gorm:"column:requirements"`
		RequirementsEN   string    `gorm:"column:requirements_en"`
		UsernameCreator  string    `gorm:"column:username_creator"`
		CreatedAt        time.Time `gorm:"column:created_at"`
		UpdatedAt        time.Time `gorm:"column:updated_at"`
	}

	var rows []jobRow
	if err := r.db.Raw(q).Scan(&rows).Error; err != nil {
		return nil, err
	}

	jobs := make([]domains.JobRecruitment, 0, len(rows))
	for _, row := range rows {
		jobs = append(jobs, domains.JobRecruitment{
			JobRecruitmentID: row.JobRecruitmentID,
			Title:            row.Title,
			TitleEN:          row.TitleEN,
			Department:       row.Department,
			Location:         row.Location,
			Type:             row.Type,
			Salary:           row.Salary,
			Hot:              row.Hot,
			Description:      row.Description,
			DescriptionEN:    row.DescriptionEN,
			Requirements:     row.Requirements,
			RequirementsEN:   row.RequirementsEN,
			UsernameCreator:  row.UsernameCreator,
			CreatedAt:        row.CreatedAt,
			UpdatedAt:        row.UpdatedAt,
		})
	}

	return jobs, nil
}

func (r *JobRecruitmentRepositoryDB) GetJobRecruitments(limit, offset int) ([]domains.JobRecruitment, error) {
	const q = `
		SELECT CONVERT(NVARCHAR(36), job_recruitment_id) AS job_recruitment_id,
		       title, department, location, type, salary, hot, description,
		       requirements, username_creator, created_at, updated_at,
			   title_en, description_en, requirements_en
		FROM job_recruitments
		WHERE deleted_at IS NULL
		ORDER BY created_at DESC
		OFFSET ? ROWS
		FETCH NEXT ? ROWS ONLY;
	`

	type jobRow struct {
		JobRecruitmentID string    `gorm:"column:job_recruitment_id"`
		Title            string    `gorm:"column:title"`
		TitleEN          string    `gorm:"column:title_en"`
		Department       string    `gorm:"column:department"`
		Location         string    `gorm:"column:location"`
		Type             string    `gorm:"column:type"`
		Salary           string    `gorm:"column:salary"`
		Hot              bool      `gorm:"column:hot"`
		Description      string    `gorm:"column:description"`
		DescriptionEN    string    `gorm:"column:description_en"`
		Requirements     string    `gorm:"column:requirements"`
		RequirementsEN   string    `gorm:"column:requirements_en"`
		UsernameCreator  string    `gorm:"column:username_creator"`
		CreatedAt        time.Time `gorm:"column:created_at"`
		UpdatedAt        time.Time `gorm:"column:updated_at"`
	}

	var rows []jobRow
	if err := r.db.Debug().Raw(q, offset, limit).Scan(&rows).Error; err != nil {
		return nil, err
	}

	jobs := make([]domains.JobRecruitment, 0, len(rows))
	for _, row := range rows {
		jobs = append(jobs, domains.JobRecruitment{
			JobRecruitmentID: row.JobRecruitmentID,
			Title:            row.Title,
			TitleEN:          row.TitleEN,
			Department:       row.Department,
			Location:         row.Location,
			Type:             row.Type,
			Salary:           row.Salary,
			Hot:              row.Hot,
			Description:      row.Description,
			DescriptionEN:    row.DescriptionEN,
			Requirements:     row.Requirements,
			RequirementsEN:   row.RequirementsEN,
			UsernameCreator:  row.UsernameCreator,
			CreatedAt:        row.CreatedAt,
			UpdatedAt:        row.UpdatedAt,
		})
	}

	return jobs, nil
}

func (r *JobRecruitmentRepositoryDB) UpdateJobRecruitmentWithMap(jobRecruitmentID string, updates map[string]interface{}) error {
	if v, ok := updates["requirements"]; ok {
		arr, err := utils.ToStringSlice(v)
		if err != nil {
			return err
		}
		b, err := json.Marshal(arr)
		if err != nil {
			return fmt.Errorf("marshal requirements: %w", err)
		}
		updates["requirements"] = datatypes.JSON(b)
	}

	if len(updates) == 0 {
		return nil
	}

	return r.db.Model(&domains.JobRecruitment{}).
		Where("job_recruitment_id = ?", jobRecruitmentID).
		Updates(updates).
		Error
}

func (r *JobRecruitmentRepositoryDB) GetJobRecruitmentCount() (int64, error) {
	var count int64
	return count, r.db.Model(&domains.JobRecruitment{}).Count(&count).Error
}

func (r *JobRecruitmentRepositoryDB) DeleteJobRecruitment(jobRecruitmentID string) error {
	result := r.db.Where("job_recruitment_id = ?", jobRecruitmentID).Delete(&domains.JobRecruitment{})
	if result.Error != nil {
		fmt.Printf("DeleteJobRecruitment error: %v\n", result.Error)
		return result.Error
	}
	if result.RowsAffected == 0 {
		return fmt.Errorf("job recruitment with ID %s not found", jobRecruitmentID)
	}
	return nil
}
