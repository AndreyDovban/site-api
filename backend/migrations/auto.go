package main

import (
	"os"
	"site-api/internal/client"
	"site-api/internal/file"
	"site-api/internal/link"
	"site-api/internal/product"

	"github.com/joho/godotenv"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		panic(err)
	}

	db, err := gorm.Open(sqlite.Open(os.Getenv("DSN")), &gorm.Config{})
	if err != nil {
		panic(err)
	}
	db.AutoMigrate(&product.Product{}, &file.File{}, &client.Client{}, &link.Link{})
}
