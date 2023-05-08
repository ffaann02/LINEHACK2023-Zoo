import liff from "@line/liff/dist/lib";
import "./App.css"
import React, { useState ,useEffect,createContext} from "react";
import serviceAccount from "./serviceAccountKey.json"
function App() {

  const [decoded,setDecoded] = useState("");
  const [userId,setUserId] = useState("");

  const initializeLiff = async () => {
    try {
      await liff.init({ liffId: process.env.liffId });
      // LIFF SDK methods
      if (liff.isLoggedIn()) {
        const profile = await liff.getProfile();
        console.log(profile);
        setUserId(profile.userId);
      }
    } catch (error) {
      console.error("Error initializing LIFF SDK:", error.message);
    }
  };
  async function scanQrCode(){
    const result = await liff.scanCodeV2();
    return result.value;
  }

  const handleScanQrCode = async () => {
    const value = await scanQrCode();
    setDecoded(value);
    const userId = userId; // Replace with your user ID
    // await db.collection("member").doc(userId).update({
    //   currentAnimal: value,
    // });
    window.liff.closeWindow();
  }

  useEffect(() => {
    initializeLiff();
  }, []);

  return (
    <div className="w-full h-screen relative">
      <div className="top-[45%] left-[28.5%] absolute">
        <button className="bg-[#5dc55b] py-4 rounded-lg border-[2px] text-xl font-bold px-4 text-white" onClick={handleScanQrCode}>
        อ่าน QR CODE
        </button>
        <p className="">{decoded!=="" ?`คุณกำลังจะเช็คอิน: ${decoded}`: ""} </p>
      </div>
    </div>
  );
}

export default App;
