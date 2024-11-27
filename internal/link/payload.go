package link

import "gorm.io/datatypes"

type GetLinksRequest struct {
	Limit   int      `json:"limit"`
	Offset  int      `json:"offset"`
	Columns []string `json:"columns"`
}

type LinkResponse struct {
	Uid         string         `json:"uid"`
	Hash        string         `json:"hash"`
	Valid       bool           `json:"valid"`
	Count       int            `json:"count"`
	ProductName string         `json:"product_name"`
	ProductUid  string         `json:"product_uid"`
	FileName    string         `json:"file_name"`
	FileUid     string         `json:"file_uid"`
	ClientName  string         `json:"client_Name"`
	ClientUid   string         `json:"client_uid"`
	CreatedAt   datatypes.Date `json:"CreatedAt"`
	UpdatedAt   datatypes.Date `json:"UpdatedAt"`
}

type GetLinksResponse struct {
	Links []LinkResponse `json:"links"`
	Count int64          `json:"count"`
}
