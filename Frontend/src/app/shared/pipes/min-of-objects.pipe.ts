import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "minOfObjects",
})
export class MinOfObjectsPipe implements PipeTransform {
  transform(value: any[], colName: string): string | null {
    let arrayOf_Oject: any[] = [];
    let result: number;
    value.forEach((object) => {
      arrayOf_Oject.push(object[colName]);
    });
    result = arrayOf_Oject[0];
    arrayOf_Oject.forEach((item) => {
      result = +item < result ? +item : result;
    });
    return result.toString();
  }
}
