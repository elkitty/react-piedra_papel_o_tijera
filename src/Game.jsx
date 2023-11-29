import { useState, useEffect } from "react";

const options = [
  { id: 0, name: "Piedra", emoji: "👊🏻", beats: [2] },
  { id: 1, name: "Papel", emoji: "✋🏻", beats: [0] },
  { id: 2, name: "Tijera", emoji: "✌🏻", beats: [1] },
];

const getResult = (userChoice, computerChoice) => {
  if (userChoice === computerChoice) {
    return 0;
  }
  if (options[userChoice].beats.includes(computerChoice)) {
    return 1;
  }
  return 2;
};

function Game() {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [userMessage, setUserMessage] = useState(null);
  const [computerMessage, setComputerMessage] = useState(null);
  const [result, setResult] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (userChoice !== null) {
      setUserMessage(
        `Has elegido ${options[userChoice]?.emoji} - ${options[userChoice]?.name}`
      );
    }
  }, [userChoice]);

  useEffect(() => {
    if (computerChoice !== null) {
      setComputerMessage(
        `El ordenador ha elegido ${options[computerChoice]?.emoji} - ${options[computerChoice]?.name}`
      );
    }
  }, [computerChoice]);

  const handlePlay = (choice) => {
    setUserChoice(choice);
    setDisabled(true);
    const randomChoice = Math.floor(Math.random() * 3);

    setTimeout(() => {
      setComputerChoice(randomChoice);
    }, 1500);

    setTimeout(() => {
      setResult(getResult(choice, randomChoice));
    }, 2000);

    clearTimeout();
  };

  const reset = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setUserMessage(null);
    setComputerMessage(null);
    setResult(null);
    setDisabled(false);
    
    return {
      userChoice,
      computerChoice,
      userMessage,
      computerMessage,
      result,
      disabled,
      handlePlay,
      reset,
    };
  };






  return (
    <div className="flex items-center justify-center h-screen bg-gray-800">
      <div className="rounded-lg p-4 bg-gray-500">
        <h1 className="text-3xl mb-4 text-center font-bold">¿Piedra, Papel o Tijera?</h1>
        <div className="max-w-md mx-auto">
          {options.map((option) => (
            <button
              className="px-4 py-2 m-2 text-xl font-bold text-white bg-yellow-500 rounded-full hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
              key={option.id}
              disabled={disabled}
              onClick={() => handlePlay(option.id)}
              title={option.name}
            >
              {option.emoji}
            </button>
          ))}
          {userChoice !== null && <p className="text-xl mt-4">{userMessage}</p>}
          {computerChoice !== null && (
            <p className="text-xl mt-4">{computerMessage}</p>
          )}
          {result !== null && (
            <div className="mt-8">
              {result === 0 && <p className="text-xl mt-4">🤷🏽‍♀️ Empate</p>}
              {result === 1 && (
                <p className="text-xl mt-4">
                  ✅ Ganaste con {options[userChoice]?.name} contra{" "}
                  {options[computerChoice]?.name}
                </p>
              )}
              {result === 2 && (
                <p className="text-xl mt-4">
                  ❌ Perdiste con {options[userChoice]?.name} contra{" "}
                  {options[computerChoice]?.name}
                </p>
              )}
              <button
                className="bg-yellow-500 hover:bg-yellow-700 text-black font-semibold py-2 px-4 mt-4 border-b-4 border-yellow-700"
                onClick={reset}
              >
                ¡Volver a jugar!
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Game;
