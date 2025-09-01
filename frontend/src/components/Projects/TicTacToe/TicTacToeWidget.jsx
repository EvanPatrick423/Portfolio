import React, { useState, useCallback, useEffect } from 'react';
import './TicTacToeWidget.css';

const TicTacToeWidget = () => {
  // Game state
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'draw'
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [moveCount, setMoveCount] = useState(0);
  const [winningLine, setWinningLine] = useState([]);
  const [gameHistory, setGameHistory] = useState([]);

  // Winning combinations
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  // Check for winner
  const checkWinner = useCallback((currentBoard) => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (currentBoard[a] && 
          currentBoard[a] === currentBoard[b] && 
          currentBoard[a] === currentBoard[c]) {
        return { winner: currentBoard[a], line: combination };
      }
    }
    return null;
  }, [winningCombinations]);

  // Check for draw
  const checkDraw = useCallback((currentBoard) => {
    return currentBoard.every(cell => cell !== null);
  }, []);

  // Handle cell click
  const handleCellClick = (index) => {
    if (board[index] || gameStatus !== 'playing') return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setMoveCount(prev => prev + 1);

    // Check for winner
    const winResult = checkWinner(newBoard);
    if (winResult) {
      setWinner(winResult.winner);
      setWinningLine(winResult.line);
      setGameStatus('won');
      setScores(prev => ({
        ...prev,
        [winResult.winner]: prev[winResult.winner] + 1
      }));
      
      // Add to game history
      setGameHistory(prev => [...prev, {
        winner: winResult.winner,
        moves: moveCount + 1,
        timestamp: new Date().toLocaleTimeString()
      }]);
      return;
    }

    // Check for draw
    if (checkDraw(newBoard)) {
      setGameStatus('draw');
      setGameHistory(prev => [...prev, {
        winner: 'Draw',
        moves: moveCount + 1,
        timestamp: new Date().toLocaleTimeString()
      }]);
      return;
    }

    // Switch player
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  // Reset game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setGameStatus('playing');
    setWinner(null);
    setMoveCount(0);
    setWinningLine([]);
  };

  // Reset scores
  const resetScores = () => {
    setScores({ X: 0, O: 0 });
    setGameHistory([]);
  };

  // Get game status message
  const getStatusMessage = () => {
    if (gameStatus === 'won') {
      return `🎉 Player ${winner} Wins!`;
    } else if (gameStatus === 'draw') {
      return `🤝 It's a Draw!`;
    } else {
      return `🎯 Player ${currentPlayer}'s Turn`;
    }
  };

  // Get cell class names
  const getCellClassName = (index) => {
    let className = 'game-cell';
    
    if (board[index]) {
      className += ` filled ${board[index].toLowerCase()}`;
    }
    
    if (winningLine.includes(index)) {
      className += ' winning';
    }
    
    if (gameStatus === 'playing' && !board[index]) {
      className += ' playable';
    }
    
    return className;
  };

  // Get player symbol with styling
  const getPlayerSymbol = (value) => {
    if (value === 'X') return '✕';
    if (value === 'O') return '◯';
    return '';
  };

  return (
    <div className="tictactoe-widget">
      <div className="game-header">
        <div className="title-section">
          <h2 className="game-title">🎮 Tic Tac Toe</h2>
          <p className="game-subtitle">Classic strategy game for two players</p>
        </div>
        
        <div className="game-info">
          <div className="status-display">
            <div className="current-status">
              <span className="status-text">{getStatusMessage()}</span>
            </div>
            <div className="move-counter">
              <span className="move-text">Move: {moveCount}/9</span>
            </div>
          </div>
          
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(moveCount / 9) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="game-content">
        <div className="game-board-section">
          <div className="board-container">
            <div className="game-board">
              {board.map((cell, index) => (
                <button
                  key={index}
                  className={getCellClassName(index)}
                  onClick={() => handleCellClick(index)}
                  disabled={gameStatus !== 'playing' || cell !== null}
                >
                  <span className="cell-content">
                    {getPlayerSymbol(cell)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="game-sidebar">
          <div className="scoreboard">
            <h3 className="section-title">🏆 Scoreboard</h3>
            <div className="score-items">
              <div className={`score-item player-x ${currentPlayer === 'X' ? 'active' : ''}`}>
                <div className="player-symbol">✕</div>
                <div className="player-info">
                  <span className="player-name">Player X</span>
                  <span className="player-score">{scores.X}</span>
                </div>
              </div>
              
              <div className="vs-divider">VS</div>
              
              <div className={`score-item player-o ${currentPlayer === 'O' ? 'active' : ''}`}>
                <div className="player-symbol">◯</div>
                <div className="player-info">
                  <span className="player-name">Player O</span>
                  <span className="player-score">{scores.O}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="game-controls">
            <h3 className="section-title">🎮 Controls</h3>
            <div className="control-buttons">
              <button 
                className="control-btn new-game-btn"
                onClick={resetGame}
              >
                <span className="btn-icon">🔄</span>
                <span className="btn-text">New Game</span>
              </button>
              
              <button 
                className="control-btn reset-scores-btn"
                onClick={resetScores}
              >
                <span className="btn-icon">🗑️</span>
                <span className="btn-text">Reset Scores</span>
              </button>
            </div>
          </div>

          <div className="game-stats">
            <h3 className="section-title">📊 Game Stats</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-label">Total Games</span>
                <span className="stat-value">{gameHistory.length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">X Wins</span>
                <span className="stat-value">{scores.X}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">O Wins</span>
                <span className="stat-value">{scores.O}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Draws</span>
                <span className="stat-value">
                  {gameHistory.filter(game => game.winner === 'Draw').length}
                </span>
              </div>
            </div>
          </div>

          {gameHistory.length > 0 && (
            <div className="game-history">
              <h3 className="section-title">📝 Recent Games</h3>
              <div className="history-list">
                {gameHistory.slice(-3).reverse().map((game, index) => (
                  <div key={index} className="history-item">
                    <div className="history-winner">
                      {game.winner === 'Draw' ? '🤝' : `${getPlayerSymbol(game.winner)} wins`}
                    </div>
                    <div className="history-details">
                      <span>{game.moves} moves</span>
                      <span>{game.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicTacToeWidget;
