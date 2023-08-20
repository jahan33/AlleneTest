import { CustomerDto } from '../customer/customer-dto';
import { sortEnum } from '../page-request/page-request-dto';
import { VehicleDto } from '../vehicle/vehicle-dto';
export class ContractDto {
  id?: number;
  monthlyRate?: number;
  customer?: CustomerDto;
  vehicle?: VehicleDto;
}
export class ContractOverviewDto {
  contractId?: number;
  customerId?: number;
  customerName?: string;
  vehicleId?: number;
  vehicleName?: string;
  vin?: string;
  monthlyRate?: number;
  vehiclePrice?: number;
}
export class ContractOverviewPageResponseDto {
  page: number = 0;
  size: number = 10;
  sort: sortEnum = sortEnum.UNSORTED;
  numberOfPages: number = 0;
  numberOfItems: number = 0;
  overviewItems: ContractOverviewDto[] = [];
}
