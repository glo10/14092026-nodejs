class Encryption {
  constructor(bcrypt, jwt, secret) {
    this.bcrypt = bcrypt;
    this.jwt = jwt;
    this.secret = secret;
  }

  hash(plainPassword, saltRound = 10) {
    return this.bcrypt
      .hash(plainPassword, saltRound)
      .then((passwordHash) => passwordHash)
      .catch(() => {
        throw new Error("Impossible to hash password");
      });
  }

  comparePassword(plain, hash) {
    return new Promise((resolve, reject) => {
      return this.bcrypt.compare(plain, hash, (error, res) => {
        if (!error && res) resolve({ ok: res });
        reject("Email or password incorrect");
      });
    });
  }

  generateToken(user, duration = "2h") {
    return this.jwt.sign(
      {
        email: user.email,
      },
      this.secret,
      {
        expiresIn: duration,
      },
    );
  }
}
module.exports = Encryption;
