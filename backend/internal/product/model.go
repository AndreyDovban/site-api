package product

import (
	"math/rand"
	"site-api/internal/file"

	"gorm.io/gorm"
)

type Product struct {
	gorm.Model
	Uid             string       `json:"uid" gorm:"uniqueIndex"`
	Name            string       `json:"name"`
	Description     string       `json:"decription"`
	MailInstruction string       `json:"mail_instruction"`
	WebInstruction  string       `json:"web_instruction"`
	Files           []*file.File `gorm:"foreignKey:ProductUid;references:Uid"`
}

func NewProduct(name, description, mail_instruction, web_instruction string) *Product {
	product := &Product{
		Name:            name,
		Description:     description,
		MailInstruction: mail_instruction,
		WebInstruction:  web_instruction,
	}
	product.GenerateHash()
	return product
}

func (product *Product) GenerateHash() {
	product.Uid = RandStringRunes(20)
}

var letterRunes = []rune("qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890")

func RandStringRunes(n int) string {
	b := make([]rune, n)
	for i := range b {
		b[i] = letterRunes[rand.Intn(len(letterRunes))]
	}

	return string(b)
}
