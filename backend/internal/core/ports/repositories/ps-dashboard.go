package ports

type DashboardRepository interface {
	GetJobApplicationCount() (int64, error)
	GetJobRecruitmentCount() (int64, error)
	GetUserCount() (int64, error)
	GetQuestionnaireCount() (int64, error)
}
