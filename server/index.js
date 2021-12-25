import express from "express";
import cors from "cors";
import { OAuth2Client } from "google-auth-library";
import googleOAuth from "./oauth2_cred.js";

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000"
}))

const PORT = process.env.PORT||8000;

const client = new OAuth2Client(googleOAuth.web.client_id);

app.get("/", (req, res)=>{
    res.send("Hello World");
});

app.post("/auth/google", async (req, res)=>{
  try {
    console.log(req.body);
    const {token} = req.body;
    const userDetails = await client.verifyIdToken({idToken: token, audience: googleOAuth.web.client_id});
    console.log(userDetails);
    res.json("done");
  }catch(err){
    res.send("Error while email verification");
  }
})

app.listen(PORT, ()=>console.log("Server up on "+PORT));