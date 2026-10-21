export type Designer = {
  id: number;
  name: string;
  slug: string;
};

export type DesignersData = {
  [key: string]: Designer[]; // アルファベットごとのデザイナー配列
};

export type Initial = {
  label: string;
  key: string;
};
