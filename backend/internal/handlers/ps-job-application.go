package handlers

import (
	"backend/internal/core/models"
	services "backend/internal/core/ports/services"
	"crypto/tls"
	"fmt"
	"html"
	"log"
	"mime"
	"os"
	"path/filepath"
	"strconv"
	"time"

	mail "gopkg.in/mail.v2"

	"github.com/gofiber/fiber/v2"
)

type JobApplicationHandler struct {
	JobApplicationSrv services.JobApplicationService
}

func NewJobApplicationHandler(insSrv services.JobApplicationService) *JobApplicationHandler {
	return &JobApplicationHandler{JobApplicationSrv: insSrv}
}

func (h *JobApplicationHandler) CreateJobApplicationHandler(c *fiber.Ctx) error {
	var req models.JobApplicationResp

	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request payload",
		})
	}

	if h.JobApplicationSrv == nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Service is not available",
		})
	}

	err := h.JobApplicationSrv.CreateJobApplicationService(req)
	if err != nil {
		log.Println("Error creating  User:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to create  User",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "User  created successfully",
	})
}

func (h *JobApplicationHandler) GetJobApplicationsHandler(c *fiber.Ctx) error {
	limit, offset := c.QueryInt("limit", 10), c.QueryInt("offset", 0)

	jobs, err := h.JobApplicationSrv.GetJobApplicationService(limit, offset)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to retrieve job applications",
		})
	}

	return c.JSON(jobs)
}

func (h *JobApplicationHandler) CreateJobApplicationFormHandler(c *fiber.Ctx) error {
	fullName := c.FormValue("full_name")
	email := c.FormValue("email")
	phone := c.FormValue("phone")
	note := c.FormValue("note")
	position := c.FormValue("position")

	file, err := c.FormFile("resume")
	var filePath string

	if err == nil && file != nil {
		saveDir := "./uploads/resumes"
		if err := os.MkdirAll(saveDir, os.ModePerm); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Cannot create upload directory",
			})
		}

		filename := fmt.Sprintf("%d_%s", time.Now().Unix(), file.Filename)
		filePath = filepath.Join(saveDir, filename)

		if err := c.SaveFile(file, filePath); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Failed to save file",
			})
		}
	} else {
		filePath = ""
	}

	req := models.JobApplicationResp{
		FullName: fullName,
		Email:    email,
		Phone:    phone,
		Position: position,
		Note:     note,
		Resume:   filePath,
		Status:   "pending",
	}

	if err := h.JobApplicationSrv.CreateJobApplicationService(req); err != nil {
		log.Println("Error creating job application:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to create job application",
		})
	}

	go func() {
		if err := h.SendEmailAfterJobCreated(req); err != nil {
			log.Println("Error sending HR email:", err)
		}
	}()

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "Job application created successfully",
		"file":    filePath,
	})
}

func attachResume(m *mail.Message, filePath string) error {
	if filePath == "" {
		return fmt.Errorf("resume path is empty")
	}

	abs, err := filepath.Abs(filePath)
	if err != nil {
		return fmt.Errorf("cannot resolve abs path: %w", err)
	}

	fi, err := os.Stat(abs)
	if err != nil {
		return fmt.Errorf("resume file not found: %w", err)
	}
	if fi.IsDir() {
		return fmt.Errorf("resume path is a directory")
	}

	const maxPDFSize = 10 * 1024 * 1024
	if fi.Size() > maxPDFSize {
		return fmt.Errorf("resume file too large (>10MB)")
	}

	base := filepath.Base(abs)
	ext := filepath.Ext(base)
	ct := mime.TypeByExtension(ext)
	if ct == "" {
		ct = "application/octet-stream"
	}
	if ext == ".pdf" {
		ct = "application/pdf"
	}

	m.Attach(abs,
		mail.Rename(base),
		mail.SetHeader(map[string][]string{
			"Content-Type": {ct},
		}),
	)

	return nil
}

func buildEmailBody(req models.JobApplicationResp) string {
	fn := html.EscapeString(req.FullName)
	em := html.EscapeString(req.Email)
	ph := html.EscapeString(req.Phone)
	ps := html.EscapeString(req.Position)
	nt := html.EscapeString(req.Note)

	resumeStatus := "—"
	if req.Resume != "" {
		resumeStatus = "Attached"
	}

	now := time.Now().Format("02 Jan 2006, 15:04")

	return fmt.Sprintf(`
		<!doctype html>
		<html>
		<head>
		<meta charset="utf-8">
		<title>New Job Application</title>
		<style>
			body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; background: #f6f7fb; margin: 0; padding: 24px; color: #1f2937; }
			.container { max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; }
			.header { background: #08a4b8; color: #ffffff; padding: 20px 24px; }
			.header h1 { margin: 0; font-size: 20px; }
			.sub { margin: 4px 0 0; opacity: 0.95; font-size: 13px; }
			.content { padding: 24px; }
			.lead { margin: 0 0 16px; }
			table { width: 100%%; border-collapse: collapse; }
			th, td { text-align: left; vertical-align: top; padding: 10px 12px; font-size: 14px; }
			th { width: 160px; color: #374151; background: #f9fafb; border-bottom: 1px solid #f1f5f9; }
			td { border-bottom: 1px solid #f1f5f9; color: #111827; }
			.footer { padding: 16px 24px; background: #f9fafb; font-size: 12px; color: #6b7280; }
			.brand { font-weight: 600; color: #111827; }
		</style>
		</head>
		<body>
		<div class="container">
			<div class="header">
			<h1>New Job Application Received</h1>
			<div class="sub">Prospira Careers • %s</div>
			</div>
			<div class="content">
			<p class="lead">Dear HR Team,</p>
			<p class="lead">A new job application has been submitted via the website. The applicant’s details are as follows:</p>

			<table role="presentation" aria-hidden="true">
				<tr><th>Full Name</th><td>%s</td></tr>
				<tr><th>Email</th><td>%s</td></tr>
				<tr><th>Phone</th><td>%s</td></tr>
				<tr><th>Position</th><td>%s</td></tr>
				<tr><th>Note</th><td>%s</td></tr>
				<tr><th>Resume</th><td>%s</td></tr>
			</table>

			<p style="margin-top:16px;">Kind regards,<br><span class="brand">Prospira Careers</span></p>
			</div>
			<div class="footer">
			This message was generated automatically by the careers portal. Please do not reply to this email.
			</div>
		</div>
		</body>
		</html>
`, now, fn, em, ph, ps, nt, resumeStatus)
}

func buildEmailPlainText(req models.JobApplicationResp) string {
	fn := req.FullName
	em := req.Email
	ph := req.Phone
	ps := req.Position
	nt := req.Note
	resumeStatus := "—"
	if req.Resume != "" {
		resumeStatus = "Please find the applicant’s resume attached for your reference."
	}

	return fmt.Sprintf(
		`New Job Application Received - Prospira Careers

		Dear HR Team,

		A new job application has been submitted via the website.

		Full Name : %s
		Email     : %s
		Phone     : %s
		Position  : %s
		Note      : %s
		Resume    : %s

		Kind regards,
		Prospira Careers
		(Automated message)`, fn, em, ph, ps, nt, resumeStatus)
}

func (h *JobApplicationHandler) SendEmailAfterJobCreated(req models.JobApplicationResp) error {
	to := []string{"puvadon.artmit@prospira.com"}
	subject := fmt.Sprintf("New Job Application – %s", req.FullName)

	host := os.Getenv("SMTP_HOST")
	if host == "" {
		return fmt.Errorf("SMTP_HOST is empty")
	}
	portStr := os.Getenv("SMTP_PORT")
	if portStr == "" {
		return fmt.Errorf("SMTP_PORT is empty")
	}
	port, err := strconv.Atoi(portStr)
	if err != nil {
		return fmt.Errorf("invalid SMTP_PORT: %v", err)
	}
	user := os.Getenv("SMTP_USERNAME")
	pass := os.Getenv("SMTP_PASSWORD")
	from := os.Getenv("SMTP_SET_FROM")
	if user == "" || pass == "" || from == "" {
		return fmt.Errorf("SMTP_USERNAME/SMTP_PASSWORD/SMTP_SET_FROM is empty")
	}

	d := mail.NewDialer(host, port, user, pass)
	d.TLSConfig = &tls.Config{
		ServerName:         host,
		InsecureSkipVerify: true,
	}

	m := mail.NewMessage()
	m.SetHeader("From", from)
	m.SetHeader("To", to...)
	m.SetHeader("Subject", subject)

	htmlBody := buildEmailBody(req)
	plainBody := buildEmailPlainText(req)
	m.SetBody("text/html; charset=UTF-8", htmlBody)
	m.AddAlternative("text/plain; charset=UTF-8", plainBody)

	if req.Resume != "" {
		if err := attachResume(m, req.Resume); err != nil {
			log.Println("warning: could not attach resume:", err)
			m.AddAlternative("text/plain; charset=UTF-8",
				plainBody+"\n\n(Notice: Resume could not be attached. Please check the server logs or the uploads directory.)")
		}
	}

	return d.DialAndSend(m)
}
