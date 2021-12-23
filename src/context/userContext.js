import React from 'react';
import {
  getAllUsers,
  UpdateUserById,
  deleteUserById
} from '../services/userService';

export const UserContext = React.createContext();

async function getAll() {
  let result = await getAllUsers();
  return result;
}

async function update(userData) {
  let result = await UpdateUserById(userData.id, userData);
  return result;
}

async function deleteUser(userId) {
  let result = await deleteUserById(userId);
  return result;
}

export const userContextValues = {
  getAll,
  update,
  deleteUser
};