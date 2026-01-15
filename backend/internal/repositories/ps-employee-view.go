package repositories

import (
	"backend/internal/core/domains"
	"fmt"

	"gorm.io/gorm"
)

func (r *UserRepositoryDB) GetEmployeeByFullNameEn(fullNameEn string) (*domains.EmployeeView, error) {
	var emp domains.EmployeeView
	if err := r.db.
		Where("UHR_FullNameEn = ?", fullNameEn).
		First(&emp).Error; err != nil {
		return nil, err
	}
	return &emp, nil
}

func (r *UserRepositoryDB) GetEmployeeByEmpCode(empCode string) (*domains.EmployeeView, error) {
	var emp domains.EmployeeView
	if err := r.db.
		Where("UHR_EmpCode = ?", empCode).
		First(&emp).Error; err != nil {
		return nil, err
	}
	return &emp, nil
}

func (r *UserRepositoryDB) FindEmployeeByAccount(account string) (*domains.EmployeeView, error) {
	fmt.Println("account : ", account)
	var user domains.EmployeeView

	if err := r.db.Debug().Where("AD_UserLogon = ?", account).First(&user).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, err
	}
	return &user, nil
}
