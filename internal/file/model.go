package file

import (
	"math/rand"

	"gorm.io/gorm"
)

type File struct {
	gorm.Model
	Name        string `json:"name"`
	Description string `json:"description"`
	Uid         string `json:"uid" gorm:"uniqueIndex"`
}

func NewFile(name, description string) *File {
	file := &File{
		Name:        name,
		Description: description,
	}
	file.GenerateHash()
	return file
}

func (file *File) GenerateHash() {
	file.Uid = RandStringRunes(20)
}

var letterRunes = []rune("qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890")

func RandStringRunes(n int) string {
	b := make([]rune, n)
	for i := range b {
		b[i] = letterRunes[rand.Intn(len(letterRunes))]
	}

	return string(b)
}
