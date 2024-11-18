// Get references to the game elements
const boxes = document.querySelectorAll('.box');
const restartButton = document.querySelector('button');
let currentPlayer = 'X';  // X always goes first
let gameActive = true;
let board = ['', '', '', '', '', '', '', '', ''];  // Track the state of the board

// Function to handle a box click
function handleBoxClick(event) {
  const index = event.target.id - 1;  // Convert box ID to an index (0-8)
  
  // If the box is already filled or the game is not active, do nothing
  if (board[index] !== '' || !gameActive) return;
  
  // Set the box's content to the current player's symbol
  board[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  // Check for a winner after the move
  if (checkWinner()) {
    gameActive = false;
    alert(`${currentPlayer} wins!`);
  } else if (board.every(cell => cell !== '')) {
    // If the board is full and there's no winner, it's a draw
    gameActive = false;
    alert("It's a draw!");
  } else {
    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

// Function to check if there's a winner
function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Vertical
    [0, 4, 8], [2, 4, 6]               // Diagonal
  ];
  
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

// Function to reset the game
function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];  // Reset board
  gameActive = true;
  currentPlayer = 'X';  // X always starts
  boxes.forEach(box => box.textContent = '');  // Clear the boxes
}

// Add event listeners to the boxes
boxes.forEach(box => box.addEventListener('click', handleBoxClick));

// Add event listener to the restart button
restartButton.addEventListener('click', restartGame);
