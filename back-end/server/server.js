const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { Pool } = require("pg");
const { retrieveSystemInfo } = require("../systemInfo/basicInfo");
require("dotenv").config({ path: "../.env" });

const app = express();
const port = 4001;

const cookieParser = require("cookie-parser");

console.log(`JWT: ${process.env.JWT_SECRET}`);

// PostgreSQL connection setup
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(express.json()); // Automatically parse incoming request bodies as JSON

const corsOptions = {
  origin: "http://localhost:3000", // Allow only this origin
  credentials: true, // Allow cookies and other credentials
  methods: ["GET", "POST", "PUT", "OPTIONS"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(passport.initialize());

passport.use(
  new LocalStrategy(
    { usernameField: "usernameOrEmail" },
    async (usernameOrEmail, password, done) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
      let query, params;

      try {
        if (emailRegex.test(usernameOrEmail)) {
          query = "SELECT * FROM users WHERE email = $1";
          params = [usernameOrEmail];
        } else {
          query = "SELECT * FROM users WHERE username = $1";
          params = [usernameOrEmail];
        }

        const result = await pool.query(query, params);

        if (result.rows.length === 0) {
          return done(null, false, {
            message: "No user with that email or username exists!",
          });
        }

        const user = result.rows[0];

        const matchingPassword = await bcrypt.compare(password, user.password);

        if (!matchingPassword) {
          return done(null, false, { message: "Incorrect password" });
        }

        return done(null, user);
      } catch (error) {
        return done(error, false, {
          message: "An error occurred while processing your request",
        });
      }
    }
  )
);

const generateJWT = user => {
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email
  };

  const jwtSecret = process.env.JWT_SECRET;
  const options = {
    expiresIn: "1h", 
  };

  return jwt.sign(payload, jwtSecret, options);
}

const authenticateJWT = (req, res, next) => {
  const token = req.cookies.authTokenCookie;
  const jwtSecret = process.env.JWT_SECRET;

  if (token) {
    jwt.verify(token, jwtSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);  
      }
      req.user = user;  // Attach user info to the request
      next();  // Move to the next middleware
    });
  } else {
    res.sendStatus(401);  // Unauthorized if no token is provided
  }
};

app.get("/", (req, res) => {
  res.send("Hello from back-end");
});

app.get("/get-system-info", async (req, res) => {
  try {
    const systemInfo = await retrieveSystemInfo();
    if (systemInfo) {
      res.json(systemInfo);
    } else {
      res.status(404).json({ error: "System information not found" });
    }
  } catch (error) {
    console.error("Error fetching system info:", error);
    res.status(500).json({ error: "Failed to retrieve system information" });
  }
});

app.post("/sign-up", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const databaseLookUpEmail = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (databaseLookUpEmail.rows.length > 0) {
      return res
        .status(400)
        .send(
          "This email is associated with an account, please use a different email!"
        );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );

    return res
      .status(201)
      .send({ message: "User created successfully!", user: newUser.rows[0] });
  } catch (error) {
    console.error("Error during sign-up:", error);
    return res
      .status(500)
      .send(
        `An error occurred while processing your request: ${error.message}`
      );
  }
});

app.post("/log-in",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    const token = generateJWT(req.user);

    res.cookie("authTokenCookie", token, {
      httpOnly: true,  // Prevent access from JavaScript
      secure: false,   // Use true in production (HTTPS)
      maxAge: 3600000, // Expire in 1 hour
      sameSite: "Strict", // CSRF protection
    });

    res.json({
      message: "Login successful!",
      token: token  
    });
  }
);

app.get("/retrieve-profile", authenticateJWT, (req, res) => {
  res.json({ user: req.user });  // Send the user data from JWT
})

app.put('/update-profile', authenticateJWT, async (req, res) => {
  const { username, email } = req.body; 
  if (!username || !email) {
    return res.status(400).json({ message: "Username and email are required" });
  }

  try {
    const userId = req.user.id;
    const result = await pool.query(
      'UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING id, username, email',
      [username, email, userId]
    );

    if (result.rows.length > 0) {
      res.json({ user: result.rows[0] });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Error updating profile data" });
  }
});





app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
