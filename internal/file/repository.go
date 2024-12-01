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

func (repo *FileRepository) Delete(uid string) (*File, error) {
	var product File
	result := repo.Db.
		Table("files").
		Unscoped().
		Delete(&product, "uid = ?", uid)
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

	repo.Db.Table("files").Select("files.name as name, products.name as product_name").
		Joins("JOIN products ON files.products_uid = products.uid").
		Find(&files)

	// result := repo.Db.
	// 	Table("files").
	// 	Select("uid", "name", "description", " name", "created_at", "updated_at").
	// 	Where("deleted_at is null").
	// 	Order("id asc").
	// 	Limit(limit).
	// 	Offset(offset).
	// 	Scan(&files)
	// if result.Error != nil {
	// 	return nil, result.Error
	// }
	return files, nil
}
