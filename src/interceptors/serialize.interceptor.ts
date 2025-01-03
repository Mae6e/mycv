import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

interface ClassConstror{
  new(args: any[]) : {};
}
export function Serialize(dto:ClassConstror) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {

  constructor(private dto:any){}
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // console.log('Iam running before the handler:', context);

    return handler.handle().pipe(
      map((data: any)=> {
        // console.log('Iam running before response is send out:', data);
        return plainToClass(this.dto, data, {
          excludeExtraneousValues:true
        });
        })
    )
}
}