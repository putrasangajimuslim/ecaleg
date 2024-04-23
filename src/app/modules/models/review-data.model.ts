export interface ReviewData<T> {
  [key: string]: ReviewDataItem<T> | string;
}

export interface ReviewDataItem<T> {
    data: T;
}