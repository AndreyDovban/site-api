package link

import (
	"site-api/pkg/db"

	"gorm.io/gorm"
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
		Table("links").
		// Select(columns).
		Where("deleted_at is null").
		Session(&gorm.Session{}).
		Order("id asc").
		Limit(limit).
		Offset(offset).
		Scan(&links)
	if result.Error != nil {
		return nil, result.Error
	}
	return links, nil
}
