import {  Controller, Post , Body, UseGuards, Patch, Param, Query, Get } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-Report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from '../guards/admin.guard';
import { EstimateReportDto } from './dtos/estimate-report.dto';

@Controller('reports')
export class ReportsController {

  constructor(private reportService: ReportsService) {
  }

  @Post('/')
  @UseGuards(AuthGuard) 
  @Serialize(ReportDto)  
  createReport(@Body() body:CreateReportDto , @CurrentUser() user:User){
    return this.reportService.create(body , user);
  }
  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id:string, @Body() body: ApproveReportDto) {
    return this.reportService.changeApproval(parseInt(id), body.approved);
  }

  @Get()
  async getEstimate(@Query() query: EstimateReportDto) {
    return await this.reportService.createEstimate(query);
  }
}
