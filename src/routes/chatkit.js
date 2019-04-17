import express from 'express';

const router = express.Router();

router.get('/rooms', function(req, res) {
  req.chatkit.getRooms({})
    .then(rooms => res.send(rooms))
    .catch(error => res.send(error));
});

export default router;
