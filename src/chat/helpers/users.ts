const users: IUser[] = []; // users in a room
const allUsers: IUser[] = [];

interface IUser {
  id: string;
  userName: string;
  email?: string;
  room?: string;
}

export const newConnectedUser = ({ id, userName, email }: IUser) => {
  const user = {
    id,
    userName,
    email,
  };

  const userEmailExists = allUsers.some((user) => user.email === email);
  const userIdExists = allUsers.some((user) => user.id === id);

  if (userEmailExists === false && userIdExists === false) {
    allUsers.push(user);
  }

  return { user };
};

export const addUser = ({ id, userName, room }: IUser) => {
  userName = userName.trim().toLowerCase();

  if (!room) {
    return {
      error: "Room is required",
    };
  }

  room = room.trim().toLowerCase();

  if (!userName || !room) {
    return {
      error: "Username and room are required",
    };
  }

  const user = {
    id,
    userName,
    room,
  };

  users.push(user);
  return { user };
};

export const removeUser = (id: string) => {
  const index = allUsers.findIndex((user) => user.id === id);

  if (index !== -1) {
    return allUsers.splice(index, 1)[0];
  }
};

export const removeUserRoom = (id: string) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

export const getUser = (id: string) => {
  return users.find((user) => user.id === id);
};

export const getUsersInRoom = (room: string) => {
  return users.filter((user) => user.room === room);
};

export const getAllUsers = () => {
  return allUsers;
};
