package main

import (
	"fmt"
	"strconv"

	"github.com/gin-gonic/gin"
)

func (app *application) statusHandler(c *gin.Context) {
	currentStatus := AppStatus{
		Status:      "Available",
		Environment: app.config.env,
	}

	c.JSON(200, gin.H{
		"Content-Type": "application/json",
		"message":      currentStatus,
	})
}

//getOneFamily will get the family information for one family
func (app *application) getOneFamily(c *gin.Context) {
	id, err := strconv.Atoi(c.Params.ByName("id"))
	if err != nil {
		app.logger.Printf("Invalid id paramater")
	}
	app.logger.Printf("Id is: %d", id)

	family, err := app.models.DB.GetFamilies(id)
	if err != nil {
		fmt.Printf("Unexpected error retrieving a family %v", err)
	}

	c.JSON(200, gin.H{
		"Content-Type": "application/json",
		"message":      family,
	})
}

//getOneEvent will get the event information for one event
func (app *application) getOneEvent(c *gin.Context) {
	id, err := strconv.Atoi(c.Params.ByName("id"))
	if err != nil {
		c.JSON(400, gin.H{
			"message": err.Error(),
		})
		app.logger.Printf("Invalid event id paramater")
	}
	app.logger.Printf("Id is: %d", id)

	event, err := app.models.DB.GetEvents(id)
	if err != nil {
		c.JSON(418, gin.H{
			"message": err.Error(),
		})
		fmt.Printf("Unexpected error retrieving a event %v", err)
	}

	c.JSON(200, gin.H{
		"Content-Type": "application/json",
		"message":      event,
	})
}

//getEventsForFamily will get the event details that a family is invited for
func (app *application) getEventsForFamily(c *gin.Context) {
	id, err := strconv.Atoi(c.Params.ByName("id"))
	if err != nil {
		app.logger.Printf("Invalid id paramater")
	}
	app.logger.Printf("Id is: %d", id)

	familyEvents, err := app.models.DB.GetEventsForFamily(id)
	if err != nil {
		fmt.Printf("Unexpected error retrieving event details %v", err)
	}

	c.JSON(200, gin.H{
		"Content-Type": "application/json",
		"message":      familyEvents,
	})
}

//rsvpToEvent will put information for how many people are attending from a family
func (app *application) rsvpToEvent(c *gin.Context) {
	familyID, err := strconv.Atoi(c.Params.ByName("family_id"))
	if err != nil {
		c.JSON(400, gin.H{
			"message": "Invalid family id",
			"error":   err.Error(),
		})
	}
	eventID, err := strconv.Atoi(c.Params.ByName("event_id"))
	if err != nil {
		c.JSON(400, gin.H{
			"message": "Invalid event id",
			"error":   err.Error(),
		})
	}
	attending, err := strconv.Atoi(c.Params.ByName("attending"))
	if err != nil {
		c.JSON(400, gin.H{
			"message": "Invalid number attending",
			"error":   err.Error(),
		})
	}

	app.logger.Printf("Family %d will have %d people attending %d event id", familyID, attending, eventID)

	_, err = app.models.DB.RsvpToEvent(familyID, eventID, attending)
	if err != nil {
		fmt.Printf("Unexpected error retrieving event details: %v", err)
	}

	c.JSON(200, gin.H{
		"Content-Type": "application/json",
		"message":      true,
	})
}
