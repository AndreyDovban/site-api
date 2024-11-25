package configs

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Db   DbConfig
	Mail MailConfig
}

type DbConfig struct {
	Dsn string
}

type MailConfig struct {
	Login    string
	Password string
}

func LoadConfig() *Config {
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file? using default config")
	}
	return &Config{
		Db: DbConfig{
			Dsn: os.Getenv("DSN"),
		},
		Mail: MailConfig{
			Login:    os.Getenv("LOGIN"),
			Password: os.Getenv("PASSWORD"),
		},
	}
}
