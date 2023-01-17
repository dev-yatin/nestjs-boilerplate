import { SetMetadata } from '@nestjs/common';

export const SetRoutePublic = () => SetMetadata('isPublic', true);
