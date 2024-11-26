package product

import (
	"math/rand"

	"gorm.io/gorm"
)

type Product struct {
	gorm.Model
	Name        string `json:"name"`
	Description string `json:"decription"`
	Hash        string `json:"hash" gorm:"uniqueIndex"`
}

func NewProduct(name, description string) *Product {
	product := &Product{
		Name:        name,
		Description: description,
	}
	product.GenerateHash()
	return product
}

func (product *Product) GenerateHash() {
	product.Hash = RandStringRunes(20)
}

var letterRunes = []rune("qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890")

func RandStringRunes(n int) string {
	b := make([]rune, n)
	for i := range b {
		b[i] = letterRunes[rand.Intn(len(letterRunes))]
	}

	return string(b)
}
