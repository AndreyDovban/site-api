package link

import (
	"site-api/pkg/db"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type LinkRepository struct {
	Db *db.Db
}

func NewLinkRepository(database *db.Db) *LinkRepository {
	return &LinkRepository{
		Db: database,
	}
}

func (repo *LinkRepository) Create(link *Link) (*Link, error) {
	result := repo.Db.
		Table("links").
		Create(link)
	if result.Error != nil {
		return nil, result.Error
	}
	return link, nil
}

func (repo *LinkRepository) Update(hash string, link *Link) (*Link, error) {
	result := repo.Db.
		Table("links").
		Where("hash = ?", hash).
		Clauses(clause.Returning{}).
		Updates(link)
	if result.Error != nil {
		return nil, result.Error
	}
	return link, nil
}

func (repo *LinkRepository) FindByUid(uid string) (*Link, error) {
	var link Link
	result := repo.Db.
		Table("links").
		First(&link, "uid = ?", uid)
	if result.Error != nil {
		return nil, result.Error
	}
	return &link, nil
}

func (repo *LinkRepository) FindByHash(hash string) (*Link, error) {
	var link Link
	result := repo.Db.
		Table("links").
		First(&link, "hash = ?", hash)
	if result.Error != nil {
		return nil, result.Error
	}
	return &link, nil
}

func (repo *LinkRepository) Count() (int64, error) {
	var count int64
	result := repo.Db.
		Table("links").
		Where("deleted_at is null").
		Count(&count)
	if result.Error != nil {
		return 0, result.Error
	}
	return count, nil

}

func (repo *LinkRepository) GetLinks(limit, offset int, columns []string) ([]LinkResponse, error) {
	var links []LinkResponse

	if len(columns) == 0 {
		return links, nil
	}

	result := repo.Db.
		Table("links, products, files, clients").
		Select(
			`links.uid as uid,
			hash,
			valid,
			count,
			products.name as product_name,
			files.name as file_name,
			clients.name as client_name,
			links.created_at as created_at,
			links.updated_at as updated_at`).
		Where("links.deleted_at is null").
		Where("links.client_uid = clients.uid").
		Where("links.file_uid = files.uid").
		Where("links.product_uid = products.uid").
		Session(&gorm.Session{}).
		Order("created_at desc").
		Limit(limit).
		Offset(offset).
		Scan(&links)
	if result.Error != nil {
		return nil, result.Error
	}
	return links, nil
}
