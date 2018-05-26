const {OAuth2Client} = require('google-auth-library');

const auth_middleware = clientID => {
  const client = new OAuth2Client(clientID);
  async function verify(id_token) {
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: clientID,
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    return userid
  }

  return (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(403).json({ error: 'No credentials sent!' });
    }
    if (req.headers.authorization.split(' ')[0] === 'Bearer'){
      const id_token = req.headers.authorization.split(' ')[1];
      verify(id_token)
        .then(() => {
          next()
        })
        .catch(error => {
          return res.status(403).json({ error });
        });
    }
  }
}

module.exports = auth_middleware
