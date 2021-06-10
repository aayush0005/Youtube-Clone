const express = require("express");

const errorResponse = require("../utils/error");
const { generateToken } = require("../utils/jwt");
const config = require("../config");

const router = express.Router();

router.get(
  "/",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

router.get(
  "/redirect",
  passport.authenticate("google", { failWithError: true, session: false }),
  function (req, res) {
    const user = req.user;

    try {
      //Generate our own token from our google user
      const token = generateToken({
        id: user._id.toHexString(),
        secret: config.JWT_SECRET,
        errorMessage: null,
      });
      //Send credential cookies
      res
        .cookie("jwt_auth", token, {
          httpOnly: true,
          sameSite: true,
          secure: config.NODE_ENV === "production",
        })
        .redirect(config.CLIENT_URL);
    } catch (err) {
      errorResponse(err, res);
    }
  },
  function (err, req, res) {
    errorResponse(err, res);
  }
);
router.get("/logout", (req, res) => {
  req.logout();
  res.clearCookie("jwt_auth").json({ message: "success" });
});

module.exports = router;
