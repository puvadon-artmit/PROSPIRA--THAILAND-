package ports

import "backend/internal/core/domains"

type UserRepository interface {
	CreateUserRepository(User *domains.User) error
	FindByUsername(username string) (*domains.User, error)
	GetUserByID(userID string) (domains.User, error)
	GetAllUser() ([]domains.User, error)
	UpdateUserWithMap(userID string, updates map[string]interface{}) error
	GetUserCount() (int64, error)
}
