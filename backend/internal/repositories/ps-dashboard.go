package repositories

import (
	"gorm.io/gorm"

	"backend/internal/core/domains"
	ports "backend/internal/core/ports/repositories"
)

func NewDashboardRepositoryDB(db *gorm.DB) ports.DashboardRepository {
	return &DashboardRepositoryDB{db: db}
}

type DashboardRepositoryDB struct {
	db *gorm.DB
}

func (r *DashboardRepositoryDB) GetJobApplicationCount() (int64, error) {
	var count int64
	return count, r.db.Model(&domains.JobApplication{}).Count(&count).Error
}

func (r *DashboardRepositoryDB) GetJobRecruitmentCount() (int64, error) {
	var count int64
	return count, r.db.Model(&domains.JobRecruitment{}).Count(&count).Error
}

func (r *DashboardRepositoryDB) GetUserCount() (int64, error) {
	var count int64
	return count, r.db.Model(&domains.User{}).Count(&count).Error
}

func (r *DashboardRepositoryDB) GetQuestionnaireCount() (int64, error) {
	var count int64
	return count, r.db.Model(&domains.Questionnaire{}).Count(&count).Error
}
