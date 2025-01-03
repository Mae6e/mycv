
import { Transform } from 'class-transformer';
import {
   IsString, Min, Max,
  IsNumber,
  IsLatitude,
  IsLongitude,
} from 'class-validator';

export class EstimateReportDto {

  @IsString()
  make: string;

  @IsString()
  model: string;

  @Transform(({value})=>parseInt(value))
  @IsNumber()
  @Min(1960)
  @Max(2024)
  year: number;

  @Transform(({value})=>parseFloat(value))
  @IsLatitude()
  lat: number;

  @Transform(({value})=>parseFloat(value))
  @IsLongitude()
  lng: number;

  @Transform(({value})=>parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;

}