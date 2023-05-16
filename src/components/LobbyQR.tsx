import QRCode from "react-qr-code";
import styles from "@/styles/LobbyQR.module.css"

const LobbyQR = () => {
  let thisPageUrl = "";
  if (typeof window !== "undefined") {
    thisPageUrl = window.location.href;
  }
  return <QRCode className={styles.qr} value={thisPageUrl ? thisPageUrl : "/" } style={{ background: 'white', padding: '16px' }}/>;
};

export default LobbyQR;
