package file

import (
	"math/rand"
	"site-api/internal/product"

	"gorm.io/gorm"
)

type File struct {
	gorm.Model
	Name        string `json:"name"`
	Description string `json:"description"`
	Uid         string `json:"uid" gorm:"uniqueIndex"`
	ProductName string `json:"product_name"`
	ProductUid  string
	Product     product.Product `gorm:"foreignKey:ProductUid;references:Uid"`
}

func NewFile(name, description, productName string) *File {
	file := &File{
		Name:        name,
		Description: description,
		ProductName: productName,
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
