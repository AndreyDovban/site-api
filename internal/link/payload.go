package link

import "gorm.io/datatypes"

type GetLinksRequest struct {
	Limit   int      `json:"limit"`
	Offset  int      `json:"offset"`
	Columns []string `json:"columns"`
}

type LinkResponse struct {
	Uid        string         `json:"uid"`
	Hash       string         `json:"hash"`
	Valid      bool           `json:"valid"`
	Count      int            `json:"count"`
	ProductUid string         `json:"product_uid"`
	FileUid    string         `json:"file_uid"`
	ClientUid  string         `json:"client_uid"`
	CreatedAt  datatypes.Date `json:"CreatedAt"`
	UpdatedAt  datatypes.Date `json:"UpdatedAt"`
}

type LinkMailResponse struct {
	Hash            string `json:"hash"`
	FileName        string `json:"file_name"`
	FileDescription string `json:"file_description"`
}

type GetLinksResponse struct {
	Links []LinkResponse `json:"links"`
	Count int64          `json:"count"`
}
