export class Reservation {
  Id: number = 0;
  MachineId: number = 0;
  UserName!: string;
  WashTypeId: number = 0;
  ReservedAt!: Date;
  StartsAt!: Date;
  ExpiresAt!: Date;
  IsActive!: boolean;
  CheckedIn!: boolean;
}
