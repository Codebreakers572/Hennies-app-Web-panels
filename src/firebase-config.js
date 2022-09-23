import  {initializeApp} from 'firebase/app';
import  {getAuth}  from "firebase/auth";

  const firebaseConfig = {
    // apiKey: "AIzaSyDStqOEiBnegM52YTXsuAv_axt41FUsjfQ",
    // authDomain: "hennies-web.firebaseapp.com",
    // projectId: "hennies-web",
    // storageBucket: "hennies-web.appspot.com",
    // messagingSenderId: "848824082350",
    // appId: "1:848824082350:web:f237dd726d873906ffb23f",
    // measurementId: "G-1JVTNSV77D"

    apiKey: "AIzaSyDksgKpiI2wplaJWUjj3mxQTODx-ryKKno",
  authDomain: "cannabis-website-bc9c4.firebaseapp.com",
  projectId: "cannabis-website-bc9c4",
  storageBucket: "cannabis-website-bc9c4.appspot.com",
  messagingSenderId: "123674224795",
  appId: "1:123674224795:web:552705f3962b81d5a6fe3e",
  measurementId: "G-DTMVKEJ9X3"
  }

const app = initializeApp(firebaseConfig)

export const authentication = getAuth(app);