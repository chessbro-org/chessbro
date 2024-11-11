#!/bin/bash
mkdir -p stockfish
cd stockfish
curl -L -o stockfish.tar.gz https://github.com/official-stockfish/Stockfish/releases/latest/download/stockfish-ubuntu-x86-64.tar
tar -xzf stockfish.tar.gz
chmod +x stockfish
