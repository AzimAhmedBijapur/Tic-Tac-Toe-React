import { useState } from "react";
import Square from "./Square";

export default function Board(){

    const [squares, setSquares] = useState(Array(9).fill(null));
    const [chance, setChance] = useState(0);
    const [win, setWin] = useState(null);

    function evaluateWinner(squares){

        const rows = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        for(let i=0;i<rows.length;i++){
            const [a,b,c] = rows[i];

            if(squares[a] && squares[a]===squares[b] && squares[b] === squares[c]){
                return squares[a];
            }
        }

        return null;
          
    }

    function handleClick(i){

        if(squares[i] || evaluateWinner(squares)){
            return;
        }

        const nextsquares = squares.slice();

        if(chance == 0){
            nextsquares[i] = 'X';
            setChance(1);
        }
        else{
            nextsquares[i] = 'O';
            setChance(0);
        }

        if(evaluateWinner(nextsquares)){
            if(chance==0){
                setWin("X wins!");
            }
            else{
                setWin("O wins!");
            }
        }

        setSquares(nextsquares);
    }

    function restart(){
        const newsquares = Array(9).fill(null);
        setSquares(newsquares);
    }

    return (
        <>
            <div className="winning-statement">{win}</div>
            <div className="board">
                <div className="row">
                    <Square value={squares[0]} onSquareClick={()=>handleClick(0)}/>
                    <Square value={squares[1]} onSquareClick={()=>handleClick(1)}/>
                    <Square value={squares[2]} onSquareClick={()=>handleClick(2)}/>
                </div>
                <div className="row">
                    <Square value={squares[3]} onSquareClick={()=>handleClick(3)}/>
                    <Square value={squares[4]} onSquareClick={()=>handleClick(4)}/>
                    <Square value={squares[5]} onSquareClick={()=>handleClick(5)}/>
                </div>
                <div className="row">
                    <Square value={squares[6]} onSquareClick={()=>handleClick(6)}/>
                    <Square value={squares[7]} onSquareClick={()=>handleClick(7)}/>
                    <Square value={squares[8]} onSquareClick={()=>handleClick(8)}/>
                </div>
            </div>
            <div>
                <button id="restart" onClick={restart}>Restart</button>
            </div>
        </>
        
    )
}