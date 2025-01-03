import { Expose, Transform } from "class-transformer";


export class ReportDto{
  @Expose()
  id: number;

  @Expose()
  year: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  lat: number;

  @Expose()
  lng: number;

  @Expose()
  mileage: number;

  @Expose()
  price: number;

  @Expose()
  approved: boolean;

  @Transform(({obj})=>obj.user.id)
  @Expose()
  userId:number
}