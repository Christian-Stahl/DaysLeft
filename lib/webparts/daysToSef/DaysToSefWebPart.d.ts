import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
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
    render(): void;
    private countDown;
    private dateFunctions;
    private darkMode;
    private showCreated;
    private showSpeaker;
    private validateHeaderText;
    private validateEventTextField;
    private validateCreatedByField;
    private validateDayField;
    private validateHourField;
    private validateMinuteField;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
    protected get dataVersion(): Version;
}
//# sourceMappingURL=DaysToSefWebPart.d.ts.map