var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Version } from '@microsoft/sp-core-library';
import { PropertyPaneTextField, PropertyPaneToggle, PropertyPaneDropdown } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import styles from './DaysToSefWebPart.module.scss';
import * as strings from 'DaysToSefWebPartStrings';
import randSpeaker from './assets/randomNumber';
var DaysToSefWebPart = /** @class */ (function (_super) {
    __extends(DaysToSefWebPart, _super);
    function DaysToSefWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Let's render this
    DaysToSefWebPart.prototype.render = function () {
        this.dateFunctions();
        var dateReturned = this.dateFunctions();
        var darkModeisActive = this.darkMode();
        var showCreatedActive = this.showCreated();
        var showSpeakerActive = this.showSpeaker();
        // HTML and CSS here..
        this.domElement.innerHTML = "\n\n  <style>\n    @import url(\"https://fonts.googleapis.com/css?family=Roboto:100,900&display=swap\");\n    @import url(\"https://fonts.googleapis.com/css?family=Montserrat\");\n\n    #contentText {text-align: center; \n      position: relative;\n      top: -5px;}\n    .timeLeftWrapper {display: inline-block}\n    .days, .hours, .minutes {\n      background: #eaeef2;\n      background-image: linear-gradient(180deg, #eaeef2 10%, #FFFFFF 100%);\n      border-radius: 0.25em;\n      box-shadow: 0 20px 30px -10px rgba(76, 99, 119, 0.1), inset 0 -1px 0 0 rgba(76, 99, 119, 0.3), inset 0 1px 0 0 #fff;\n      color: #4C6377;  display: inline-block;\n      font-family: \"Roboto\", sans-serif;\n      font-size: 3em; \n      font-weight: 900;\n      position: relative; text-align: center;\n      margin: 0 0.05em;\n      padding: 0.4em 0;\n      padding-left: 20px;\n      padding-right: 20px;\n      min-width: 40px;\n  }\n    .days:after, .hours:after, .minutes:after {\n      background: rgba(16, 21, 26, 0.05);\n      box-shadow: 0 2px 1px 0 rgba(255, 255, 255, 0.2);\n      content: \"\"; display: block; height: 1px; \n      position: relative;\n      top: -25px; left: -16px;\n      width: 165%;\n    }\n    .daysText, .hoursText, .minutesText {\n      font-size: 11px; \n      position: relative; top: -20px;\n      font-family: \"Roboto\", sans-serif;\n      font-family: \"Montserrat\", sans-serif;\n      color: #000000; margin: auto; width: 50%;\n      text-align: -webkit-center;\n    }\n    @media only screen and (max-width: 600px) {\n      .days, .hours, .minutes {\n        padding-left: 100px; padding-right: 100px;\n      }\n    }\n\n    .darkMode {background: #000; color: #d5d5d5}\n    .darkMode #headerIcon {display:none}\n    .lightMode {color:#333}\n    .lightMode > section {color: #333}\n    .showCreated {display:block}\n    .hideCreated {display:none}\n    .showSpeaker {display:block}\n    .hideSpeaker {display:none}\n\n  </style>\n\n    <main class=\"".concat(styles.wrapper, " ").concat(darkModeisActive, "\">\n      <article id=\"mainHolder\" class=\"").concat(styles.main, "\">\n        <section class=\"").concat(styles.header, "\">\n          <h2 class=\"").concat(styles.eventHeader, "\"}>").concat((this.properties.eventHeader), "</h2>\n          <img id=\"headerIcon\" class=\"").concat(styles.icon, "\" src=\"").concat(require('./assets/calendar.png'), "\" alt=\"Today\" />\n          <h2 class=\"").concat(styles.headerText, " ").concat(darkModeisActive, "\">\n            ").concat((this.properties.eventYearDropdown), "-").concat((this.properties.eventMonthDropdown), "-").concat((this.properties.eventDay), " ").concat((this.properties.eventHour), ":").concat((this.properties.eventMinute), "\n          </h2>\n          <div id=\"contentText\" class=\"").concat(styles.contentText, " ").concat(darkModeisActive, "\"> ").concat((this.properties.eventText), "</div>\n          <div id=\"timeLeft\" class=\"").concat(styles.timeLeft, "\"></div>\n        </section> \n        <section class=\"").concat(styles.speakerInSpotlighWrapper, " ").concat(showSpeakerActive, "\">\n          <div class=\"").concat(styles.speakerInSpotlight, "\">Speaker in spotlight</div>\n          <div class=\"").concat(styles.speakerImgWrapper, "\">\n            <img class=\"").concat(styles.speakerPic, "\" src=\"").concat(randSpeaker.imagePath, "\" />\n          </div>\n          <div class=\"").concat(styles.speakerName, "\">").concat(randSpeaker.name, ", ").concat(randSpeaker.company, "</div>\n          <div class=\"").concat(styles.speakerBio, "\">").concat(randSpeaker.bio, " ...</div>\n          <div class=\"").concat(styles.speakerReadMore, "\"><a href=\"").concat(randSpeaker.readMore, "#").concat(randSpeaker.anchor, "\" target=\"_blank\">Read more.. </a></div>\n        </section>\n        <section id=\"webpartFooter\" class=\"").concat(styles.webpartFooter, "\">\n          <div class=\"").concat(styles.createdBy, " ").concat(showCreatedActive, "\">").concat((this.properties.createdBy), "</div>\n          <div class=\"").concat(styles.countingToText, "\">\n            <span>Today it's: </span>\n            <span class=\"").concat(styles.countingToDate, "\">\n              ").concat(dateReturned, "\n            </span>\n          </div>\n        </section>\n      </article>\n    </main>\n\n    ");
        this.countDown();
    };
    // Countdown
    DaysToSefWebPart.prototype.countDown = function () {
        var eventYearConst = this.properties.eventYearDropdown;
        var eventMonthConst = this.properties.eventMonthDropdown;
        var eventDayConst = this.properties.eventDay;
        var eventHourConst = this.properties.eventHour;
        var eventMinuteConst = this.properties.eventMinute;
        var eventTime = eventHourConst + ":" + eventMinuteConst + ":00";
        var countDownDate = new Date(eventMonthConst + " " + eventDayConst + ", " + eventYearConst + " " + eventTime).getTime();
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        // If the event is over..
        if (distance < 0) {
            document.getElementById('mainHolder').style.opacity = '0.4';
            document.getElementById('contentText').style.opacity = '0.3';
            document.getElementById("timeLeft").innerHTML = "This event is over by now..";
            return;
        }
        // Don't show days or hours if it's a zero
        var timeLeftElement = document.getElementById("timeLeft");
        var daysText = days !== 0 && "\n      <div class='timeLeftWrapper'>\n        <div class='days'>".concat(days, " </div><div class='daysText'>Days</div>\n      </div>  \n      ");
        var formattedTimeText = '';
        if (hours > 0) {
            formattedTimeText += "\n        <div class='timeLeftWrapper'>\n          <div class='hours'>".concat(hours, " </div><div class='hoursText'>Hours</div> \n        </div>");
        }
        formattedTimeText += "\n        <div class='timeLeftWrapper'>\n          <div class='minutes'>".concat(minutes, " </div><div class='minutesText'>Minutes</div> \n        </div>\n      ");
        timeLeftElement.innerHTML = "".concat(daysText || '').concat(formattedTimeText);
    };
    // Todays date
    DaysToSefWebPart.prototype.dateFunctions = function () {
        var now = new Date().toISOString().substring(0, 10);
        var todaysDate = "".concat(now);
        return todaysDate;
    };
    // Darkmode theme
    DaysToSefWebPart.prototype.darkMode = function () {
        var darkModeisActive = "lightMode";
        if (this.properties.toggleDarkmode) {
            darkModeisActive = "darkMode";
        }
        return (darkModeisActive);
    };
    // Show or hide created
    DaysToSefWebPart.prototype.showCreated = function () {
        var showCreatedActive = "showCreated";
        if (this.properties.toggleCreated) {
            showCreatedActive = "hideCreated";
        }
        return (showCreatedActive);
    };
    // Show or hide speaker in focus
    DaysToSefWebPart.prototype.showSpeaker = function () {
        var showSpeakerActive = "showSpeaker";
        if (this.properties.toggleSpeaker) {
            showSpeakerActive = "hideSpeaker";
        }
        return (showSpeakerActive);
    };
    // Validate web part property values for the header text field
    DaysToSefWebPart.prototype.validateHeaderText = function (value) {
        if (value === null ||
            value.trim().length === 0) {
            return 'Please enter a header here';
        }
        if (value.length > 70) {
            return 'The header cannot be longer than 70 characters';
        }
        return '';
    };
    // Validate web part property values for the text content field
    DaysToSefWebPart.prototype.validateEventTextField = function (value) {
        if (value === null ||
            value.trim().length === 0) {
            return 'Please enter a text here';
        }
        if (value.length > 300) {
            return 'Description cannot be longer than 300 characters';
        }
        return '';
    };
    // Validate web part property values for the created by field
    DaysToSefWebPart.prototype.validateCreatedByField = function (value) {
        if (value.length > 160) {
            return 'This text cannot be longer than 160 characters';
        }
        return '';
    };
    // Validate web part property values for the day field
    DaysToSefWebPart.prototype.validateDayField = function (value) {
        var validDays = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
        if (value === null ||
            value.trim().length === 0) {
            return 'Please enter a day here (01-31)';
        }
        if (validDays.indexOf(value) === -1) {
            return 'Only 01 to 31 is possible to enter here..';
        }
        return '';
    };
    // Validate web part property values for the hour field
    DaysToSefWebPart.prototype.validateHourField = function (value) {
        var validHours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];
        if (value === null ||
            value.trim().length === 0) {
            return 'Please enter an hour here (00-24)';
        }
        if (validHours.indexOf(value) === -1) {
            return 'Only 00 to 24 is possible to enter here..';
        }
        return '';
    };
    // Validate web part property values for the minute field, all the allowed valuts in an array, loop the 00-09 to avoid a long array..
    DaysToSefWebPart.prototype.validateMinuteField = function (value) {
        var validMinutes = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09'];
        for (var i = 10; i <= 59; i++) {
            validMinutes.push(i.toString());
        }
        if (value === null ||
            value.trim().length === 0) {
            return 'Please provide an minute here (00-59)';
        }
        if (validMinutes.indexOf(value) === -1) {
            return 'Only 00 to 59 is possible to enter here..';
        }
        return '';
    };
    // Properties in the settings
    DaysToSefWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.ContentFieldLabel
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                PropertyPaneTextField('eventHeader', {
                                    label: "Event header",
                                    onGetErrorMessage: this.validateHeaderText.bind(this)
                                }),
                                PropertyPaneTextField('eventText', {
                                    label: "Event text",
                                    onGetErrorMessage: this.validateEventTextField.bind(this)
                                }),
                                PropertyPaneDropdown('eventYearDropdown', {
                                    label: "Year",
                                    options: [
                                        { key: '2023', text: '2023' },
                                        { key: '2024', text: '2024' },
                                        { key: '2025', text: '2025' },
                                        { key: '2026', text: '2026' },
                                        { key: '2027', text: '2027' },
                                        { key: '2028', text: '2028' },
                                        { key: '2029', text: '2029' },
                                        { key: '2030', text: '2030' },
                                        { key: '2031', text: '2031' },
                                        { key: '2032', text: '2032' },
                                        { key: '2033', text: '2033' },
                                        { key: '2034', text: '2034' },
                                        { key: '2035', text: '2035' },
                                        { key: '2036', text: '2036' },
                                        { key: '2037', text: '2037' }
                                    ]
                                }),
                                PropertyPaneDropdown('eventMonthDropdown', {
                                    label: "Month",
                                    options: [
                                        { key: '01', text: 'January' },
                                        { key: '02', text: 'February' },
                                        { key: '03', text: 'March' },
                                        { key: '04', text: 'April' },
                                        { key: '05', text: 'May' },
                                        { key: '06', text: 'June' },
                                        { key: '07', text: 'July' },
                                        { key: '08', text: 'August' },
                                        { key: '09', text: 'September' },
                                        { key: '10', text: 'October' },
                                        { key: '11', text: 'November ' },
                                        { key: '12', text: 'December' }
                                    ]
                                }),
                                PropertyPaneTextField('eventDay', {
                                    label: "Day (01-31)",
                                    onGetErrorMessage: this.validateDayField.bind(this)
                                }),
                                PropertyPaneTextField('eventHour', {
                                    label: "Hour (00-24)",
                                    onGetErrorMessage: this.validateHourField.bind(this)
                                }),
                                PropertyPaneTextField('eventMinute', {
                                    label: "Minute (00-59)",
                                    onGetErrorMessage: this.validateMinuteField.bind(this)
                                }),
                                PropertyPaneTextField('createdBy', {
                                    label: "Created by",
                                    onGetErrorMessage: this.validateCreatedByField.bind(this)
                                }),
                                PropertyPaneToggle('toggleDarkmode', {
                                    label: "Dark mode"
                                }),
                                PropertyPaneToggle('toggleCreated', {
                                    label: "Hide Created"
                                }),
                                PropertyPaneToggle('toggleSpeaker', {
                                    label: "Hide Speaker in spotlight"
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    Object.defineProperty(DaysToSefWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: false,
        configurable: true
    });
    return DaysToSefWebPart;
}(BaseClientSideWebPart));
export default DaysToSefWebPart;
//# sourceMappingURL=DaysToSefWebPart.js.map