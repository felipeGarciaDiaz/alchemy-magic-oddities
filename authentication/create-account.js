let createPlayerAccount = async (req, res, next, crypto, bcrypt, players) => {
    try {
       let id = crypto.randomBytes(8).toString('hex');
        console.log(req.body.email, req.body.username);
         const hashPassword = await bcrypt.hash(req.body.password, 10);


        let wins = 0;
        const newPlayer = await players
            .create({
                username: req.body.username,
                email: req.body.email,
                password: hashPassword,
                wins: wins,
                id: id,
            })
            .then((newPlayer) => {
                console.log('new player was created and placed into amwt database table players:', newPlayer);
                return { success: true, player: newPlayer}

            })
            .catch((err) => {
                console.log('error on /save-user, player was not created and placed into amwt database table players:', err);
                return {success: false, error: err}
            });
        } catch (err) {
            console.log(err);
    }
}
module.exports = createPlayerAccount;