package client

import "gorm.io/datatypes"

type ClientCreateRequest struct {
	Name      string `json:"name" validate:"required"`
	Telephone string `json:"telephone"`
	Mail      string `json:"mail" validate:"required"`
	Company   string `json:"company" validate:"required"`
}

type ClientUpdateRequest struct {
	Name      string `json:"name"`
	Telephone string `json:"telephone"`
	Mail      string `json:"mail"`
	Company   string `json:"company"`
}

type ClientResponse struct {
	Name      string         `json:"name"`
	Telephone string         `json:"telephone"`
	Mail      string         `json:"mail"`
	Company   string         `json:"company"`
	CreatedAt datatypes.Date `json:"CreatedAt"`
	UpdatedAt datatypes.Date `json:"UpdatedAt"`
}

type GetClientsResponse struct {
	Clients []ClientResponse `json:"clients"`
	Count   int64            `json:"count"`
}
