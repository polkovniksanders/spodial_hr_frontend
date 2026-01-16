export interface MethodologyDTO {
  name: string;
  text: string;
}

export interface MethodologyProps extends MethodologyDTO {
  id: number;
  teams: number[];
}
