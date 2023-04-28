import { User } from '@prisma/client';

export interface UserAuth extends User{
  store: {
    id: string
  }
}