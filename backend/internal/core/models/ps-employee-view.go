package models

type EmployeeViewResp struct {
	UHR_EmpCode      string `json:"UHR_EmpCode"`
	UHR_FirstName_en string `json:"UHR_FirstName_en"`
	UHR_LastName_en  string `json:"UHR_LastName_en"`
	UHR_Department   string `json:"UHR_Department"`
	AD_UserLogon     string `json:"AD_UserLogon"`
	AD_Mail          string `json:"AD_Mail"`
	AD_AccountStatus string `json:"AD_AccountStatus"`
}

type EmployeeViewByEmpCodeResp struct {
	UHR_EmpCode      string `json:"user_id"`
	UHR_FirstName_en string `json:"firstname"`
	UHR_LastName_en  string `json:"lastname"`
	UHR_Department   string `json:"role_name"`
	AD_UserLogon     string `json:"username"`
	AD_Mail          string `json:"email"`
	AD_AccountStatus string `json:"status"`
}
