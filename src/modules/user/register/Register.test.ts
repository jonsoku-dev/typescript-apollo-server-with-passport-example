import faker from 'faker';
import { Connection } from 'typeorm';
import { testConn } from '../../../test-utils/testConn';
import { gCall } from '../../../test-utils/gCall';
import { User } from '../../../entity/User';

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  await conn.close();
});

const registerMutation = `
  mutation Register($input: RegisterInput!){
    register(
      input: $input
    ){
     id
     username
     email
     password
    }
  }
`;

describe('Register', () => {
  it('create user', async () => {
    const user = {
      username: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const response = await gCall({
      source: registerMutation,
      variableValues: {
        input: user,
      },
    });
    if (response.errors) {
      console.log(response.errors[0].originalError);
    }
    expect(response).toMatchObject({
      data: {
        register: {
          username: user.username,
          email: user.email,
        },
      },
    });
    const dbUser = await User.findOne({ where: { email: user.email } });
    expect(dbUser).toBeDefined();
    expect(dbUser!.username).toBe(user.username);
  });
});
