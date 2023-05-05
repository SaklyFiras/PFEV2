const password  = bcryptjs.hashSync("password123", 10);
console.log(password);