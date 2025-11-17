db.createUser({
  user: "appuser",
  pwd: "apppassword",
  roles: [
    {
      role: "readWrite",
      db: "merndb",
    },
  ],
});

db.merndb.insertOne({
  message: "MERN Stack Docker Setup Completed",
  timestamp: new Date(),
});
