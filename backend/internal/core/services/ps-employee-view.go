package services

import (
	"backend/internal/clients"
	"backend/internal/core/models"
	"errors"
	"fmt"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

func (s *userService) SignInEmployee(dto models.LoginEmpResp) (string, error) {
	user, err := clients.FindEmployeeFromMicroservice(dto.Username)
	if err != nil {
		return "", errors.New("username ไม่ถูกต้อง")
	}

	if user == nil {
		return "", errors.New("ไม่พบผู้ใช้")
	}

	if user.AD_AccountStatus == "DISABLE" {
		return "", errors.New("บัญชีนี้ถูกปิดการใช้งาน")
	}

	jwtSecretKey := []byte(os.Getenv("TOKEN_SECRET_KEY"))
	claims := jwt.MapClaims{
		"user_id":   user.UHR_EmpCode,
		"username":  user.AD_UserLogon,
		"firstname": user.UHR_FirstName_en,
		"lastname":  user.UHR_LastName_en,
		"status":    user.AD_AccountStatus,
		"iat":       time.Now().Unix(),
		"exp":       time.Now().Add(time.Hour * 24).Unix(),
	}

	jwtToken := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signedToken, err := jwtToken.SignedString(jwtSecretKey)
	if err != nil {
		return "", errors.New("เกิดข้อผิดพลาดในการเซ็นชื่อ JWT")
	}

	return signedToken, nil
}

func (s *userService) GetEmployeeByEmpCodeService(userID string) (models.EmployeeViewByEmpCodeResp, error) {
	user, err := clients.GetEmployeeByEmpCodeFromMicroservice(userID)
	if err != nil {
		return models.EmployeeViewByEmpCodeResp{}, err
	}

	fmt.Println("user data log : ", user)

	userReq := models.EmployeeViewByEmpCodeResp{
		UHR_EmpCode:      user.UHR_EmpCode,
		UHR_FirstName_en: user.UHR_FirstName_en,
		UHR_LastName_en:  user.UHR_LastName_en,
		UHR_Department:   user.UHR_Department,
		AD_UserLogon:     user.AD_UserLogon,
		AD_Mail:          user.AD_Mail,
		AD_AccountStatus: user.AD_AccountStatus,
	}

	return userReq, nil
}
