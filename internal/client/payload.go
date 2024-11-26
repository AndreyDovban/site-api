package client

import "gorm.io/datatypes"

type ClientCreateRequest struct {
	Name        string `json:"name" validate:"required"`
	Description string `json:"description" validate:"required"`
}

type ClientUpdateRequest struct {
	Name        string `json:"name"`
	Description string `json:"description"`
}

type ClientResponse struct {
	Name        string         `json:"name"`
	Description string         `json:"description"`
	CreatedAt   datatypes.Date `json:"CreatedAt"`
	UpdatedAt   datatypes.Date `json:"UpdatedAt"`
}

type GetClientsResponse struct {
	Clients []ClientResponse `json:"clients"`
	Count   int64            `json:"count"`
}
