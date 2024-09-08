try {
  db.createUser({
    user: "yasen",
    pwd: "123123",
    roles: [
      {
        role: "userAdminAnyDatabase",
        db: "test"
      }
    ]
  });
  print("User created successfully");
} catch (e) {
  print("Error creating user: " + e);
}