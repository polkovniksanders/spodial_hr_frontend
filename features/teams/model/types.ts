export interface TeamProps extends TeamCreateDTO {
  id: number;
  employee_count: number;
}

export interface TeamCreateDTO {
  name: string;
}

export interface TeamAddMemberDTO {
  email: string;
}
