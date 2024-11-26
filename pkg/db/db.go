package db

import (
	"site-api/configs"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type Db struct {
	*gorm.DB
}

func NewDb(conf *configs.Config) *Db {
	db, err := gorm.Open(sqlite.Open(conf.Db.Dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	return &Db{db}
}