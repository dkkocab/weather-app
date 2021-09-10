export class ForecastModel{
    public City: string
    public Icons: Array<string> = new Array<string>()
    public DateTimeTemperature: Array<DateTimeTemp> = new Array<DateTimeTemp>()
}

export class DateTimeTemp{
    public Date: string
    public Time: string
    public Temp: string
}