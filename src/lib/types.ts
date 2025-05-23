export type RawClimb = {
  created_at: string;
  updated_at: string;
  id: number;
  grade: number;
  color: string;
  zone: string;
  notes: string;
};

export type Climb = {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  grade: number;
  color: string;
  zone: string;
  notes: string;
}

export type PostClimbProps = {
  grade: string;
  color: string;
  zone: string;
  user_id: string;
  notes: string;
}

export type DeleteClimbProps = {
  id: number;
}