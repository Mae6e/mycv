import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { User } from './user.entity';

describe('AuthService', () => {

  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;
  const users: User[] = [];

  beforeEach(async () => {
    //? create a fake users service
     fakeUsersService= {
       find: (email: string) => {
         const filteredUsers = users.filter(x => x.email === email);
         return Promise.resolve(filteredUsers);
      },
       create: (email: string, password: string) => {
         const user = { id: Math.floor(Math.random() * 9999), email, password } as User;
         users.push(user);
         return Promise.resolve(user);
      }
    }
    
    const module = await Test.createTestingModule({
      providers: [AuthService, {
        provide: UsersService,
        useValue: fakeUsersService
      }]
    }).compile();
    
    service = module.get(AuthService);
  })

  it('can create instance of auth service?', async () => {
    expect(service).toBeDefined();
  });

  it('can create a user with a salted and hashed password?', async () => {
    const user = await service.signup('maede@gmail.com', '123123');

    expect(user.password).not.toEqual('12323');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error when user signs up with email that is in use!', async () => {
    await service.signup('me@gmail.com', '3123123');
    try {
      await service.signup('me@gmail.com', '3123123');
    } catch (error) {
      //console.log(error.message);
    }
  });

  it('throws an error if signin with unusage email!', async () => {
    try {
      await service.signin('mmm@yahoo.com', '123232');
    } catch (error) {
      //console.log(error.message);
    }
  });

  it('throws an error with invalid password is provided!', async () => {
    await service.signup('sasa@gmail.com', '123123');
    try {
      await service.signin('sasa@gmail.com', '3123123');
    } catch (error) {
     // console.log(error.message);
    }
  });

  it('return a user if correct password is provided!', async () => {
    await service.signup('mmm@gmail.com', '123123');
    const user = await service.signin('mmm@gmail.com', '123123');
    expect(user).toBeDefined();
  });



});

