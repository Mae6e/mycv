
import {
  IsEmail, IsString, Min, Max,
  isLatitude, isLongitude,
  IsNumber,
  IsLatLong,
  IsLatitude,
  IsLongitude
} from 'class-validator';

export class CreateReportDto {

  @IsNumber()
  @Max(1000000)
  price: number;

  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  @Min(1960)
  @Max(2024)
  year: number;

  @IsLatitude()
  lat: number;

  @IsLongitude()
  lng: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;

}