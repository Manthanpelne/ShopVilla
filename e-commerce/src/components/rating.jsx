import React from 'react'
import { AiFillStar , AiOutlineStar} from "react-icons/ai";

export default function Rating({rating, onClick,style}) {

  return (
    <div>
        {[...Array(5)].map((_,i)=>{
 return <span key={i} onClick={()=>onClick(i)} style={style}>
    {rating> i?(
        <AiFillStar fontSize="15px"/>
    ):(
        <AiOutlineStar fontSize="15px"/>
    )}
</span>
        })}
    </div>
  )
}
