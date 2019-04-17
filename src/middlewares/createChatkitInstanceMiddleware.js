const Chatkit = require('@pusher/chatkit-server');

function createChatkitInstanceMiddleware(req, res, next) {
  const chatkit = new Chatkit.default({
    instanceLocator: process.env.CHATKIT_INSTANCE_LOCATOR,
    key: process.env.CHATKIT_SECRET_KEY
  });

  req.chatkit = chatkit;

  next();
}

export default createChatkitInstanceMiddleware;
