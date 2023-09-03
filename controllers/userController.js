const { User } = require('../models');


exports.getUser = async (req, res) => {
    const { id } = req.user;

    try {
        const user = await User.findOne({
            where: { id },
            attributes: ["name", "email", "address", "id"], 
        });

        if (!user) {
            return res.status(404).json({
                status: "FAILED",
                message: "User not found"
            });
        }

        return res.json({
            status: "SUCCESS",
            data: user,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "FAILED",
            message: "Internal server error"
        });
    }
};
