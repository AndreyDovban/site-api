package di

import (
	"site-api/internal/client"
	"site-api/internal/file"
	"site-api/internal/link"
	"site-api/internal/product"
)

type IClientRepository interface {
	Create(client *client.Client) (*client.Client, error)
	FindByData(name, telephone, mail, company string) (*client.Client, error)
}
type ILinkRepository interface {
	Create(link *link.Link) (*link.Link, error)
	GetMailLinks() ([]*link.LinkMailResponse, error)
}

type IProductRepository interface {
	FindByUid(uid string) (*product.Product, error)
	CetProdsByUids(productUids []string) ([]*product.Product, error)
}

type IFileRepository interface {
	FindByUid(uid string) (*file.File, error)
	GetFilesByProdUid(productUids []string) ([]*file.File, error)
}
