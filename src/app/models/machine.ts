export class Machine {
  Id: number = 0;
  MachineName!: string;
  WashTypeId: number = 0;
  IsActive!: boolean;
  Status!: string; // available , Reservedbyyou, occupied
}
