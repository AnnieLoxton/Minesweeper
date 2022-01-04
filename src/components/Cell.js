import React from 'react';

//Import flag and bomb icons.
import flag from '../images/flag.svg';
import bomb from '../images/bomb.svg';

export default function Cell({details,updateFlag,revealCell}) {
 
  //Determine style of cells
  const style={
      cellStyle:{
          width:40,
          height:40,
          backgroundColor:details.revealed && details.value!==0?details.value==='X'?'#C02D2D':'#7141AC':details.revealed&&details.value===0?'#7141AC':'#220B3E',
          border:'3px solid #D7B7FD',
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          fontSize:'20px',
          cursor:'pointer',
          color:'#F2E7FE',
          fontWeight:'500'
      },
  }
  
  const click=()=>{
      
    //Call revealCell function for specific cell x and y.
    revealCell(details.x,details.y);  
  }
  
  //Right click function to 'flag' a specific cell.
  const rightclick=(e)=>{
      updateFlag(e,details.x,details.y)
  }

  //Render the cell component and reveal the cell values on click. 
  return (
    <div style={style.cellStyle} onClick={click} onContextMenu={rightclick}>
      {!details.revealed && details.flagged ? (
        <img src={flag} alt='flag'/>
      ) : details.revealed && details.value !== 0 ? (
        details.value === "X" ? (
          <img src={bomb} alt='bomb'/>
        ) : (details.value)) : ("")}
    </div>
  )
}