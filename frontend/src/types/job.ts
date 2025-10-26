export type Job = {
  job_recruitment_id: string; 
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  hot?: boolean;
  description: string;
  requirements: string[];
};
