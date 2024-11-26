package link

import (
	"math/rand"

	"gorm.io/gorm"
)

type Link struct {
	gorm.Model
	Name        string `json:"name"`
	Description string `json:"decription"`
	Uid         string `json:"uid" gorm:"uniqueIndex"`
}

func NewLink(name, description string) *Link {
	link := &Link{
		Name:        name,
		Description: description,
	}
	link.GenerateHash()
	return link
}

func (link *Link) GenerateHash() {
	link.Uid = RandStringRunes(20)
}

var letterRunes = []rune("qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890")

func RandStringRunes(n int) string {
	b := make([]rune, n)
	for i := range b {
		b[i] = letterRunes[rand.Intn(len(letterRunes))]
	}

	return string(b)
}
