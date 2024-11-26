package link

import "gorm.io/datatypes"

type LinkCreateRequest struct {
	Name        string `json:"name" validate:"required"`
	Description string `json:"description" validate:"required"`
}

type LinkUpdateRequest struct {
	Name        string `json:"name"`
	Description string `json:"description"`
}

type LinkResponse struct {
	Name        string         `json:"name"`
	Description string         `json:"description"`
	CreatedAt   datatypes.Date `json:"CreatedAt"`
	UpdatedAt   datatypes.Date `json:"UpdatedAt"`
}

type GetLinksResponse struct {
	Links []LinkResponse `json:"links"`
	Count int64          `json:"count"`
}
