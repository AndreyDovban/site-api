package mail

type MailRequest struct {
	Name      string   `json:"name" validate:"required"`
	Telephone string   `json:"telephone"`
	Mail      string   `json:"mail" validate:"required"`
	Company   string   `json:"company" validate:"required"`
	Products  []string `json:"products" validate:"required"`
}
