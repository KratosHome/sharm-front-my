import "./GoogleBlock.scss";
import { GoogleIcon } from "@/components/svg/GoogleIcon";

const GoogleBlock = () => {
    return (
       <>
        <div className="lineWrapper">
          <p className="spanLine"></p>
          <p className="text">Або</p>
          <p className="spanLine"></p>
        </div>        
          <button className="btn" type="button">
            <GoogleIcon />
            Google
          </button>
       </> 
    )
};

export default GoogleBlock;