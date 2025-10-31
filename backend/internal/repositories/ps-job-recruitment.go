package repositories

import (
	"backend/internal/core/domains"
	ports "backend/internal/core/ports/repositories"
	"fmt"

	"gorm.io/gorm"
)

type JobRecruitmentRepositoryDB struct {
	db *gorm.DB
}

func NewJobRecruitmentRepositoryDB(db *gorm.DB) ports.JobRecruitmentRepository {
	// if err := db.AutoMigrate(&domains.JobRecruitment{}); err != nil {
	// 	fmt.Printf("failed to auto migrate: %v", err)
	// }
	return &JobRecruitmentRepositoryDB{db: db}
}

func (r *JobRecruitmentRepositoryDB) CreateJobRecruitmentRepository(User *domains.JobRecruitment) error {
	if err := r.db.Create(User).Error; err != nil {
		fmt.Printf("CreateUserRepository error: %v\n", err)
		return err
	}
	return nil
}

func (r *JobRecruitmentRepositoryDB) GetJobRecruitmentByID(jobRecruitmentID string) (domains.JobRecruitment, error) {
	var user domains.JobRecruitment
	if err := r.db.Where("job_recruitment_id = ?", jobRecruitmentID).First(&user).Error; err != nil {
		return domains.JobRecruitment{}, err
	}
	return user, nil
}

func (r *JobRecruitmentRepositoryDB) GetAllJobRecruitment() ([]domains.JobRecruitment, error) {
	var reviews []domains.JobRecruitment
	return reviews, r.db.Find(&reviews).Error
}

func (r *JobRecruitmentRepositoryDB) GetJobRecruitments(limit, offset int) ([]domains.JobRecruitment, error) {
	var jobs []domains.JobRecruitment

	query := r.db.
		Limit(limit).
		Offset(offset).
		Order("created_at DESC")

	if err := query.Find(&jobs).Error; err != nil {
		return nil, err
	}
	return jobs, nil
}

func (r *JobRecruitmentRepositoryDB) UpdateJobRecruitmentWithMap(jobRecruitmentID string, updates map[string]interface{}) error {
	return r.db.Model(&domains.JobRecruitment{}).
		Where("job_recruitment_id = ?", jobRecruitmentID).
		Updates(updates).
		Error
}

func (r *JobRecruitmentRepositoryDB) GetJobRecruitmentCount() (int64, error) {
	var count int64
	return count, r.db.Model(&domains.JobRecruitment{}).Count(&count).Error
}
