export interface addCategoryRequestDto {
  categoryName: string;
  parentCategoryId?: number;
}

export interface updateCategoryRequestDto {
  categoryName: string;
  parentCategoryId?: number;
}
