import { Contributor } from "./contributor.model";

export class Tender {
  constructor(
    public title: string,
    public comment: string,
    public startOn: string,
    public finishOn: string,
    public minPrice: number,
    public maxPrice: number,
    public isActive: boolean,
    public chosenContractor: {
      fullname?: string;
      userName?: string;
    },
    public contributors: Contributor[],
    public id?: number
  ) {}
}
