package client

import (
	"math/rand"

	"gorm.io/gorm"
)

type Client struct {
	gorm.Model
	Name      string `json:"name"`
	Telephone string `json:"telephone"`
	Mail      string `json:"mail"`
	Company   string `json:"company"`
	Uid       string `json:"uid" gorm:"uniqueIndex"`
}

func NewClient(name, telephone, mail, company string) *Client {
	product := &Client{
		Name:      name,
		Telephone: telephone,
		Mail:      mail,
		Company:   company,
	}
	product.GenerateHash()
	return product
}

func (product *Client) GenerateHash() {
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
