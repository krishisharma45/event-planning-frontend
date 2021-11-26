package main

import (
	"fmt"
	"strconv"

	"github.com/gin-gonic/gin"
)

var (
	httpSuccess                = 200
	httpClientError            = 400
	httpServerError            = 500
	ErrTemplateGetFamilyEvents = "SQL failure while retrieving events for family. Family id is: %s"
	ErrTemplateAttendingCount  = "SQL failure while retrieving number attending. Event id is %s"
)

func (app *application) statusHandler(c *gin.Context) {
	currentStatus := AppStatus{
		Status:      "Available",
		Environment: app.config.env,
	}

	c.JSON(httpSuccess, gin.H{
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

	c.JSON(httpSuccess, gin.H{
		"Content-Type": "application/json",
		"message":      family,
	})
}

//validateFamily will validate the family information for one family against secret_code
func (app *application) validateFamily(c *gin.Context) {
	app.logger.Print("henlo")

	secretCode, err := strconv.Atoi(c.Params.ByName("secret_code"))
	if err != nil {
		app.logger.Printf("Invalid secret-code paramater")
	}

	familyName := c.Params.ByName("family_name")
	if err != nil {
		app.logger.Printf("Invalid secret-code paramater")
	}

	app.logger.Printf("secret-code is: %d", secretCode)
	app.logger.Printf("family-name is: %s", familyName)

	//TODO: jwt
	// var claims jwt.Claims
	// claims.Subject = fmt.Sprint(familyName)
	// claims.Issued = jwt.NewNumericTime(time.Now())
	// claims.NotBefore = jwt.NewNumericTime(time.Now())
	// claims.Expires = jwt.NewNumericTime(time.Now().Add(24 * time.Hour))
	// claims.Issuer = "luvandkrishi.com"
	// claims.Audiences = []string{"luvandkrishi.com"}

	// jwtBytes, err := claims.HMACSign(jwt.HS256, []byte(app.config.jwt.secret))

	resp, err := app.models.DB.ValidateFamily(secretCode, familyName)
	if err != nil {
		app.logger.Printf("Unexpected error retrieving a family %v", err)
		c.JSON(httpServerError, gin.H{
			"message": err.Error(),
		})
	}

	c.JSON(httpSuccess, gin.H{
		"Content-Type": "application/json",
		"familyID":     resp.FamilyID,
		"message":      resp.Exists,
	})
}

//getOneEvent will get the event information for one event
func (app *application) getOneEvent(c *gin.Context) {
	id, err := strconv.Atoi(c.Params.ByName("id"))
	if err != nil {
		c.JSON(httpClientError, gin.H{
			"message": err.Error(),
		})
		app.logger.Printf("Invalid event id paramater")
	}
	app.logger.Printf("Id is: %d", id)

	event, err := app.models.DB.GetEvents(id)
	if err != nil {
		app.logger.Printf("Unexpected error retrieving a event %s", err)
		c.JSON(httpServerError, gin.H{
			"message": err.Error(),
		})
	}

	c.JSON(httpSuccess, gin.H{
		"Content-Type": "application/json",
		"message":      event,
	})
}

//getEventsForFamily will get the event details that a family is invited for
func (app *application) getEventsForFamily(c *gin.Context) {
	familyID, err := strconv.Atoi(c.Params.ByName("family_id"))
	if err != nil {
		c.JSON(httpClientError, gin.H{
			"message": "Invalid family id",
			"error":   err.Error(),
		})
	}
	app.logger.Printf("Family ID is: %d", familyID)

	familyEvents, err := app.models.DB.GetEventsForFamily(familyID)
	if err != nil {
		app.logger.Printf("Something went wrong with sql query to get events for family %s", err)
		c.JSON(httpServerError, gin.H{
			"Content-Type": "application/json",
			"message":      fmt.Sprintf(ErrTemplateGetFamilyEvents, familyID),
		})
	}

	c.JSON(httpSuccess, gin.H{
		"Content-Type": "application/json",
		"message":      familyEvents,
	})
}

func (app *application) getAttendingForEvent(c *gin.Context) {
	eventID, err := strconv.Atoi(c.Params.ByName("event_id"))
	if err != nil {
		c.JSON(httpClientError, gin.H{
			"message": "Invalid event id",
			"error":   err.Error(),
		})
	}
	app.logger.Printf("EventID is: %d", eventID)

	attending, err := app.models.DB.GetAttendingForEvent(eventID)
	if err != nil {
		app.logger.Printf("Something went wrong with sql query to get attending families %s", err)
		c.JSON(httpServerError, gin.H{
			"Content-Type": "application/json",
			"message":      fmt.Sprintf(ErrTemplateAttendingCount, eventID),
		})
	}

	c.JSON(httpSuccess, gin.H{
		"Content-Type": "application/json",
		"message":      attending,
	})
}

//rsvpToEvent will put information for how many people are attending from a family
func (app *application) rsvpToEvent(c *gin.Context) {
	familyID, err := strconv.Atoi(c.Params.ByName("family_id"))
	if err != nil {
		c.JSON(httpClientError, gin.H{
			"message": "Invalid family id",
			"error":   err.Error(),
		})
	}
	eventID, err := strconv.Atoi(c.Params.ByName("event_id"))
	if err != nil {
		c.JSON(httpClientError, gin.H{
			"message": "Invalid event id",
			"error":   err.Error(),
		})
	}
	attending, err := strconv.Atoi(c.Params.ByName("attending"))
	if err != nil {
		c.JSON(httpClientError, gin.H{
			"message": "Invalid number attending",
			"error":   err.Error(),
		})
	}

	app.logger.Printf("Family %d will have %d people attending %d event id", familyID, attending, eventID)

	_, err = app.models.DB.RsvpToEvent(familyID, eventID, attending)
	if err != nil {
		app.logger.Printf("Something went wrong with sql query to put rsvp %s", err)
		app.logger.Printf("Family id is %v \n", familyID)
		app.logger.Printf("Event id is %v \n", eventID)
		app.logger.Printf("Number attending is %v \n", eventID)

		c.JSON(httpServerError, gin.H{
			"Content-Type": "application/json",
			"message":      fmt.Sprintf(ErrTemplateAttendingCount, eventID),
		})
	}

	c.JSON(httpSuccess, gin.H{
		"Content-Type": "application/json",
		"message":      true,
	})
}
