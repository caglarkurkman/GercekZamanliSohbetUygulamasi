"use strict";

const express = require("express");
var route = express.Router();

const { validate } = require("express-validation");

const authValidation = require("../validations/authValidations");

const { PrismaClient } = require("@prisma/client");

const { isEmail } = require("validator");

const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");

route.post(
  "/register",
  validate(authValidation.create, {}, {}),
  async (request, response, next) => {
    try {
      if (request.body.password !== request.body.passwordConfirmation) {
        return response.status(400).json({
          name: "ValidationError",
          message: "Validation Failed",
          statusCode: 400,
          error: "Bad Request",
          details: {
            body: [
              {
                message: "Invalid password",
              },
            ],
          },
        });
      }

      const emailExists = await prisma.user.findFirst({
        where: {
          OR: [
            { email: request.body.email },
            { username: request.body.username },
          ],
        },
      });

      if (emailExists) {
        return response.status(400).json({
          name: "ValidationError",
          message: "Validation Failed",
          statusCode: 400,
          error: "Bad Request",
          details: {
            body: [
              {
                message: "User already registered",
              },
            ],
          },
        });6
      }

      let hashedPassword = await bcrypt.hash(request.body.password, 10);

      let user = await prisma.user.create({
        data: {
          email: request.body.email,
          username: request.body.username,
          password: hashedPassword,
        },
      });

      return response.status(200).json({
        status: "success",
        message: "Kayıt başarılı, giriş yapabilirsiniz...",
      });
    } catch (err) {
      return response.status(400).json({
        name: "ValidationError",
        message: "Validation Failed",
        statusCode: 400,
        error: "Bad Request",
        details: {
          body: [
            {
              message: err,
            },
          ],
        },
      });
    }
  }
);

route.post(
  "/login",
  validate(authValidation.login, {}, {}),
  async (request, response, next) => {
    let emailOrUsername = true;

    if (!isEmail(request.body.email)) {
      emailOrUsername = false;
    }

    try {
      if (emailOrUsername === true) {
        var userExists = await prisma.user.findFirst({
          where: {
            email: request.body.email,
          },
        });
      } else {
        var userExists = await prisma.user.findFirst({
          where: {
            username: request.body.email,
          },
        });
      }

      if (!userExists) {
        return response.status(400).json({
          name: "ValidationError",
          message: "Validation Failed",
          statusCode: 400,
          error: "Bad Request",
          details: {
            body: [
              {
                message: "User does not exist",
              },
            ],
          },
        });
      }

      if (
        userExists &&
        (await bcrypt.compare(request.body.password, userExists.password))
      ) {
        const accessToken = jwt.sign(userExists, process.env.SECRET_KEY, {
          expiresIn: "15m",
        });
        const refreshToken = jwt.sign(userExists, process.env.REFRESH_KEY, {
          expiresIn: "7d",
        });

        return response.status(200).json({
          status: "success",
          message: "Giriş başarılı",
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
      } else {
        return response.status(400).json({
          name: "ValidationError",
          message: "Validation Failed",
          statusCode: 400,
          error: "Bad Request",
          details: {
            body: [
              {
                message: "Invalid credentials",
              },
            ],
          },
        });
      }
    } catch (err) {
      return response.status(400).json({
        name: "ValidationError",
        message: "Validation Failed",
        statusCode: 400,
        error: "Bad Request",
        details: {
          body: [
            {
              message: err,
            },
          ],
        },
      });
    }
  }
);

route.post("/verifyToken", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ valid: false, message: "Token is missing" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ valid: false, message: "Invalid token" });
    }
    // Token geçerli ise
    res
      .status(200)
      .json({ valid: true, message: "Token is valid", user: decoded });
  });
});

route.post("/refreshToken", (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ valid: false, message: "Token is missing" });
  }

  jwt.verify(refreshToken, process.env.REFRESH_KEY, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ valid: false, message: "Invalid token" });
    }

    var decod = JSON.stringify(decoded);

    var user = await prisma.user.findFirst({
      where: {
        email: decod.email,
      },
    });

    const accessToken = jwt.sign(user, process.env.SECRET_KEY, {
      expiresIn: "15m",
    });
    res.status(200).json({
      valid: true,
      message: "New access token generated",
      accessToken: accessToken,
      user: decoded,
    });
  });
});

module.exports = route;
