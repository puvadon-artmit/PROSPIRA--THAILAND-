package ports

type DashboardService interface {
	GetDashboardSummary() (map[string]int64, error)
}
