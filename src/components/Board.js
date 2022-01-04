import React,{useState,useEffect} from 'react';
import CreateBoard from './CreateBoard';
import { revealed } from './Reveal';
import Cell from './Cell';
import '../App.css';

/*Install react-toastify from: 
https://fkhadra.github.io/react-toastify/introduction/ */
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Import button icons.
import info from '../images/info.svg';
import restart from '../images/restart.svg';

//Function to create the game board.
function Board() {
    const [grid,setGrid]=useState([]);
    const [nonMinecount,setNonMinecount]=useState(0);
    const [mineLocation,setmineLocation]=useState([]);
    const style={
        display: 'flex',
        flexDirection: 'row',
        width: 'fit-content',
        color: 'white',
    }
    useEffect(()=>{
        freshBoard();
    },[]);

    /*Making a fresh board at the start of the game.
    Also use call this function on restart button click. */
    const freshBoard = () => {
        const newBoard=CreateBoard(10,10,20);
        setNonMinecount(10*10-20);
        setmineLocation(newBoard.mineLocation);
        setGrid(newBoard.board);
    }

    //Add the flagged state to the cell on right-click.
    const updateFlag=(e,x,y)=>{
        e.preventDefault();
        let newGrid=JSON.parse(JSON.stringify(grid));
        newGrid[x][y].flagged=true;
        console.log(newGrid[x][y]);
        setGrid(newGrid);
    }

    //Function checks whether a mine or non-mine cell was clicked on.
    const revealCell=(x,y)=>{
        let newGrid=JSON.parse(JSON.stringify(grid));
        if(newGrid[x][y].value==="X"){
            toast('You clicked on a mine. Game Over!', 
            { 
                position: "top-center", 
                autoClose: 3000, 
                hideProgressBar: true, 
                closeOnClick: true, pauseOnHover: true, 
                draggable: true, 
                progress: undefined, 
            });
            for(let i=0;i<mineLocation.length;i++){
                newGrid[mineLocation[i][0]][mineLocation[i][1]].revealed=true;
            }
        }
        if(nonMinecount===0){
            toast.success('Wohoo!!,You won',
            { 
                position: "top-center", 
                autoClose: 3000, 
                hideProgressBar: true, 
                closeOnClick: true, 
                pauseOnHover: true, 
                draggable: true, 
                progress: undefined, 
            });
            //Load a fresh game board when game is won.
            setTimeout(freshBoard,500);
        }
        else{
            let revealedboard=revealed(newGrid,x,y,nonMinecount);
            setGrid(revealedboard.arr);
            setNonMinecount(revealedboard.newNonMines);
        }
    }

    //Instructions toast called by 'how to play' button.
    const instructionToast = () => {
        toast(<div>How to play Minesweeper:<br />
        1. Start by clicking on any cell.<br />
        2. The number relates to the mines adjacent to the block.<br />
        3. If you think you know where a mine is, place a flag by right-clicking on the cell.<br />
        4. Avoid all the mines to win the game!</div>,
        {   position: "top-center", 
            autoClose: false, 
            closeOnClick: true, 
            draggable: true, 
            progress: undefined, 
            color: '#F2E7FE'}
        );
    }

    return (
      <div>
        <ToastContainer></ToastContainer>
        <div className='buttonsContainer'>
          <button className='button' style={{marginRight: "12px"}} onClick={instructionToast}><img src={info} alt='info'/>
            How to play
          </button>
          <button className='button' style={{marginLeft: "12px"}} onClick={freshBoard}><img src={restart} alt='info'/>
            Restart game
          </button>
        </div>
        {grid.map((singlerow,index1)=>{
            return (
              <div style={style} key={index1}>
                  {singlerow.map((singlecol,index2)=>{
                    return <Cell details={singlecol} key={index2} updateFlag={updateFlag} revealCell={revealCell}/>
                  })}
              </div>
            )
        })}
      </div> 
    )
}

export default Board;