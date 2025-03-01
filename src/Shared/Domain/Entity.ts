import { INotification } from "../Common/INotification";

export abstract class Entity {
  private _id?: string;
  private _domainEvents: INotification[] = [];

  get id(): string | undefined {
    return this._id;
  }

  protected set id(value: string) {
    this._id = value;
  }

  get domainEvents(): INotification[] {
    return this._domainEvents;
  }

  public addDomainEvent(event: INotification): void {
    this._domainEvents.push(event);
  }

  public removeDomainEvent(event: INotification): void {
    this._domainEvents = this._domainEvents.filter((e) => e !== event);
  }

  public clearDomainEvents(): void {
    this._domainEvents = [];
  }

  public isTransient(): boolean {
    return this._id === undefined;
  }

  public equals(obj: any): boolean {
    if (obj === null || obj === undefined) {
      return false;
    }

    if (obj.constructor.name !== this.constructor.name) {
      return false;
    }

    if (obj === this) {
      return true;
    }

    if (<Entity>obj?.isTransient() || this.isTransient()) {
      return false;
    }

    return this._id === obj._id;
  }
}
