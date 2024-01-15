export type Doodle = {
  recognized: boolean;
  key_id: string;
  drawing: number[][][];
  word: string;
};

export type Vector = {
  key_id: string;
  vector: number[];
  word: string;
};
