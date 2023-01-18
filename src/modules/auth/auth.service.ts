import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { users, IUser } from './mock.users';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {
    global.jwtService = jwtService;
  }
  /**
   * To get authenticated user
   * @param username Email which user use to login
   * @param password Password(For now any password will work)
   * @returns Authenticated User or null
   */
  async mockLogin(username: string, password: string): Promise<any> {
    const user = users.find((user) => user.email === username);
    if (user) {
      // TODO: Temporarily we are not doing password check. Any password will work
      return user;
    }
    return null;
  }

  /**
   * To login user and return JWT token
   * @param user Authenticated User
   * @returns JWT Token
   */
  login(user: IUser) {
    const userPayload = { ...user };
    return {
      access_token: this.jwtService.sign(userPayload),
    };
  }
}
