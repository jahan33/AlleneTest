export class PageRequestDto {
  page: number = 0;
  size: number = 10;
  sort: sortEnum = sortEnum.UNSORTED;
}
export enum sortEnum {
  UNSORTED = 'UNSORTED',
  ASC = 'ASC',
  DESC = 'DESC',
}
