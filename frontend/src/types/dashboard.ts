export type Summary = {
  job_applications: number;
  job_recruitments: number;
  questionnaires: number;
  users: number;
};

export type JobApplication = {
  job_application_id: string | number;
  full_name?: string | null;
  position?: string | null;
  status?: string | null;
  // server returns "YYYY-MM-DD HH:mm:ss"
  created_at?: string | null;
};
