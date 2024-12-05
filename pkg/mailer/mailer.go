package mailer

import (
	"bytes"
	"crypto/tls"
	"encoding/base64"
	"fmt"
	"log"
	"net/mail"
	"net/smtp"
	"os"
	"text/template"

	"github.com/joho/godotenv"
)

func Mailer(recipient string, data interface{}) {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file? using default config")
	}

	sender := os.Getenv("LOGIN")
	password := os.Getenv("PASSWORD")
	host := os.Getenv("HOST")
	port := 587
	address := fmt.Sprintf("%s:%d", host, port)
	tlsconfig := &tls.Config{
		InsecureSkipVerify: true,
		ServerName:         host,
	}

	auth := smtp.PlainAuth("", sender, password, host)

	var body bytes.Buffer
	t, err := template.ParseFiles("./pkg/mailer/email.html")
	if err != nil {
		fmt.Println(err.Error())
	}
	t.Execute(&body, data)

	// Setup message
	var message = ""
	var delimeter = "simple boundary"

	//basic email headers
	message += fmt.Sprintf("From: %s\r\n", (&mail.Address{Name: "Name", Address: sender}).String())
	message += fmt.Sprintf("From: %s\r\n", (&mail.Address{Name: "Name", Address: recipient}).String())
	message += "Subject: This is the email subject\r\n"
	message += "MIME-Version: 1.0\r\n"
	message += fmt.Sprintf("Content-Type: multipart/mixed; boundary=\"%s\"\r\n", delimeter)

	//place HTML message
	message += fmt.Sprintf("\r\n--%s\r\n", delimeter)
	message += "Content-Type: text/html; charset=\"utf-8\"\r\n"
	message += "Content-Transfer-Encoding: 7bit\r\n"
	message += "\r\n" + body.String()

	//place file
	message += fmt.Sprintf("\r\n--%s\r\n", delimeter)
	message += "Content-Type: text/plain; charset=\"utf-8\"\r\n"
	message += "Content-Transfer-Encoding: base64\r\n"
	message += "Content-Disposition: attachment;filename=ttt\r\n"
	rawFile, fileErr := os.ReadFile("Example.txt")
	if fileErr != nil {
		log.Panic(fileErr)
	}
	message += "\r\n" + base64.StdEncoding.EncodeToString(rawFile)

	fmt.Println(message)

	c, err := smtp.Dial(address)
	if err != nil {
		fmt.Println(err.Error())
	}

	if err = c.StartTLS(tlsconfig); err != nil {
		fmt.Println(err.Error())
		c.Close()
	}

	if err = c.Auth(auth); err != nil {
		fmt.Println(err.Error())
	}

	if err = c.Mail(sender); err != nil {
		fmt.Println(err.Error())
		c.Close()
	}

	if err = c.Rcpt(sender); err != nil {
		fmt.Println(err.Error())
		c.Close()
	}

	w, err := c.Data()

	if err != nil {
		fmt.Println(err.Error())
		c.Close()
	}

	_, err = w.Write([]byte(message))
	if err != nil {
		fmt.Println(err.Error())
		c.Close()
	}

	err = w.Close()

	if err != nil {
		fmt.Println(err.Error())
		c.Close()
	}

	fmt.Println("Send mail success!")
	c.Quit()
}
