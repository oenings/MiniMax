# MiniMax

Tic-Tac-Toe gegen eine KI, die mit dem **Minimax-Algorithmus** spielt (passend zu `TicTacToe.pdf`).
Die App liegt in `app/` und ist eine *Progressive Web App*: Sie lässt sich auf Android und iPhone
wie eine normale App auf dem Startbildschirm installieren und läuft danach auch offline.

## Funktionen

- Spiel gegen die KI (Leicht / Mittel / Unbesiegbar) oder zu zweit auf einem Handy
- Auswahl, wer anfängt
- Optional: Minimax-Bewertung jedes freien Feldes anzeigen (+ = Gewinn, 0 = Remis, − = Verlust)
- Statistik über Siege, Remis und Niederlagen

## Aufs Handy bringen

1. Auf GitHub unter **Settings → Pages → Build and deployment → Source** „GitHub Actions“ wählen.
2. Den Code nach `main` mergen. Der Workflow `.github/workflows/pages.yml` testet und veröffentlicht
   die App unter `https://<benutzer>.github.io/MiniMax/`.
3. Die Adresse auf dem Handy öffnen:
   - **Android (Chrome):** auf „📲 App installieren“ tippen oder Menü ⋮ → „App installieren“.
   - **iPhone (Safari):** Teilen-Symbol → „Zum Home-Bildschirm“.

## Lokal ausprobieren

```sh
cd app && python3 -m http.server 8000   # dann http://localhost:8000 öffnen
node app/test.js                        # Tests der Minimax-Logik
python3 app/make_icons.py               # Icons neu erzeugen (benötigt Pillow)
```
