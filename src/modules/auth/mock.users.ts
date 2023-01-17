export interface IUser {
  email: string;
  password: string;
  fullName: string;
}

export const users: IUser[] = [
  {
    email: 'yatin@dummy.com',
    password: '12345',
    fullName: 'Yatin Gupta',
  },
];
