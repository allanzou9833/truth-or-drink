import sys
import json

files = {
  "On-the-rocks.txt": "otr-",
  "Happy-hour.txt": "hh-",
  "Extra-dirty.txt": "ed-",
  "Last-call.txt": "lc-"
}

outputfile = {
  "On-the-rocks.txt": "On-the-rocks.json",
  "Happy-hour.txt": "Happy-hour.json",
  "Extra-dirty.txt": "Extra-dirty.json",
  "Last-call.txt": "Last-call.json"
}
filename = sys.argv[1]
cardCounter = 1
# deck = []
deck = {}
with open(filename, 'r') as f:
  lines = f.readlines();
  i = 0

  while i < len(lines):
    line = lines[i].strip()
    if len(line) > 0:
      id = files[filename] + str(cardCounter)
      x = {
        'id': id,
        'questions': []
      }
      x['questions'].append(line.strip('\n').replace('--', '—'))
      i += 1
      line = lines[i].strip()
      if len(line) > 0:
        x['questions'].append(line.strip('\n').replace('--', '—'))
      # deck.append(x)
      deck[id] = x
      cardCounter += 1
    i += 1

fileString = 'server/decks/'+ outputfile[filename]
with open(fileString, "w") as outfile:
  json.dump(deck, outfile)
