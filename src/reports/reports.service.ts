import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-Report.dto';
import { User } from 'src/users/user.entity';
import { NotFoundError } from 'rxjs';
import { EstimateReportDto } from './dtos/estimate-report.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>)
  { }
  
  async create(createReportDto: CreateReportDto, user:User) {
    const report = await this.repo.create(createReportDto);
    report.user = user;
    return await this.repo.save(report);
  }

  async changeApproval(id:number, approved:boolean) {
    const report = await this.repo.findOne({ where: { id } });
    if (!report)
      throw new NotFoundException('can not found report');

    report.approved = approved;
    return await this.repo.save(report);
  }

  async createEstimate({make, model, year , lat,lng,mileage}: EstimateReportDto) {
    
    return await this.repo.createQueryBuilder()
      .select('AVG(price)' ,'price')
      .where('make = :make', { make })
      .andWhere('model = :model',{model})
      .andWhere('year - :year BETWEEN -3 and 3', { year })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
      .orderBy('ABS(mileage - :mileag)' , 'DESC').setParameters({mileage})
      .limit(3)
      .getRawOne();
  
  }
}
