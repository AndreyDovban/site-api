package di

import (
	"site-api/internal/client"
	"site-api/internal/link"
)

type IClientRepository interface {
	Create(client *client.Client) (*client.Client, error)
	FindByData(name, telephone, mail, company string) (*client.Client, error)
}
type ILinkRepository interface {
	Create(link *link.Link) (*link.Link, error)
}
