const express = require("express");
const router = express.Router();

const roomModel = require("../models/room");

router.get('/getallrooms', async (req, res) => {
    try {
      const rooms = await roomModel.find({});
      res.status(200).json(rooms);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


  router.post("/getroomsbyid", async (req, res) => {
    const roomid = req.body.roomid;
  
    try {
      const room = await roomModel.findOne({ _id: roomid });
      if (!room) throw new Error("Room not found");
      res.json({ room });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


module.exports = router;
