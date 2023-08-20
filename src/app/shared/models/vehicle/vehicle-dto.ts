import { sortEnum } from '../page-request/page-request-dto';

export class VehicleDto {
  id: number = 0;
  brand?: string;
  model?: string;
  modelYear?: number;
  vin?: string;
  price?: number;
}
export class VehiclePageResponseDto {
  page: number = 0;
  size: number = 10;
  sort: sortEnum = sortEnum.UNSORTED;
  numberOfPages: number = 0;
  numberOfItems: number = 0;
  overviewItems: VehicleDto[] = [];
}
