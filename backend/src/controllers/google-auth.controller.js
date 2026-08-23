export const googleCallback = async (req, res) => {
    try {
        const token = req.user.generateJWT();

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
        });

        res.redirect("http://localhost:3000");
    } catch (error) {
        console.error("Google authentication error:", error);

        res.redirect("http://localhost:3000/login");
    }
};