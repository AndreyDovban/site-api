package client

import (
	"site-api/pkg/db"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type ClientRepository struct {
	Db *db.Db
}

func NewClientRepository(database *db.Db) *ClientRepository {
	return &ClientRepository{
		Db: database,
	}
}

func (repo *ClientRepository) Create(Client *Client) (*Client, error) {
	result := repo.Db.
		Table("clients").
		Create(Client)
	if result.Error != nil {
		return nil, result.Error
	}
	return Client, nil
}

func (repo *ClientRepository) FindByName(name string) (*Client, error) {
	var client Client
	result := repo.Db.
		Table("clients").
		First(&client, "name = ?", name)
	if result.Error != nil {
		return nil, result.Error
	}
	return &client, nil
}

func (repo *ClientRepository) FindByUid(uid string) (*Client, error) {
	var client Client
	result := repo.Db.
		Table("clients").
		First(&client, "uid = ?", uid)
	if result.Error != nil {
		return nil, result.Error
	}
	return &client, nil
}

func (repo *ClientRepository) Update(name string, Client *Client) (*Client, error) {
	result := repo.Db.
		Table("clients").
		Where("name = ?", name).
		Clauses(clause.Returning{}).
		Updates(Client)
	if result.Error != nil {
		return nil, result.Error
	}
	return Client, nil
}

func (repo *ClientRepository) Delete(name string) (*Client, error) {
	var client Client
	result := repo.Db.
		Table("clients").
		Delete(&client, "name = ?", name)
	if result.Error != nil {
		return nil, result.Error
	}
	return &client, nil
}

func (repo *ClientRepository) Count() (int64, error) {
	var count int64
	result := repo.Db.
		Table("clients").
		Where("deleted_at is null").
		Count(&count)
	if result.Error != nil {
		return 0, result.Error
	}
	return count, nil

}

func (repo *ClientRepository) GetClients(limit, offset int, columns string) ([]ClientResponse, error) {
	var clients []ClientResponse

	if columns == "" {
		return clients, nil
	}

	result := repo.Db.
		Table("clients").
		Select(columns).
		Where("deleted_at is null").
		Session(&gorm.Session{}).
		Order("id asc").
		Limit(limit).
		Offset(offset).
		Scan(&clients)
	if result.Error != nil {
		return nil, result.Error
	}
	return clients, nil
}
