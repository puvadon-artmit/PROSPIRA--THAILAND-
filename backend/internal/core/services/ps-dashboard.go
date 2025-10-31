package services

import (
	ports "backend/internal/core/ports/repositories"
	servicesports "backend/internal/core/ports/services"
)

type DashboardService struct {
	dashboardRepository ports.DashboardRepository
}

func NewDashboardService(dashboardRepository ports.DashboardRepository) servicesports.DashboardService {
	return &DashboardService{
		dashboardRepository: dashboardRepository,
	}
}

func (s *DashboardService) GetDashboardSummary() (map[string]int64, error) {
	jobAppCount, err := s.dashboardRepository.GetJobApplicationCount()
	if err != nil {
		return nil, err
	}

	jobRecruitCount, err := s.dashboardRepository.GetJobRecruitmentCount()
	if err != nil {
		return nil, err
	}

	userCount, err := s.dashboardRepository.GetUserCount()
	if err != nil {
		return nil, err
	}

	questionnaireCount, err := s.dashboardRepository.GetQuestionnaireCount()
	if err != nil {
		return nil, err
	}

	summary := map[string]int64{
		"job_applications": jobAppCount,
		"job_recruitments": jobRecruitCount,
		"users":            userCount,
		"questionnaires":   questionnaireCount,
	}

	return summary, nil
}
