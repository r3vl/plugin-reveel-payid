import { Route } from "@elizaos/core";
import { PayIDService } from "./apiClient";
// import { fbAuth } from "./firebase";
// import { signInWithEmailLink } from "firebase/auth";

export const signInCallback: Route = ({
    type: 'GET',
    path: '/auth',
    handler: async (req, res, runtime) => {
        console.log("SIGN_IN_CALLBACK:::", req)

        // await signInWithEmailLink(fbAuth, "", req.url)

        runtime.emitEvent("SIGNIN_WITH_FB_SUCCESS", {})

        res.status(200).json({ message: 'success' })
    }
})

export const getTxHistoryCSV: Route = ({
    type: 'GET',
    path: '/tx-history',
    handler: async (req, res, runtime) => {
        const s = new PayIDService(runtime);

        const { activities } = await s.getTransactionHistory();

        let content = Object.keys(activities[0]).join(",") + "\n"

        activities.forEach((activity) => {
            content += Object.values(activity).map((v) => {
                if (typeof v === "string") return v
                return ""
            }).join(",") + "\n"
        })

        res.send(content)
    }
})
