export interface ContactSubmissionModel {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
  status: 'PENDING' | 'PROCESSED' | 'REPLIED';
}
