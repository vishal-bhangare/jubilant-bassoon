export interface UserI {
  name: string;
  email: string;
  password: string;
}

// storing users
let users = [
  {
    id: 1,
    name: 'vishal',
    email: 'vishal@gmail.com',
    password: 'vishal',
  },
  {
    id: 2,
    name: 'admin',
    email: 'admin@gmail.com',
    password: 'admin',
  },
];

// last user id created
let lastId = 2;

// retrieving  user details by email
export const getUserByEmail = (email: string) => {
  return users.filter((user) => user.email == email)[0];
};

// retrieving  user details by user id
export const getUserById = (id: number) => {
  return users.filter((user) => user.id == id)[0];
};

// adding new user
export const registerUser = (user: UserI) => {
  users.push({ id: ++lastId, ...user });
  return lastId;
};

// updating user details
export const updateUser = (userId: number, userData: UserI) => {
  users = users.map((user) =>
    user.id == userId ? { id: user.id, ...userData } : user
  );
};
