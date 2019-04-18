import express from 'express';

const router = express.Router();

function parseMessages(messages) {
  return messages.reduce((parsedMessages, message) => {
    parsedMessages.push(changeMessageStructure(message));
    return parsedMessages;
  }, []);
}

function changeMessageStructure(message) {
  const { id, user_id } = message;
  const { text, url, type } = JSON.parse(message.parts[0].content);
  return {
    id: id.toString(),
    sender: user_id,
    text,
    url,
    type
  };
}

router.get('/rooms', (req, res) => {
  req.chatkit.getRooms({})
    .then(rooms => res.send(rooms))
    .catch(error => res.send(error));
});

router.get('/messages/:roomId', (req, res) => {
  req.chatkit.fetchMultipartMessages({
    roomId: req.params.roomId,
    direction: 'newer'
  })
    .then(messages => res.send(parseMessages(messages)))
    .catch(error => res.send(error));
});

router.post('/messages/send/:roomId', (req, res) => {
  const { userId, roomId, parts } = req.body;

  req.chatkit.sendMultipartMessage({
    userId,
    roomId,
    parts
  })
    .then(messageId => res.send(messageId))
    .catch(error => res.send(error));
});

// FOR DEVELOPMENT AND TESTING ONLY

router.get('/rooms/create/music', (req, res) => {
  req.chatkit.createRoom({
    creatorId: 'Ed',
    name: 'music',
    customData: {
      type: 'music',
      faIcon: 'music'
    }
  })
    .then(room => res.send(room))
    .catch(error => res.send(error));
});

export default router;
