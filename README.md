# 🎲 Dice Betting Game  
![image](https://github.com/user-attachments/assets/3d02bba0-c269-4d8a-91a1-77dcd062d539)

A **provably fair** dice betting game with a **clean dark-themed UI** and **verifiable fairness system**.  

---

## 🚀 Features  

### 🎨 Clean Dark-Themed UI  
- Modern dark interface with purple accents  
- Responsive design that works on all devices  

### 🎮 Game Mechanics  
- Players can enter a bet amount  
- Dice rolls from **1 to 6**  
- **Win** on 4, 5, or 6 (**2x payout**)  
- **Lose** on 1, 2, or 3 (**bet is deducted**)  

### 🔒 Provably Fair System  
- Uses **SHA-256 hashing** for verifiable fairness  
- **Server seed** (hidden until after roll)  
- **Client seed** (customizable by player)  
- **Nonce** to prevent replay attacks  
- Verification system to check previous rolls  

### 💾 Game State Management  
- **Starting balance:** $1000  
- **Persistent state** using `localStorage`  
- **Detailed game history** tracking all rolls  
- Option to **reset balance** if you go broke  

---

## 🛠️ Technical Implementation  

### 🏆 Provably Fair Algorithm  
1. Server generates a **random seed** and shares only its **hash**  
2. After each roll, the **previous server seed** is revealed  
3. Players can verify that rolls were fair and not manipulated  

### 📦 Components  
- **`DiceDisplay`** – Visual representation of dice with dots  
- **`BetControls`** – Bet amount input with quick bet options  
- **`GameHistory`** – Table of previous rolls and results  
- **`ProvablyFairInfo`** – Details on provable fairness  

### 📊 State Management  
- **React state** with `localStorage` persistence  
- **Complete game history** tracking  
- **Seed management** for provable fairness  

---

## 📜 How to Play  
1. Enter a bet amount  
2. Click **Roll Dice**  
3. Win on **4, 5, or 6** (2x payout)  
4. Lose on **1, 2, or 3** (bet is deducted)  
5. Verify fairness using the **provably fair system**  

---


## 🏗️ Setup & Installation  

1. Clone the repository:  
   ```sh
   git clone https://github.com/Ajinkya-Lakhara/Dice-Game.git
   cd Dice-Game
   ```
2. Install dependencies:  
   ```sh
   npm install
   ```
3. Start the game:  
   ```sh
   npm start
   ```



