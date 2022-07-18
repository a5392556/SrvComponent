declare type Expand<T> = T extends infer O ? { [key in keyof O]: O[key] } : never;
declare type ExpandRecursive<T> = T extends object ? (T extends infer O ? { [key in keyof O]: ExpandRecursive<O[key]> } : never) : T;
declare type SizeType = 'normal' | 'small' | 'large';
declare type BtnType = 'primary' | 'success' | 'error' | 'warn' | 'info';
declare type BtnSizeType = 'short' | 'long';
declare type BtnDisableType = 'true' | 'false';