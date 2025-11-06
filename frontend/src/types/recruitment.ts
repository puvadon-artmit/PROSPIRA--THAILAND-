export type JobRecruitment = {
  job_recruitment_id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  hot: boolean;
  description: string;
  requirements: string[];
  username_creator: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
};