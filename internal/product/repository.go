package product

import (
	"site-api/pkg/db"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
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
	result := repo.Db.
		Table("products").
		Create(prod)
	if result.Error != nil {
		return nil, result.Error
	}
	return prod, nil
}

func (repo *ProductRepository) FindByName(name string) (*Product, error) {
	var product Product
	result := repo.Db.
		Table("products").
		First(&product, "name = ?", name)
	if result.Error != nil {
		return nil, result.Error
	}
	return &product, nil
}

func (repo *ProductRepository) FindByUid(uid string) (*Product, error) {
	var product Product
	result := repo.Db.
		Table("products").
		First(&product, "uid = ?", uid)
	if result.Error != nil {
		return nil, result.Error
	}
	return &product, nil
}

func (repo *ProductRepository) Update(name string, prod *Product) (*Product, error) {
	result := repo.Db.
		Table("products").
		Where("name = ?", name).
		Clauses(clause.Returning{}).
		Updates(prod)
	if result.Error != nil {
		return nil, result.Error
	}
	return prod, nil
}

func (repo *ProductRepository) Delete(name string) (*Product, error) {
	var product Product
	result := repo.Db.
		Table("products").
		Delete(&product, "name = ?", name)
	if result.Error != nil {
		return nil, result.Error
	}
	return &product, nil
}

func (repo *ProductRepository) Count() (int64, error) {
	var count int64
	result := repo.Db.
		Table("products").
		Where("deleted_at is null").
		Count(&count)
	if result.Error != nil {
		return 0, result.Error
	}
	return count, nil

}

func (repo *ProductRepository) GetProds(limit, offset int, columns string) ([]ProductResponse, error) {
	// var products []Product
	var products []ProductResponse

	query := repo.Db.
		Table("products").
		Select(columns).
		Where("deleted_at is null").
		Session(&gorm.Session{})

	result := query.
		Order("id asc").
		Limit(limit).
		Offset(offset).
		Scan(&products)
	if result.Error != nil {
		return nil, result.Error
	}
	return products, nil
}
