import React from "react";
import global from "../../../../style/global.module.scss";


export const Wrapper: React.FC = ({children}) => {

   return <div className={global.container}>
      <div className={global.pack}>
         {children}
      </div>
   </div>
}
