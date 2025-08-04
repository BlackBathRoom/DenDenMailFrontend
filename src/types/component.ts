type Color =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'info'
  | 'error';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type ClassMap<K extends string, P extends string> = {
  [key in K]: `${P}-${key}`;
};

export type { Color, Size, ClassMap };
