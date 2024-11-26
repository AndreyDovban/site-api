package product

import "site-api/pkg/db"

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
