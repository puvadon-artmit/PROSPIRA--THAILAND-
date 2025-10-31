package repositories

import (
	"backend/internal/core/domains"
	ports "backend/internal/core/ports/repositories"
	"fmt"

	"gorm.io/gorm"
)

type JobApplicationRepositoryDB struct {
	db *gorm.DB
}

func NewJobApplicationRepositoryDB(db *gorm.DB) ports.JobApplicationRepository {
	// if err := db.AutoMigrate(&domains.JobApplication{}); err != nil {
	// 	fmt.Printf("failed to auto migrate: %v", err)
	// }
	return &JobApplicationRepositoryDB{db: db}
}

func (r *JobApplicationRepositoryDB) CreateJobApplicationRepository(User *domains.JobApplication) error {
	if err := r.db.Create(User).Error; err != nil {
		fmt.Printf("CreateUserRepository error: %v\n", err)
		return err
	}
	return nil
}

func (r *JobApplicationRepositoryDB) GetJobApplicationByID(jobApplicationID string) (domains.JobApplication, error) {
	var user domains.JobApplication
	if err := r.db.Where("job_application_id = ?", jobApplicationID).First(&user).Error; err != nil {
		return domains.JobApplication{}, err
	}
	return user, nil
}

func (r *JobApplicationRepositoryDB) GetAllJobApplication() ([]domains.JobApplication, error) {
	var reviews []domains.JobApplication
	return reviews, r.db.Find(&reviews).Error
}

func (r *JobApplicationRepositoryDB) GetJobApplications(limit, offset int) ([]domains.JobApplication, error) {
	var jobs []domains.JobApplication

	query := r.db.
		Limit(limit).
		Offset(offset).
		Order("created_at DESC")

	if err := query.Find(&jobs).Error; err != nil {
		return nil, err
	}
	return jobs, nil
}

func (r *JobApplicationRepositoryDB) UpdateJobApplicationWithMap(jobApplicationID string, updates map[string]interface{}) error {
	return r.db.Model(&domains.JobApplication{}).
		Where("job_application_id = ?", jobApplicationID).
		Updates(updates).
		Error
}

func (r *JobApplicationRepositoryDB) GetJobApplicationCount() (int64, error) {
	var count int64
	return count, r.db.Model(&domains.JobApplication{}).Count(&count).Error
}
