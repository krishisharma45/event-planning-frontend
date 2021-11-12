package main

import (
	"strconv"

	"github.com/gin-gonic/gin"
)

func (app *application) getOneMovie(c *gin.Context) {
	id, err := strconv.Atoi(c.Params.ByName("id"))
	if err != nil {
		app.logger.Printf("Invalid id paramater")
	}
	app.logger.Printf("Id is: %d", id)

	movie, err := app.models.DB.Get(id)
	c.JSON(200, gin.H{
		"Content-Type": "application/json",
		"message":      movie,
	})
}
