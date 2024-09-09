export type DateData = Record<string, string>;

export type DateField = {
  date: string;
  link: string;
};

export type PotreeDate = {
  status: string;
  msg: string;
  result: DateData[];
  resultTest: DateData[];
};

export type Mode =
  | "view"
  | "select"
  | "line"
  | "angle"
  | "distance"
  | "polygon"
  | "circle"
  | "point";
