import { Lobby } from "../../../types"

// start by mocking createLobby

export const createLobby = async (playerName: string): Promise<Lobby> => {
  return {
    "code": "TUR4",
    "phase": "suggesting",
    "artUrl": null,
    "prompts": [
      "The curious",
      {
        "text": "",
        "type": "adjective",
        "status": "open",
        "claimed_by": {
          "id": "",
          "name": "",
          "color": ""
        }
      },
      {
        "text": "",
        "type": "noun",
        "status": "open",
        "claimed_by": {
          "id": "",
          "name": "",
          "color": ""
        }
      },
      "peered out of the",
      {
        "text": "",
        "type": "noun",
        "status": "open",
        "claimed_by": {
          "id": "",
          "name": "",
          "color": ""
        }
      },
      "with a",
      {
        "text": "",
        "type": "adjective",
        "status": "open",
        "claimed_by": {
          "id": "",
          "name": "",
          "color": ""
        }
      },
      "expression, looking out at the",
      {
        "text": "",
        "type": "adjective",
        "status": "open",
        "claimed_by": {
          "id": "",
          "name": "",
          "color": ""
        }
      },
      {
        "text": "",
        "type": "noun",
        "status": "claimed",
        "claimed_by": {
          "id": 16,
          "name": "Pal",
          "color": "mint"
        }
      },
      "below.",
      {
        "text": "",
        "type": "style",
        "status": "claimed",
        "claimed_by": {
          "id": "5",
          "name": "Matt",
          "color": "yellow"
        }
      },
      "illustration."
    ]
  }
}

// See if that fixes StartForm

// if so, mock updateLobby too