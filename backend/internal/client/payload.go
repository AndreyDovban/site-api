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

type GetClientsRequest struct {
	Limit   int      `json:"limit"`
	Offset  int      `json:"offset"`
	Columns []string `json:"columns"`
}

type ClientResponse struct {
	Name      string         `json:"name"`
	Telephone string         `json:"telephone"`
	Mail      string         `json:"mail"`
	Company   string         `json:"company"`
	CreatedAt datatypes.Date `json:"created_at"`
	UpdatedAt datatypes.Date `json:"updated_at"`
}

type GetClientsResponse struct {
	Columns []string         `json:"columns"`
	Data    []ClientResponse `json:"data"`
	Count   int64            `json:"count"`
}
