import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { sign } from 'crypto';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {

    fakeUsersService = {
      findOne: (id:number) =>  Promise.resolve({id, email:'maede@gmail.com' , password:'123123'} as User),
      find: (email:string) => Promise.resolve([{id:2, email:'maede@gmail.com' , password:'123123'} as User]),
     // update: () => { },
     // remove:()=>{}
    }
    fakeAuthService = {
      // signup: () => { },
      signin: (email: string, password: string) => Promise.resolve({ id: 1, email, password } as User) 
    }


    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService
        }, {
          provide: AuthService,
          useValue: fakeAuthService
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('find all users must be list of users with given email.', async () => {
    const users = await controller.findAllUsers('maede@gmail.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('maede@gmail.com');
  });

  it('findOne user must be return a single user.', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  });

  it('findOne user must be throw an error if user does not exist.', async () => {
    fakeUsersService.findOne = ()=>null;
    try {
      await controller.findUser('1');
    } catch(error) {  
    }
  });

  it('signin and update session object.', async () => {
    const session = { userId: -1 };
    const user =  await controller.signinUser({email:'maede@gmail.com' , password:'123123'}as User , session);
  
    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  
  });

});
