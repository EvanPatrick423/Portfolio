import React, { useState, useEffect } from 'react';
import './RockPaperScissorsWidget.css';

const RockPaperScissorsWidget = () => {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [playerChoice, setPlayerChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [message, setMessage] = useState('Choose your weapon! First to 5 wins! 🎯');
  const [computerChoiceMessage, setComputerChoiceMessage] = useState('🤖 Computer is ready to play...');
  const [gameOver, setGameOver] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const choices = [
    { name: 'rock', emoji: '🪨', display: 'Rock' },
    { name: 'paper', emoji: '📄', display: 'Paper' },
    { name: 'scissors', emoji: '✂️', display: 'Scissors' }
  ];

  const getComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex].name;
  };

  const getChoiceEmoji = (choice) => {
    const choiceObj = choices.find(c => c.name === choice);
    return choiceObj ? choiceObj.emoji : '';
  };

  const getChoiceDisplay = (choice) => {
    const choiceObj = choices.find(c => c.name === choice);
    return choiceObj ? choiceObj.display : choice;
  };

  const determineWinner = (player, computer) => {
    if (player === computer) {
      return 'tie';
    }
    
    if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      return 'player';
    }
    
    return 'computer';
  };

  const getResultMessage = (player, computer, winner) => {
    if (winner === 'tie') {
      return `🤝 It's a tie! Both chose ${getChoiceDisplay(player)}`;
    }
    
    const combinations = {
      'rock-scissors': { action: 'Rock crushes scissors', emoji: '💥' },
      'paper-rock': { action: 'Paper covers rock', emoji: '🎯' },
      'scissors-paper': { action: 'Scissors cut paper', emoji: '✂️' }
    };
    
    const winningCombo = winner === 'player' ? `${player}-${computer}` : `${computer}-${player}`;
    const combo = combinations[winningCombo];
    
    if (winner === 'player') {
      return `${combo.emoji} ${combo.action}! You win! 🎉`;
    } else {
      return `${combo.emoji} ${combo.action}! You lose! 😔`;
    }
  };

  const playRound = (playerSelection) => {
    if (gameOver || isAnimating) return;
    
    setIsAnimating(true);
    setComputerChoiceMessage('🤖 Computer is thinking...');
    
    // Add a small delay for dramatic effect
    setTimeout(() => {
      const computerSelection = getComputerChoice();
      const winner = determineWinner(playerSelection, computerSelection);
      
      setPlayerChoice(playerSelection);
      setComputerChoice(computerSelection);
      setComputerChoiceMessage(`🤖 Computer chose ${getChoiceEmoji(computerSelection)} ${getChoiceDisplay(computerSelection)}`);
      
      if (winner === 'player') {
        setPlayerScore(prev => prev + 1);
      } else if (winner === 'computer') {
        setComputerScore(prev => prev + 1);
      }
      
      setMessage(getResultMessage(playerSelection, computerSelection, winner));
      setIsAnimating(false);
    }, 800);
  };

  const resetGame = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setPlayerChoice('');
    setComputerChoice('');
    setMessage('Choose your weapon! First to 5 wins! 🎯');
    setComputerChoiceMessage('🤖 Computer is ready to play...');
    setGameOver(false);
    setIsAnimating(false);
  };

  useEffect(() => {
    const totalGames = playerScore + computerScore;
    if (totalGames >= 5) {
      setGameOver(true);
      if (playerScore > computerScore) {
        setComputerChoiceMessage('🏆 VICTORY! You defeated the computer! 🎉');
        setMessage('🎊 Congratulations! You are the champion! 🎊');
      } else if (computerScore > playerScore) {
        setComputerChoiceMessage('🤖 COMPUTER WINS! Better luck next time! 💪');
        setMessage('😔 The computer got the best of you this time...');
      } else {
        setComputerChoiceMessage('🤝 It\'s a perfect tie! What are the odds?');
        setMessage('🤯 Incredible! A perfect 5-round tie!');
      }
    }
  }, [playerScore, computerScore]);

  return (
    <div className="rps-widget">
      <div className="rps-dashboard">
        <div className="game-header">
          <h2 className="game-title">🪨📄✂️ Rock Paper Scissors</h2>
          <div className="round-indicator">
            <span>Round {playerScore + computerScore + 1} of 5</span>
          </div>
        </div>

        <div className="battle-arena">
          <div className="player-side">
            <div className="choice-display">
              <div className="choice-emoji">
                {playerChoice ? getChoiceEmoji(playerChoice) : '❓'}
              </div>
              <span className="choice-label">You</span>
            </div>
          </div>
          
          <div className="vs-divider">
            <span className="vs-text">VS</span>
          </div>
          
          <div className="computer-side">
            <div className="choice-display">
              <div className={`choice-emoji ${isAnimating ? 'thinking' : ''}`}>
                {computerChoice ? getChoiceEmoji(computerChoice) : '🤖'}
              </div>
              <span className="choice-label">Computer</span>
            </div>
          </div>
        </div>
        
        <div className="score-board">
          <div className="score-item player">
            <span className="score-label">👤 You</span>
            <span className="score-value">{playerScore}</span>
          </div>
          <div className="score-divider">-</div>
          <div className="score-item computer">
            <span className="score-label">🤖 Computer</span>
            <span className="score-value">{computerScore}</span>
          </div>
        </div>
        
        <div className="rps-message">
          <p className={gameOver ? 'game-over-message' : ''}>{message}</p>
        </div>
        
        <div className="status-message">
          <p className={isAnimating ? 'thinking' : ''}>{computerChoiceMessage}</p>
        </div>
        
        <div className="rps-container">
          {choices.map((choice) => (
            <button 
              key={choice.name}
              className={`rps-btn ${playerChoice === choice.name ? 'rps-btn-on' : ''} ${isAnimating ? 'disabled' : ''}`}
              onClick={() => playRound(choice.name)}
              disabled={gameOver || isAnimating}
            >
              <span className="btn-emoji">{choice.emoji}</span>
              <span className="btn-text">{choice.display}</span>
            </button>
          ))}
        </div>
        
        {gameOver && (
          <div className="rps-reset">
            <button className="reset-btn" onClick={resetGame}>
              🔄 Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RockPaperScissorsWidget;
