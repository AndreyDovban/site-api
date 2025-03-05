package file

import (
	"site-api/pkg/db"

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
	prod_uid_res := repo.Db.
		Table("products").
		Select("name").
		Where("uid = ?", file.ProductUid)
	if prod_uid_res.Error != nil {
		return nil, prod_uid_res.Error
	}

	result := repo.Db.
		Create(file)
	if result.Error != nil {
		return nil, result.Error
	}
	return file, nil
}

func (repo *FileRepository) FindByName(name string) (*File, error) {
	var file File
	result := repo.Db.
		Table("files").
		First(&file, "name = ?", name)
	if result.Error != nil {
		return nil, result.Error
	}
	return &file, nil
}

func (repo *FileRepository) FindByUid(uid string) (*File, error) {
	var file File
	result := repo.Db.
		Table("files").
		First(&file, "uid = ?", uid)
	if result.Error != nil {
		return nil, result.Error
	}
	return &file, nil
}

func (repo *FileRepository) Update(uid string, prod *File) (*File, error) {
	result := repo.Db.
		Table("files").
		Where("uid = ?", uid).
		Clauses(clause.Returning{}).
		Updates(prod)
	if result.Error != nil {
		return nil, result.Error
	}
	return prod, nil
}

func (repo *FileRepository) Delete(uid string) error {
	var file File
	result := repo.Db.
		Table("files").
		Unscoped().
		Delete(&file, "uid = ?", uid)
	if result.Error != nil {
		return result.Error
	}
	return nil
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

func (repo *FileRepository) GetFilesByProdUid(productUids []string) ([]*File, error) {
	var files []*File

	repo.Db.
		Table("files").
		Where("deleted_at is null").
		Where("product_uid IN ?", productUids).
		Find(&files)

	return files, nil
}

func (repo *FileRepository) GetFiles(limit, offset int, columns []string) ([]FileResponse, error) {
	var files []FileResponse

	if len(columns) == 0 {
		return files, nil
	}

	result := repo.Db.
		Table("files").
		Select(`files.uid as uid,
		files.name as name, 
		files.description as description, 
		files.created_at as created_at,
		files.updated_at as updated_at, 
		products.name as product_name,
		products.uid as product_uid,
		products.description as product_description`).
		Where("files.deleted_at is null").
		Joins("JOIN products ON files.product_uid = products.uid").
		Order("uid asc").
		Limit(limit).
		Offset(offset).
		Find(&files)

	if result.Error != nil {
		return nil, result.Error
	}
	return files, nil
}
