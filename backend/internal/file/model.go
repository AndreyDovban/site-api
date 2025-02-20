package file

import (
	"math/rand"

	"gorm.io/gorm"
)

type File struct {
	gorm.Model
	Uid         string `json:"uid" gorm:"uniqueIndex"`
	Name        string `json:"name"`
	Description string `json:"description"`
	ProductUid  string `json:"product_uid"`
}

func NewFile(name, description, productUid string) *File {
	file := &File{
		Name:        name,
		Description: description,
		ProductUid:  productUid,
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
