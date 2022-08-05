declare type Expand<T> = T extends infer O ? { [key in keyof O]: O[key] } : never;
declare type ExpandRecursive<T> = T extends object ? (T extends infer O ? { [key in keyof O]: ExpandRecursive<O[key]> } : never) : T;
declare type SizeType = 'normal' | 'small' | 'large';
declare type BtnType = 'primary' | 'success' | 'error' | 'warn' | 'info';
declare type BtnSizeType = 'short' | 'long';
declare type BtnDisableType = 'true' | 'false';
declare type TbHeadKeyType = {
    key: string,
    name: string,
    editable?: boolean
};
declare type TbBodyDataType = {
    key: string,
    value: string
}

declare type TableEditParamsType = {
    key: string,
    name: string,
    value: string,
    index: number
}
declare type EchartLineDrawType = 'canvas' | 'svg';
declare type EChartsOption = echarts.EChartsOption;
