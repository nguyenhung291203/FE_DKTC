export interface LoginRequest {
  username: string;
  password: string;
}

export interface PointRequest {
  scoreNumberOne: number | null;
  scoreNumberTwo: number | null;
  scoreNumberThree: number | null;
}

export interface PointPayload {
  id: {
    studentId: string;
    classesSubjectsId: string;
  };
  scoreNumberOne: number | null;
  scoreNumberTwo: number | null;
  scoreNumberThree: number | null;
}
