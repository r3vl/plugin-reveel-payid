import admin from 'firebase-admin';
// import * as auth from "firebase/auth"

const firebaseConfig = {
    type: "service_account",
    projectId: "ui-v2-66a48",
    privateKeyId: "cdb3bc0717c94a8060917fcd149ac16006bd1a7e",
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDB4omKL6IjZFFh\neDbtTs3xgmO7SK2ChXSn8o3hxG3pAYEUgypbs0dKxHFT2ceXgb4nUq/CH9sscCXn\nAj8jvm85zqr2WSfxqRTdZKLfQlenMJJSF9gDpwboH4LqU/hTkAd36OgP50/qORm6\nVzVK38AHL4C5l2gmrvehXN9AQqhqaKpDoiZRp799nAx1uLCW/RLDBee0RoRAn8OC\npptpm47n/CX9nX3MIBhn4XhNy/J0RUcTg6JJPfDrL55YL7bb+kIogXWA5VRyBfRO\njhV/BpHpAvsEZPj+trKqDvlVBQ74RBdFtj1BniER9+PTWQW6xGIzfNTGF//qPrjO\nz9hKLMcrAgMBAAECggEABVLakvRG3/DnuSTrYS26QujhIynWNdDDSL9EvQ+/Mtgr\nOqx1U8pC6V8me3Zt4A+ccIj5MXvdcUVtDQBHSox2kmBF2njNO3n4jDGwtS+lp34S\nbnWgJU2HR4Vh+1wt4+F/CwBWquUfkR9bQP4XBQTKyYe44Z+yKOnB++jIaoPKCw3j\nakkD+yX1rywEB7Bq3DjFNk7lh+IePJqr44ucKtaNjTMVTxD2paW3sibuY0V+Yb1N\n6eLZP8opN+uATsnYTB1IzxZMbmeyX1cG6ojOYCw9K44ua6EO32CQ/0KGlwoAqLJq\nXpH8O3Up9rodq6bniWONiO3uBOPuk9oUzbABG0kQ/QKBgQDrKWwrx+B0ApQ+6N5X\nZ+74ksPK+wG9VPT8dRIe2yuRHD0/ZbNlg7Idsq8oxStfJ/vVNGgUzZxd6l9LzSwz\nG5doOytRsAlh/IAAfpYxCZudy6kzQP9IsGOV6duaVaULgqQ39QDKg1z2FZlHuRNT\nxDDyWF5AtqQ/+ucd0V0ahnaczQKBgQDTEMKjPMCPrSY33JkdRZXCHgiE4/9D3arZ\nhCfEsMMouRcaEiZP9m9aZbmqxAnTx9CSWenQHOXJnsOg9YvKCNtbnfBrjtTdnM1C\nndxOclfFRMdBEYCBOf1q4I/c0Z/ulvlqqaSeSIw43zHP2QjZ99fyYjO2KFrbxyFz\n5qR9tJtz1wKBgD30Uc1PAXFO5KOWUk2Q0kKm1/J4IsMwyMJiTX3XnCjE2dYEAzlx\nctGkK8V//Kc7L3vCLNGeQd30S1r7GPP2BvOs8wK4cCBil46JyyPsNhVifJdGPnt2\nDSaH0BVfDvZzWrRrVeQEq88hbZqZxd/BxmtyoJJIDAnXHmCasf61AjbZAoGAFJRP\nxgbIZ7nkPhIeQ8JjJbgz8HEilIVqgSbnkcACZ1gUrpASeD15AgFlJwdSRfn3li16\nJLaMmSoHvQv0A1D1wmsV5AbbLnh5cwNdVbDEahGYs/l25CK5WNBodolh5KuHyiSc\nTmqYcXshqjhpKoeF4LY+gIZSxZcW5ewZIcCYX6UCgYEA07Lk2wR7uas0OOsPIhMI\nRNhdU2m36KvSwcIh+Dhe/5+aXvl+s5RluRyX5qEgeJhvE74V/dNp+E6/kwnWrjJX\nKjEkkTvHLuTBiG4x9r8ebClkUscltAgkKG6VKs0Dvqk9Ejq3afrcHBlxJsGuvJut\nGUEKezG0FL2O6IV6PKtxkbA=\n-----END PRIVATE KEY-----\n",
    client_email: "sa-pay-id@ui-v2-66a48.iam.gserviceaccount.com",
    clientId: "109010197359788815301",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/sa-pay-id%40ui-v2-66a48.iam.gserviceaccount.com",
    universe_domain: "googleapis.com"
};

export const initFirebase = () => admin.apps.length === 0 && admin.initializeApp({ credential: admin.credential.cert(firebaseConfig) });

export const firebase = admin;
// export const fbAuth = auth.getAuth();
