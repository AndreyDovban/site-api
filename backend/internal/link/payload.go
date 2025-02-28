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
	Valid       int            `json:"valid"`
	Count       int            `json:"count"`
	ProductName string         `json:"product_name"`
	FileName    string         `json:"file_name"`
	ClientName  string         `json:"client_name"`
	CreatedAt   datatypes.Date `json:"created_at"`
	UpdatedAt   datatypes.Date `json:"updated_at"`
}

type LinkMailResponse struct {
	Hash            string `json:"hash"`
	FileName        string `json:"file_name"`
	FileDescription string `json:"file_description"`
	ProductUid      string `json:"product_uid"`
}

type GetLinksResponse struct {
	Columns []string       `json:"columns"`
	Data    []LinkResponse `json:"data"`
	Count   int64          `json:"count"`
}
