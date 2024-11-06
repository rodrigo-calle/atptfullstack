import { SetMetadata } from '@nestjs/common';

export const jwtConstants = {
  secret: 'is_a_good_day_to_develop_an_app',
};
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
