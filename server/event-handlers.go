package main

import (
	"fmt"
	"strconv"

	"github.com/gin-gonic/gin"
)

func (app *application) getOneFamily(c *gin.Context) {
	id, err := strconv.Atoi(c.Params.ByName("id"))
	if err != nil {
		app.logger.Printf("Invalid id paramater")
	}
	app.logger.Printf("Id is: %d", id)

	family, err := app.models.DB.GetFamilies(id)
	if err != nil {
		fmt.Printf("Unexpected error retrieving a family %d", err)
	}

	c.JSON(200, gin.H{
		"Content-Type": "application/json",
		"message":      family,
	})
}

func (app *application) getOneEvent(c *gin.Context) {
	id, err := strconv.Atoi(c.Params.ByName("id"))
	if err != nil {
		app.logger.Printf("Invalid id paramater")
	}
	app.logger.Printf("Id is: %d", id)

	event, err := app.models.DB.GetEvents(id)
	if err != nil {
		fmt.Printf("Unexpected error retrieving a event %d", err)
	}

	c.JSON(200, gin.H{
		"Content-Type": "application/json",
		"message":      event,
	})
}

func (app *application) getEventsForFamily(c *gin.Context) {
	id, err := strconv.Atoi(c.Params.ByName("id"))
	if err != nil {
		app.logger.Printf("Invalid id paramater")
	}
	app.logger.Printf("Id is: %d", id)

	familyEvents, err := app.models.DB.GetEventsForFamily(id)
	if err != nil {
		fmt.Printf("Unexpected error retrieving event details %d", err)
	}

	c.JSON(200, gin.H{
		"Content-Type": "application/json",
		"message":      familyEvents,
	})
}
