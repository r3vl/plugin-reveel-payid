import { Route } from "@elizaos/core";
// import { fbAuth } from "./firebase";
// import { signInWithEmailLink } from "firebase/auth";

export const signInCallback: Route = ({
    type: 'GET',
    path: '/auth',
    handler: async (req, res) => {
        console.log("SIGN_IN_CALLBACK:::", req)

        // await signInWithEmailLink(fbAuth, "", req.url)

        res.status(200).json({ message: 'success' })
    }
})
