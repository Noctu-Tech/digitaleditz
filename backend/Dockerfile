# Use an official Python runtime as a parent image
FROM python:3.11

# Set the working directory
WORKDIR /backend

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend code
COPY . .

# Expose the backend port (e.g., 8000 for FastAPI)
EXPOSE 8000

# Command to run the FastAPI app
CMD ["python","run.py"]
