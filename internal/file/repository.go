package file

import (
	"errors"
	"fmt"
	"site-api/pkg/db"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type FileRepository struct {
	Db *db.Db
}

func NewFileRepository(database *db.Db) *FileRepository {
	return &FileRepository{
		Db: database,
	}
}

func (repo *FileRepository) Create(file *File) (*File, error) {
	var uid string
	prod_uid_res := repo.Db.
		Table("products").
		Select("uid").
		Where("name = ?", file.ProductName).
		Scan(&uid)

	fmt.Println(uid)

	if prod_uid_res.Error != nil {
		return nil, prod_uid_res.Error
	}
	if uid == "" {
		return nil, errors.New(file.ProductName + " is not found")
	}

	file.ProductUid = uid

	result := repo.Db.
		Table("files").
		Create(file)
	if result.Error != nil {
		return nil, result.Error
	}
	return file, nil
}

func (repo *FileRepository) FindByName(name string) (*File, error) {
	var product File
	result := repo.Db.
		Table("files").
		First(&product, "name = ?", name)
	if result.Error != nil {
		return nil, result.Error
	}
	return &product, nil
}

func (repo *FileRepository) FindByUid(uid string) (*File, error) {
	var product File
	result := repo.Db.
		Table("files").
		First(&product, "uid = ?", uid)
	if result.Error != nil {
		return nil, result.Error
	}
	return &product, nil
}

func (repo *FileRepository) Update(name string, prod *File) (*File, error) {
	result := repo.Db.
		Table("files").
		Where("name = ?", name).
		Clauses(clause.Returning{}).
		Updates(prod)
	if result.Error != nil {
		return nil, result.Error
	}
	return prod, nil
}

func (repo *FileRepository) Delete(name string) (*File, error) {
	var product File
	result := repo.Db.
		Table("files").
		Delete(&product, "name = ?", name)
	if result.Error != nil {
		return nil, result.Error
	}
	return &product, nil
}

func (repo *FileRepository) Count() (int64, error) {
	var count int64
	result := repo.Db.
		Table("files").
		Where("deleted_at is null").
		Count(&count)
	if result.Error != nil {
		return 0, result.Error
	}
	return count, nil

}

func (repo *FileRepository) GetFiles(limit, offset int, columns []string) ([]FileResponse, error) {
	var files []FileResponse

	if len(columns) == 0 {
		return files, nil
	}

	result := repo.Db.
		Table("files").
		Select(columns).
		Where("deleted_at is null").
		Session(&gorm.Session{}).
		Order("id asc").
		Limit(limit).
		Offset(offset).
		Scan(&files)
	if result.Error != nil {
		return nil, result.Error
	}
	return files, nil
}
