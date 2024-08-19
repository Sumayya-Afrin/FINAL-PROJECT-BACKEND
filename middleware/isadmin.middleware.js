import jwt from "jsonwebtoken";
import { Session } from "../entities/session.entity";
import { Users } from "../entities/users.entity";
import { request, response } from "express";

const ADMIN = 0;
const authIsAdmin = async (request, response, next) => {
  const token = request.header("x-auth-token");
  try {
    const results = await Session.get({ token: token }).go();
    const role = await Users.get({ username: results.data.username }).go();
    console.log(results, role);

    if (role.data.roleId === ADMIN) {
      next();
    } else {
      throw new Error("Unauthorized");
    }
  } catch {
    error;
  }
  {
    response.status(401).send({ msg: error.message });
  }
};

export { authIsAdmin };
