import { Reflector } from '@nestjs/core';
import { UserRole } from '~/entities/users/User.entity';

export const Roles = Reflector.createDecorator<UserRole[]>();