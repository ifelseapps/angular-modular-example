export interface IMenuItem {
  name: string;
  path: string;
  children?: IMenuItem[];
}
