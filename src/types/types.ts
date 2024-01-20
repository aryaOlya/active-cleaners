export interface UserType {
  id: number;
  name: string;
  email: string;
}

export interface TopicType {
  id: number;
  name: string;
}

export interface EmailType {
  id: number;
  title: string;
  body: string;
  userId: number;
  topicId: number;
  date: string;
  status:string
}
