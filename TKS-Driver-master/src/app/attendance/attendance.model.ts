export class AttendanceData {
  public date: string;
  public status: string;
  public checkin: string;
  public checkout: string;
  public duration: string;

  constructor(date:string, status: string, checkin: string, checkout: string, duration: string) {
    this.date = date;
    this.status = status;
    this.checkin = checkin;
    this.checkout = checkout;
    this.duration = duration;
  }
}