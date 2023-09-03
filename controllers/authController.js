const jwt = require('jsonwebtoken');
const { User } = require('../models'); 

exports.login = async (req, res) => {
    try {
      const { idLogin } = req.body;

      if ((!idLogin))
       return res.status(401).json({msg:'ID Login cannot be empty!'})

      const user = await User.findOne({
        where: { idLogin },
      });
      if (!user) return res.status(401).json({ msg: 'ID Login not found' });
  
      
      if (idLogin !== user.idLogin){
        return res.status(401).json({ auth: false, msg: "ID doesn't match" });
        }

      jwt.sign(
          { id: user.id },
          "secret",
          (err, token) => {
            res.status(200).json({ auth: true, status: 'authorized', token });
          }
        );
  
    } catch (error) {
      res.send(error.message)
    }
  };

  
  exports.register = async (req, res) => {
    try {
      const { name, email, address, idLogin } = req.body;
  
      if (!name || !email || !address || !idLogin) {
        return res.status(400).json({
          msg: 'Semua kolom (name, email, address, idLogin) harus diisi.',
        });
      }
  
      const user = await User.create({
        name,
        email,
        address,
        idLogin, 
      });
  
      res.status(200).json({
        message: 'Berhasil membuat data user',
        data: user,
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };
