package link

import (
	"math/rand"
	"site-api/internal/client"

	"gorm.io/gorm"
)

type Link struct {
	gorm.Model
	Uid        string        `json:"uid" gorm:"uniqueIndex"`
	Hash       string        `json:"hash" gorm:"uniqueIndex"`
	Valid      int           `json:"valid"`
	Count      int           `json:"count"`
	FileUid    string        `json:"file_uid"`
	ProductUid string        `json:"product_uid"`
	ClientUid  string        `json:"client_uid"`
	Client     client.Client `gorm:"foreignKey:ClientUid;references:Uid"`
}

func NewLink(valid int, count int) *Link {
	link := &Link{
		Valid: valid,
		Count: count,
	}
	link.GenerateHash()
	return link
}

func (link *Link) GenerateHash() {
	link.Hash = RandStringRunes(40)
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
