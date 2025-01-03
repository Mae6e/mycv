import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction , Request, Response} from "express";
import { User } from "../users/user.entity";
import { UsersService } from "../users/users.service";

declare global {
  namespace Express{
    interface Request{
      currentUser?: User
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {

  constructor(private usersService: UsersService) { }
  
  async use(req: Request, res: Response, next: NextFunction) {
    
    const { userId } = req.session || {};
    
    if (userId) {
      const user = await this.usersService.findOne(userId);
      // // @ts-ignore
      req.currentUser = user;
    }
    next();
  }
    
}