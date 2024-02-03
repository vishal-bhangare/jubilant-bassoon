export interface UserI {
  name: string;
  email: string;
  password: string;
}

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

let lastId = 2;
export const getUserByEmail = (email: string) => {
  return users.filter((user) => user.email == email)[0];
};
export const getUserById = (id: number) => {
  return users.filter((user) => user.id == id)[0];
};

export const registerUser = (user: UserI) => {
  users.push({ id: ++lastId, ...user });
  return lastId;
};

export const updateUser = (userId: number, userData: UserI) => {
  users = users.map((user) =>
    user.id == userId ? { id: user.id, ...userData } : user
  );
};
