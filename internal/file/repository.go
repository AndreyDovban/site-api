package file

import (
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

func (repo *FileRepository) Create(prod *File) (*File, error) {
	result := repo.Db.
		Table("files").
		Create(prod)
	if result.Error != nil {
		return nil, result.Error
	}
	return prod, nil
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

func (repo *FileRepository) GetProds(limit, offset int, columns string) ([]FileResponse, error) {
	// var products []File
	var files []FileResponse

	query := repo.Db.
		Table("files").
		Select(columns).
		Where("deleted_at is null").
		Session(&gorm.Session{})

	result := query.
		Order("id asc").
		Limit(limit).
		Offset(offset).
		Scan(&files)
	if result.Error != nil {
		return nil, result.Error
	}
	return files, nil
}
