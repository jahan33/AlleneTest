import { sortEnum } from 'src/app/shared/models/page-request/page-request-dto';
export class CustomerDto {
  id: number = 0;
  firstName: string = '';
  lastName: string = '';
  birthDate: string = '';
}
export class CustomerPageResponseDto {
  page: number = 0;
  size: number = 10;
  sort: sortEnum = sortEnum.UNSORTED;
  numberOfPages: number = 0;
  numberOfItems: number = 0;
  overviewItems: CustomerDto[] = [];
}
