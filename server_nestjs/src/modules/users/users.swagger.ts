import { UserEntity } from './user.entity';

const userEntity1 = new UserEntity();
const userEntity2 = new UserEntity();
const userEntity3 = new UserEntity();

userEntity1.id = '1';
userEntity1.firstName = 'John';
userEntity1.lastName = 'Doe';
userEntity1.email = 'john_doe@test.com';
userEntity1.phoneNumber = '+380 98 1234567';
userEntity1.city = 'Lviv';

userEntity2.id = '2';
userEntity2.firstName = 'Jane';
userEntity2.lastName = 'Doe';
userEntity2.email = 'jane_doe@test.com';
userEntity2.phoneNumber = '+380 67 9876543';
userEntity2.city = 'Lviv';

userEntity3.id = '3';
userEntity3.firstName = 'Dick';
userEntity3.lastName = 'Blow';
userEntity3.email = 'dick_blow@test.com';
userEntity3.phoneNumber = '+380 50 7765876';
userEntity3.city = 'Lviv';

export const USER_LIST_OK_RESPONSE_EXAMPLE: UserEntity[] = [
  userEntity1,
  userEntity2,
  userEntity3,
];
