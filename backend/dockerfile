# Use an official Python image as the base
FROM python:3.12-slim

# Set environment variables to avoid issues with buffering and non-interactive mode
ENV PYTHONUNBUFFERED=1
ENV DEBIAN_FRONTEND=noninteractive

# Install system dependencies and Stockfish
RUN apt update && apt install -y \
    stockfish \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /app

# Copy the current directory contents into the container
COPY . .

# Install Python dependencies from requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port Flask will run on
EXPOSE 5000

# Define the command to run your Python server
CMD ["python", "server.py"]
