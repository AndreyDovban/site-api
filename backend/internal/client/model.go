package client

import (
	"math/rand"

	"gorm.io/gorm"
)

type Client struct {
	gorm.Model
	Uid       string `json:"uid" gorm:"uniqueIndex"`
	Name      string `json:"name"`
	Telephone string `json:"telephone"`
	Mail      string `json:"mail"`
	Company   string `json:"company"`
}

func NewClient(name, telephone, mail, company string) *Client {
	client := &Client{
		Name:      name,
		Telephone: telephone,
		Mail:      mail,
		Company:   company,
	}
	client.GenerateHash()
	return client
}

func (client *Client) GenerateHash() {
	client.Uid = RandStringRunes(20)
}

var letterRunes = []rune("qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890")

func RandStringRunes(n int) string {
	b := make([]rune, n)
	for i := range b {
		b[i] = letterRunes[rand.Intn(len(letterRunes))]
	}

	return string(b)
}
