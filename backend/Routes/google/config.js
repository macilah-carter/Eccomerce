const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../../Database/schema/user')
passport.use(
    new GoogleStrategy({
        //options for strategy
        clientID: process.env.CLIENTID,
        clientSecret:process.env.CLIENTSECRET,
        callbackURL:process.env.CALLBACK
    },
    async (accessToken, refreshToken, profile, done) => {
        //passport callback function
        try {
            let user = await User.findOne({googleID: profile.id});
            if(user){
                return done(null, user);
            }
            user = new User({
                name: profile.displayName,
                googleID: profile.id,
                email: profile.emails[0].value
            })
            await user.save()
            return done(null, user);
        } catch (error) {
            console.log(error)
            return done(null, error)
        }
        
    })
);

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    try {
        const user = await User.findById(id);
        return done(null, user)
    } catch (error) {
        console.log("Deserialize error", error.message)
        return done(null, error)
    }
});