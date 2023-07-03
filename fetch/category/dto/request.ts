export interface addCategoryRequestDto {
  parentCategory: string;
  childCategory?: string;
}

export interface updateCategoryRequestDto {
  id: number;
  parentCategory: string;
  childCategory?: string;
}
