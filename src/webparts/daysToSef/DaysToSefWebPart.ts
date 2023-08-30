import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration, PropertyPaneTextField, PropertyPaneToggle, PropertyPaneDropdown} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import styles from './DaysToSefWebPart.module.scss';
import * as strings from 'DaysToSefWebPartStrings';
import randSpeaker from './assets/randomNumber';

export interface IDaysToSefWebPartProps {
  description: string;
  eventHeader: string; 
  eventText: string; 
  eventYearDropdown: string;
  eventMonthDropdown: string;
  eventDay: string;
  eventHour: string;
  eventMinute: string;
  eventSecond: string;
  createdBy: string; 
  toggleDarkmode: boolean;
  toggleCreated: boolean;
  toggleSpeaker: boolean;
}

export default class DaysToSefWebPart extends BaseClientSideWebPart<IDaysToSefWebPartProps> {

  // Let's render this
  public render(): void {

    this.dateFunctions(); 
    const dateReturned = this.dateFunctions();
    const darkModeisActive = this.darkMode();
    const showCreatedActive = this.showCreated();
    const showSpeakerActive = this.showSpeaker();

    // HTML and CSS here..
    this.domElement.innerHTML = `

  <style>
    @import url("https://fonts.googleapis.com/css?family=Roboto:100,900&display=swap");
    @import url("https://fonts.googleapis.com/css?family=Montserrat");

    #contentText {text-align: center; 
      position: relative;
      top: -5px;}
    .timeLeftWrapper {display: inline-block}
    .days, .hours, .minutes {
      background: #eaeef2;
      background-image: linear-gradient(180deg, #eaeef2 10%, #FFFFFF 100%);
      border-radius: 0.25em;
      box-shadow: 0 20px 30px -10px rgba(76, 99, 119, 0.1), inset 0 -1px 0 0 rgba(76, 99, 119, 0.3), inset 0 1px 0 0 #fff;
      color: #4C6377;  display: inline-block;
      font-family: "Roboto", sans-serif;
      font-size: 3em; 
      font-weight: 900;
      position: relative; text-align: center;
      margin: 0 0.05em;
      padding: 0.4em 0;
      padding-left: 20px;
      padding-right: 20px;
      min-width: 40px;
  }
    .days:after, .hours:after, .minutes:after {
      background: rgba(16, 21, 26, 0.05);
      box-shadow: 0 2px 1px 0 rgba(255, 255, 255, 0.2);
      content: ""; display: block; height: 1px; 
      position: relative;
      top: -25px; left: -16px;
      width: 165%;
    }
    .daysText, .hoursText, .minutesText {
      font-size: 11px; 
      position: relative; top: -20px;
      font-family: "Roboto", sans-serif;
      font-family: "Montserrat", sans-serif;
      color: #000000; margin: auto; width: 50%;
      text-align: -webkit-center;
    }
    @media only screen and (max-width: 600px) {
      .days, .hours, .minutes {
        padding-left: 100px; padding-right: 100px;
      }
    }

    .darkMode {background: #000; color: #d5d5d5}
    .darkMode #headerIcon {display:none}
    .lightMode {color:#333}
    .lightMode > section {color: #333}
    .showCreated {display:block}
    .hideCreated {display:none}
    .showSpeaker {display:block}
    .hideSpeaker {display:none}

  </style>

    <main class="${styles.wrapper} ${darkModeisActive}">
      <article id="mainHolder" class="${styles.main}">
        <section class="${styles.header}">
          <h2 class="${styles.eventHeader}"}>${(this.properties.eventHeader)}</h2>
          <img id="headerIcon" class="${styles.icon}" src="${require<string>('./assets/calendar.png')}" alt="Today" />
          <h2 class="${styles.headerText} ${darkModeisActive}">
            ${(this.properties.eventYearDropdown)}-${(this.properties.eventMonthDropdown)}-${(this.properties.eventDay)} ${(this.properties.eventHour)}:${(this.properties.eventMinute)}
          </h2>
          <div id="contentText" class="${styles.contentText} ${darkModeisActive}"> ${(this.properties.eventText)}</div>
          <div id="timeLeft" class="${styles.timeLeft}"></div>
        </section> 
        <section class="${styles.speakerInSpotlighWrapper} ${showSpeakerActive}">
          <div class="${styles.speakerInSpotlight}">Speaker in spotlight</div>
          <div class="${styles.speakerImgWrapper}">
            <img class="${styles.speakerPic}" src="${randSpeaker.imagePath}" />
          </div>
          <div class="${styles.speakerName}">${randSpeaker.name}, ${randSpeaker.company}</div>
          <div class="${styles.speakerBio}">${randSpeaker.bio} ...</div>
          <div class="${styles.speakerReadMore}"><a href="${randSpeaker.readMore}#${randSpeaker.anchor}" target="_blank">Read more.. </a></div>
        </section>
        <section id="webpartFooter" class="${styles.webpartFooter}">
          <div class="${styles.createdBy} ${showCreatedActive}">${(this.properties.createdBy)}</div>
          <div class="${styles.countingToText}">
            <span>Today it's: </span>
            <span class="${styles.countingToDate}">
              ${dateReturned}
            </span>
          </div>
        </section>
      </article>
    </main>

    `;

    this.countDown();
   
  }

  // Countdown
  private countDown():void {

    const eventYearConst = this.properties.eventYearDropdown;
    const eventMonthConst = this.properties.eventMonthDropdown;
    const eventDayConst = this.properties.eventDay;
    const eventHourConst = this.properties.eventHour;
    const eventMinuteConst = this.properties.eventMinute;
    const eventTime = eventHourConst + ":" + eventMinuteConst + ":00";
    const countDownDate = new Date(eventMonthConst + " " + eventDayConst + ", " + eventYearConst + " " + eventTime).getTime();
    const now = new Date().getTime();
    const distance = countDownDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      // If the event is over..
      if (distance < 0) {
          document.getElementById('mainHolder').style.opacity = '0.4';
          document.getElementById('contentText').style.opacity = '0.3';
          document.getElementById("timeLeft").innerHTML = "This event is over by now..";
            return;
      }
      // Don't show days or hours if it's a zero
      const timeLeftElement = document.getElementById("timeLeft");
      const daysText = days !== 0 && `
      <div class='timeLeftWrapper'>
        <div class='days'>${days} </div><div class='daysText'>Days</div>
      </div>  
      `;
      let formattedTimeText = '';
      if (hours > 0) {
        formattedTimeText += `
        <div class='timeLeftWrapper'>
          <div class='hours'>${hours} </div><div class='hoursText'>Hours</div> 
        </div>`;
      }
      formattedTimeText += `
        <div class='timeLeftWrapper'>
          <div class='minutes'>${minutes} </div><div class='minutesText'>Minutes</div> 
        </div>
      `;
      timeLeftElement.innerHTML = `${daysText || ''}${formattedTimeText}`;
      
  }

  // Todays date
  private dateFunctions(): string {
    const now = new Date().toISOString().substring(0, 10);
    const todaysDate = `${now}`;
      return todaysDate;
  }

  // Darkmode theme
  private darkMode():string {
    let darkModeisActive = "lightMode"; 
        if (this.properties.toggleDarkmode){
          darkModeisActive = "darkMode";
        }
        return (darkModeisActive);
  }

  // Show or hide created
  private showCreated():string {
    let showCreatedActive = "showCreated"; 
        if (this.properties.toggleCreated){
          showCreatedActive = "hideCreated";
    }
    return (showCreatedActive);
  }

  // Show or hide speaker in focus
  private showSpeaker():string {
    let showSpeakerActive = "showSpeaker"; 
        if (this.properties.toggleSpeaker) {
          showSpeakerActive = "hideSpeaker";
    }
    return (showSpeakerActive);
  }

  // Validate web part property values for the header text field
  private validateHeaderText(value: string): string {
    if (value === null ||
      value.trim().length === 0) {
      return 'Please enter a header here';
    }
    if (value.length > 70) {
      return 'The header cannot be longer than 70 characters';
    }
    return '';
  }


  // Validate web part property values for the text content field
  private validateEventTextField(value: string): string {
    if (value === null ||
      value.trim().length === 0) {
      return 'Please enter a text here';
    }
    if (value.length > 300) {
      return 'Description cannot be longer than 300 characters';
    }
    return '';
  }

  // Validate web part property values for the created by field
  private validateCreatedByField(value: string): string {
    if (value.length > 160) {
      return 'This text cannot be longer than 160 characters';
    }
    return '';
  }

  // Validate web part property values for the day field
  private validateDayField(value: string): string {
    const validDays = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
    if (value === null ||
      value.trim().length === 0) {
      return 'Please enter a day here (01-31)';
    }
    if (validDays.indexOf(value) === -1) {
      return 'Only 01 to 31 is possible to enter here..';
    }
    return '';
  }

  // Validate web part property values for the hour field
  private validateHourField(value: string): string {
    const validHours= ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];
    if (value === null ||
      value.trim().length === 0) {
      return 'Please enter an hour here (00-24)';
    }
    if (validHours.indexOf(value) === -1) {
      return 'Only 00 to 24 is possible to enter here..';
    }
    return '';
  }

  // Validate web part property values for the minute field, all the allowed valuts in an array, loop the 00-09 to avoid a long array..
  private validateMinuteField(value: string): string {
    const validMinutes = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09'];
    for (let i = 10; i <= 59; i++) {
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
  }

  // Properties in the settings
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
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
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

}
