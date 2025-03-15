"use strict";
const express = require("express");
var route = express.Router();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

route.post("/friends", async function (req, res) {
  const { userId } = req.body;
  const friends = await prisma.friend.findMany({
    where: {
      OR: [
        {
          user1Id: userId,
        },
        {
          user2Id: userId,
        },
      ],
    },
    include: {
      user1: {
        select: {
          fullName: true,
          username: true,
          picture: true,
          status: true,
        },
      },
      user2: {
        select: {
          fullName: true,
          username: true,
          picture: true,
          status: true,
        },
      },
    },
  });

  let filteredFriends = [];

  friends.forEach(filterFriend);

  function filterFriend(friend) {
    if (friend.user1Id === userId) {
      var user = friend.user2;
      user.status = friend.status;
      user.user1Id = friend.user1Id;
      user.user2Id = friend.user2Id;
      user.id = friend.id;

      filteredFriends.push(user);
    } else {
      var user = friend.user1;
      user.status = friend.status;
      user.user1Id = friend.user1Id;
      user.user2Id = friend.user2Id;
      user.id = friend.id;

      filteredFriends.push(user);
    }
  }

  if (!friends) {
    return res.status(400).json({
      status: "error",
      message: "Arkadaşlar bulunamadı.",
    });
  }

  return res.status(200).json({
    status: "success",
    message: "Arkadaşlar listelendi",
    friends: filteredFriends,
  });
});

route.post("/acceptedFriends", async function (req, res) {
  const { userId } = req.body;
  const friends = await prisma.friend.findMany({
    where: {
      OR: [
        {
          user1Id: userId,
        },
        {
          user2Id: userId,
        },
      ],
      status: 1,
    },
    include: {
      user1: {
        select: {
          fullName: true,
          username: true,
          picture: true,
          status: true,
          id: true,
        },
      },
      user2: {
        select: {
          fullName: true,
          username: true,
          picture: true,
          status: true,
          id: true,
        },
      },
    },
  });

  let filteredFriends = [];

  friends.forEach(filterFriend);

  function filterFriend(friend) {
    if (friend.user1Id === userId) {
      filteredFriends.push(friend.user2);
    } else {
      filteredFriends.push(friend.user1);
    }
  }

  if (!friends) {
    return res.status(400).json({
      status: "error",
      message: "Arkadaş bulunamadı.",
    });
  }

  return res.status(200).json({
    status: "success",
    message: "Arkadaşlar listelendi.",
    friends: filteredFriends,
  });
});

route.post("/withoutFriends", async function (req, res) {
  const { userId } = req.body;

  const friends = await prisma.friend.findMany({
    where: {
      OR: [
        {
          user1Id: userId,
        },
        {
          user2Id: userId,
        },
      ],
    },
  });

  const user2IdArray = [];

  if (friends.length === 0) {
    user2IdArray.push(userId);
  }

  friends.forEach((item) => {
    user2IdArray.push(item.user1Id, item.user2Id);
  });

  const cleanedUser2IdArray = user2IdArray.filter((id) => id !== undefined);

  console.log(friends);

  const excludedFriends = await prisma.user.findMany({
    where: {
      NOT: {
        id: {
          in: cleanedUser2IdArray,
        },
      },
    },
  });

  if (!excludedFriends) {
    return res.status(400).json({
      status: "error",
      message: "Kullanıcılar bulunamadı.",
    });
  }

  return res.status(200).json({
    status: "success",
    message: "Kullanıılar listelendi",
    users: excludedFriends,
  });
});

// Simdi arkadas eklemek icin endpoint tanimlayalim
route.post("/add", async function (req, res) {
  const { userId, id } = req.body;

  const friendData = await prisma.friend.create({
    data: {
      user1Id: userId,
      user2Id: id,
    },
    include: {
      user2: {
        select: {
          fullName: true,
          username: true,
          picture: true,
          status: true,
        },
      },
    },
  });

  if (!friendData) {
    return res.status(400).json({
      status: "error",
      message: "Arkadaşlık isteği gönderilemedi.",
    });
  }

  return res.status(200).json({
    status: "success",
    message: "Arkadaşlık isteği gönderildi.",
    friend: friendData,
  });
});

route.post("/accept", async function (req, res) {
  const { id } = req.body;

  const friendData = await prisma.friend.update({
    where: {
      id,
    },
    data: {
      status: 1,
    },
    include: {
      user2: {
        select: {
          fullName: true,
          username: true,
          picture: true,
          status: true,
        },
      },
    },
  });

  if (!friendData) {
    return response.status(400).json({
      name: "ValidationError",
      message: "Validation Failed",
      statusCode: 400,
      error: "Bad Request",
      details: {
        body: [
          {
            message: "Friend not added",
          },
        ],
      },
    });
  }

  return res.status(200).json({
    status: "success",
    message: "Arkadaşlık isteği kabul edildi.",
    friend: friendData,
  });
});

route.post("/decline", async function (req, res) {
  const { id } = req.body;
  const friendData = await prisma.friend.delete({
    where: {
      id: id,
    },
  });

  return res.status(200).json({
    status: "success",
    message: "Arkadaşlık isteği reddedildi.",
  });
});

route.post("/friend", async function (req, res) {
  const { userId, friendId } = req.body;

  prisma.friend
    .findFirst({
      where: {
        id: parseInt(friendId),
      },
    })
    .then(async (friend) => {
      if (friend.length === 0) {
        return res.status(200).json({
          status: "success",
          message: "Arkadaşlık isteği gönderildi.",
          user: friend,
        });
      } else {
        var user = null;

        if (friend.user1Id === parseInt(userId)) {
          user = await prisma.user.findFirst({
            where: {
              id: friend.user2Id,
            },
          });
        }

        if (friend.user2Id === parseInt(userId)) {
          user = await prisma.user.findFirst({
            where: {
              id: friend.user1Id,
            },
          });
        }

        return res.status(200).json({
          status: "success",
          message: "Arkadaş bulundu.",
          user: user,
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        status: "error",
        message: "Arkadaş bulunamadı.",
        error: err,
      });
    });
});

module.exports = route;
