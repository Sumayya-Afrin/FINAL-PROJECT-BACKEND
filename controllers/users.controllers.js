import {
  createUser,
  getUserByUsername,
  createSession,
} from "../services/users.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { response } from "express";
import { v4 } from "uuid";

const genHashPassword = async (password) => {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  const hashed_password = await bcrypt.hash(password, salt);
  return hashed_password;
  // console.log(salt);
  // console.log(hashed_password);
};

async function createUserCtr(request, response) {
  const data = request.body;
  const password = data.password;
  const roleId = 1;
  if (data.password.length < 8) {
    response.status(400).send({ msg: "password is too short" });
    return;
  }
  const userFromDB = await getUserByUsername(data.username);
  console.log(userFromDB);

  if (userFromDB.data) {
    response.status(400).send({ msg: "User already exists" });
    return;
  }

  const hashedPassword = await genHashPassword(data.password);
  const hashedData = {
    username: data.username,
    password: hashedPassword,
    roleId: roleId,
  };
  try {
    await createUser(hashedData);
    response.status(201).send(hashedData);
    console.log(hashedData);
  } catch (error) {
    response.status(500).send({ msg: "failed to signup" });
  }
}

async function loginUserCtr(request, response) {
  const data = request.body;
  const username = data.username;
  const userFromDB = await getUserByUsername(data.username);
  if (!userFromDB.data) {
    response.status(400).send({ msg: `invalid credentials` });
  } else {
    const storedDBPassword = userFromDB.data.password;
    const providedPassword = data.password;
    const isPasswordCheck = await bcrypt.compare(
      providedPassword,
      storedDBPassword
    );
    console.log({ providedPassword, storedDBPassword });
    console.log(isPasswordCheck);
    if (isPasswordCheck) {
      var token = jwt.sign(
        {
          afrin: userFromDB.data.username,
        },
        process.env.SECRET_KEY
      );
      console.log(token);
      const sessionData = { username, token };
      await createSession(sessionData);

      response.status(200).send({ msg: `login successful`, token });
    } else {
      response.status(400).send({ msg: `invalid credentials` });
    }
  }
}

export { createUserCtr, loginUserCtr };
