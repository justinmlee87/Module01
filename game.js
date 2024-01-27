const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

//default state to null
let state = {}

//This is the function to start the game
function startGame() {
  state = {}
  showTextNode(1)
}

//This is the function to handle the different text nodes
function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}
//function to show options
function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}
//function to select options
function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

//Stores the different options giving them each individual IDs.
//Different options are displayed as text. The options displayed and available are dependent on what the users choice is.
//ex. set state for id:1 when selecting 'take the gold' is gold: true.
//Notice a set state is not necessary for choosing to leave the gold as it has not affect on the options.
//When the user makes an incorrect selection and loses the game, they are given an option to restart
const textNodes = [
  {
    id: 1,
    text: 'You wake up in the cabin of your ship and notice 10 gold pieces on your nightstand.',
    options: [
      {
        text: 'Take the gold',
        setState: { gold: true },
        nextText: 2
      },
      {
        text: 'Leave the gold',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'You exit your cabin, with gold in hand, when you stumble upon a merchant who says; "Aye matey, I have everything ye need. What will it be lad?',
    options: [
      {
        text: 'Trade the gold for a sword',
        requiredState: (currentState) => currentState.gold,
        setState: { gold: false, sword: true },
        nextText: 3
      },
      {
        text: 'Trade the gold for a pistol',
        requiredState: (currentState) => currentState.gold,
        setState: { gold: false, pistol: true },
        nextText: 3
      },
      {
        text: 'Ignore the merchant',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'After leaving the merchant, you exit to the top deck and notice your ship is docked by a, seemingly, deserted island.',
    options: [
      {
        text: 'Jump overboard to swim to the island',
        nextText: 4
      },
      {
        text: 'Find a rowboat to row ashore',
        nextText: 5
      },
      {
        text: 'Wait on the ship for further orders from the captain',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'While you are swimming you are attacked by a shark! The shark is too fast and you become its lunch...',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'While you are about to release the rowboat from the ship, you are confronted by the captain who orders your arrest due to mutiny and insubordination. You are thrown in the brig...',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'Your Captain orders you and a few other shipmates to take the rowboat and go ashore',
    options: [
      {
        text: 'Explore the island',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'While exploring the island, you and your crew are confronted by skeletons!',
    options: [
      {
        text: 'Try to run',
        nextText: 8
      },
      {
        text: 'Attack the skeletons with your sword',
        requiredState: (currentState) => currentState.sword,
        nextText: 9
      },
      {
        text: 'Fire your pistol at the skeletons',
        requiredState: (currentState) => currentState.pistol,
        nextText: 10
      },
      {
        text: 'Bribe them with the gold',
        requiredState: (currentState) => currentState.gold,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Your attempts to run are viewed as cowardly and desertion. You are thrown in the brig...',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'Though you put up a good fight, you are gravely injured in the battle as your swings at the skeletons caused no harm... As you slowly die you hear a skeleton whisper; Dead men tell no tales..',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'The single bullet from the pistol went right through the skeletons doing no damage! You are gravely injured in the fight as a skeleton whispers; Dead men tell no tales...',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'You bribe the other skeletons with the gold you found. "Aye... That be the coins we were looking for to break our curse! Ye may pass, the hidden treasure is yours. But be ye warned.... Dead men tell no tails...',
    options: [
      {
        text: 'Congratulations. Play Again.',
        nextText: -1
      }
    ]
  }
]

startGame()