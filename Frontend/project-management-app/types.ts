export type User = {
  _id?: string;
  username: string;
  email: string;
  password: string;
  role: string;
};

export type Project = {
  _id?: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  projectManager: string;
};
