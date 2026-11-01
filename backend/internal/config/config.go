package config

import (
	"errors"
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	DatabaseUrl string
	Port        string
	JWTSecret   string
}

func Load() (*Config, error) {
	var err error = godotenv.Load()

	if err != nil {
		log.Println("Warning: .env not found, using environment variables")
	}

	var config *Config = &Config{
		DatabaseUrl: os.Getenv("DATABASE_URL"),
		Port:        os.Getenv("PORT"),
		JWTSecret:   os.Getenv("JWT_SECRET"),
	}

	// Platform seperti Vercel mengisi PORT sendiri; lokal tanpa .env pakai 8000.
	if config.Port == "" {
		config.Port = "8000"
	}

	if config.JWTSecret == "" {
		return nil, errors.New("JWT_SECRET is not set")
	}

	return config, nil
}
