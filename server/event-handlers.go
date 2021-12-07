package main

import (
	"fmt"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/pascaldekloe/jwt"
)

var (
	secret_code                  = "secret_code"
	family_name                  = "family_name"
	httpSuccess                  = 200
	httpClientError              = 400
	httpServerError              = 500
	ErrTemplateGetFamily         = "Unexpected error retrieving a family"
	ErrTemplateGetFamilyEvents   = "SQL failure while retrieving events for family. Family id is: %s"
	ErrTemplateAttendingCount    = "SQL failure while retrieving number attending. Event id is %s"
	ErrTemplateRSVPClient        = "Invalid operation! User tried to enter in attending number more than family members %s"
	ErrTemplateInvalidSecretCode = "Invalid Inputs - Secret Code for Validation"
	ErrTemplateInvalidFamilyName = "Invalid Inputs - Family Name for Validation"
	ErrTemplateInvalidFamilyID   = "Invalid Inputs - Family ID for Validation"
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
	familyID, err := validateId(c.Params.ByName("family_id"))
	if err != nil {
		c.JSON(httpClientError, gin.H{
			"Content-Type": "application/json",
			"message":      ErrTemplateInvalidFamilyID,
			"error":        err,
		})
		return
	}
	app.logger.Printf("Id is: %d", familyID)

	family, err := app.models.DB.GetFamilies(familyID)
	if err != nil {
		c.JSON(httpClientError, gin.H{
			"Content-Type": "application/json",
			"message":      ErrTemplateGetFamily,
			"error":        err,
		})
		return
	}

	c.JSON(httpSuccess, gin.H{
		"Content-Type": "application/json",
		"message":      family,
	})
	return
}

//validateFamily will validate the family information for one family against secret_code
func (app *application) validateFamily(c *gin.Context) {
	secretCode, err := validateSecretCode(c.Params.ByName(secret_code))
	if err != nil {
		c.JSON(httpClientError, gin.H{
			"Content-Type": "application/json",
			"valid":        false,
			"error":        ErrTemplateInvalidSecretCode,
		})
		return
	}

	familyName, err := validateFamilyName(c.Params.ByName(family_name))
	if err != nil {
		c.JSON(httpClientError, gin.H{
			"Content-Type": "application/json",
			"valid":        false,
			"error":        ErrTemplateInvalidFamilyName,
		})
		return
	}

	app.logger.Printf("secret-code is: %d", secretCode)
	app.logger.Printf("family-name is: %s", familyName)

	resp, err := app.models.DB.ValidateFamily(secretCode, familyName)
	if err != nil {
		app.logger.Printf("Unexpected error retrieving a family %v", err)
		c.JSON(httpServerError, gin.H{
			"Content-Type": "application/json",
			"valid":        false,
			"error":        ErrTemplateGetFamily,
		})
		return
	}

	var claims jwt.Claims
	claims.Subject = fmt.Sprint(familyName)
	claims.Issued = jwt.NewNumericTime(time.Now())
	claims.NotBefore = jwt.NewNumericTime(time.Now())
	claims.Expires = jwt.NewNumericTime(time.Now().Add(24 * time.Hour))
	claims.Issuer = "luvandkrishi.com"
	claims.Audiences = []string{"luvandkrishi.com"}

	jwtBytes, err := claims.HMACSign(jwt.HS256, []byte(app.config.jwt.secret))
	if err != nil {
		app.logger.Printf("Error signing request %v", err)
		c.JSON(httpServerError, gin.H{
			"Content-Type": "application/json",
			"valid":        false,
			"error":        "Error signing request",
		})
	}

	c.JSON(httpSuccess, gin.H{
		"Content-Type": "application/json",
		"response":     jwtBytes,
		"familyID":     resp.FamilyID,
		"valid":        resp.Exists,
	})
	return
}

//getOneEvent will get the event information for one event
func (app *application) getOneEvent(c *gin.Context) {
	//TODO: luv add validation
	id, err := validateId(c.Params.ByName("id"))
	if err != nil {
		c.JSON(httpClientError, gin.H{
			"Content-Type": "application/json",
			"message":      err.Error(),
		})
		return
	}
	app.logger.Printf("Id is: %d", id)

	event, err := app.models.DB.GetEvents(id)
	if err != nil {
		app.logger.Printf("Unexpected error retrieving a event %s", err)
		c.JSON(httpServerError, gin.H{
			"Content-Type": "application/json",
			"message":      err.Error(),
		})
		return
	}

	c.JSON(httpSuccess, gin.H{
		"Content-Type": "application/json",
		"message":      event,
	})
	return
}

//getEventsForFamily will get the event details that a family is invited for
func (app *application) getEventsForFamily(c *gin.Context) {
	familyID, err := validateId(c.Params.ByName("family_id"))
	if err != nil {
		c.JSON(httpClientError, gin.H{
			"Content-Type": "application/json",
			"message":      "Invalid family id",
			"error":        err.Error(),
		})
		return
	}
	app.logger.Printf("Family ID is: %d", familyID)

	familyEvents, err := app.models.DB.GetEventsForFamily(familyID)
	if err != nil {
		app.logger.Printf("Something went wrong with sql query to get events for family %s", err)
		c.JSON(httpServerError, gin.H{
			"Content-Type": "application/json",
			"message":      fmt.Sprintf(ErrTemplateGetFamilyEvents, familyID),
		})
		return
	}

	c.JSON(httpSuccess, gin.H{
		"Content-Type": "application/json",
		"message":      familyEvents,
	})
	return
}

func (app *application) getAttendingForEvent(c *gin.Context) {
	eventID, err := validateId(c.Params.ByName("event_id"))
	if err != nil {
		c.JSON(httpClientError, gin.H{
			"Content-Type": "application/json",
			"message":      "Invalid event id",
			"error":        err.Error(),
		})
		return
	}
	app.logger.Printf("EventID is: %d", eventID)

	attending, err := app.models.DB.GetAttendingForEvent(eventID)
	if err != nil {
		app.logger.Printf("Something went wrong with sql query to get attending families %s", err)
		c.JSON(httpServerError, gin.H{
			"Content-Type": "application/json",
			"message":      fmt.Sprintf(ErrTemplateAttendingCount, eventID),
			"error":        err.Error(),
		})
		return
	}

	c.JSON(httpSuccess, gin.H{
		"Content-Type": "application/json",
		"message":      attending,
	})
	return
}

//rsvpToEvent will put information for how many people are attending from a family
func (app *application) rsvpToEvent(c *gin.Context) {
	//TODO: luv add validation
	familyID, err := validateId(c.Params.ByName("family_id"))
	if err != nil {
		c.JSON(httpClientError, gin.H{
			"Content-Type": "application/json",
			"message":      "Invalid family id",
			"error":        err.Error(),
		})
		return
	}
	eventID, err := validateId(c.Params.ByName("event_id"))
	if err != nil {
		c.JSON(httpClientError, gin.H{
			"Content-Type": "application/json",
			"message":      "Invalid event id",
			"error":        err.Error(),
		})
	}
	//TODO: luv add validation
	attending, err := strconv.Atoi(c.Params.ByName("attending"))
	if err != nil {
		c.JSON(httpClientError, gin.H{
			"Content-Type": "application/json",
			"message":      "Invalid number attending",
			"error":        err.Error(),
		})
	}

	//check attending vs number of members
	// family, err := app.models.DB.GetFamilies(familyID)
	// if attending > family.Members {

	// }

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
