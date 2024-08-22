import { Users } from "../entities/users.entity.js";
import { Session } from "../entities/session.entity.js";

async function createUser(data) {
  return await Users.create(data).go();
}
async function getUserByUsername(username) {
  return await Users.get({ username: username }).go();
}

async function createSession(sessionData) {
  return await Session.create(sessionData).go();
}

async function usernameToken(token) {
  return await Session.get({ token: token }).go();
}

export { createUser, getUserByUsername, createSession, usernameToken };
