import React from 'react';
import {
  getUserById,
  getAllUsers,
  UpdateUserById,
  deleteUserById
} from '../services/userService';

export const UserContext = React.createContext();

async function getAll() {
  let result = await getAllUsers().catch((err) => { console.log(err) });
  return result;
}

async function getUser(id) {
  let result = await getUserById(id).catch((err) => { console.log(err) });
  return result;
}

async function update(userData) {
  let result = await UpdateUserById(userData.id, userData).catch((err) => { console.log(err) });
  return result;
}

async function deleteUser(userId) {
  let result = await deleteUserById(userId).catch((err) => { console.log(err) });
  return result;
}

export const userContextValues = {
  getUser,
  getAll,
  update,
  deleteUser
};