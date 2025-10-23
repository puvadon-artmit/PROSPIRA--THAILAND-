package ports

import "backend/internal/core/models"

type UserService interface {
	CreateUserService(req models.UserResp) error
	SignIncookie(dto models.LoginCookieResp) (string, error)
	GetProfileByCookieId(userID string) (models.UserReq, error)
	GetAllUserSevice() ([]models.UserReqAll, error)
	UpdateUserWithMapService(userID string, updates map[string]interface{}) error
	GetUserByID(userID string) (models.UserAdminReq, error)
	GetUserCountService() (int64, error)
}
