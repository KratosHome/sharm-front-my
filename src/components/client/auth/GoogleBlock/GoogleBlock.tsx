import s from "./GoogleBlock.module.scss";
import { GoogleIcon } from "@/components/svg/GoogleIcon";

const GoogleBlock = () => {
    return (
       <>
        <div className={s.lineWrapper}>
          <p className={s.spanLine}></p>
          <p className={s.text}>Або</p>
          <p className={s.spanLine}></p>
        </div>        
          <button className={s.btn} type="button">
            <GoogleIcon />
            Google
          </button>
       </> 
    )
};

export default GoogleBlock;