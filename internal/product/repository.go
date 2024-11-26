package product

import (
	"site-api/pkg/db"
)

type ProductRepository struct {
	Db *db.Db
}

func NewProductRepository(database *db.Db) *ProductRepository {
	return &ProductRepository{
		Db: database,
	}
}

func (repo *ProductRepository) Create(prod *Product) (*Product, error) {
	result := repo.Db.Table("products").Create(prod)
	if result.Error != nil {
		return nil, result.Error
	}
	return prod, nil
}

func (repo *ProductRepository) FindByName(name string) (*Product, error) {
	var product Product
	result := repo.Db.First(&product, "name = ?", name)
	if result.Error != nil {
		return nil, result.Error
	}
	return &product, nil
}

func (repo *ProductRepository) FindByHash(hash string) (*Product, error) {
	var product Product
	result := repo.Db.First(&product, "hash = ?", hash)
	if result.Error != nil {
		return nil, result.Error
	}
	return &product, nil
}
