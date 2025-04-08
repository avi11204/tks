export class Tasks {
  public orderId: string;
  public name: string;
  public material: string;
  public quant: number;
  public place: string;

  constructor(orderId:string ,name: string,material: string,quant: number, place: string) {
    this.orderId = orderId;
    this.name = name;
    this.material = material;
    this.quant = quant;
    this.place = place;
  }
}