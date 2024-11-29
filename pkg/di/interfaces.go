package di

import "site-api/internal/client"

type IClientRepository interface {
	Create(client *client.Client) (*client.Client, error)
	FindByData(name, telephone, mail, company string) (*client.Client, error)
}
