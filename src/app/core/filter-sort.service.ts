import { Injectable } from '@angular/core';


@Injectable()
export class FilterSortService {

  constructor() { }

  private _objArrayCheck(array: any[]): boolean {
    // Checks if the first item in the array is an object
    // (assumes same-shape for all array items)
    // Necessary because some arrays passed in may have
    // models that don't match {[key: string]: any}[]
    // This check prevents uncaught reference errors
    const item0 = array[0];
    const check = !!(array.length && item0 !== null && Object.prototype.toString.call(item0) === '[object Object]');
    return check;
  }

  search(array: any[], query: string, excludeProps?: string|string[]) {
    // Optionally exclude properties from being searched
    if (!query || !this._objArrayCheck(array)) {
      return array;
    }
    const lQuery = query.toLowerCase();
    const filteredArray = array.filter(item => {
      for (const key in item) {
        if (item.hasOwnProperty(key)) {
          if (!excludeProps || excludeProps.indexOf(key) === -1) {
            const thisVal = item[key];
            if (
              typeof thisVal === 'string' &&
              thisVal.toLowerCase().indexOf(lQuery) !== -1
            ) {
              return true;
            } 
          }
        }
      }
    });
    return filteredArray;
  }

  noSearchResults(arr: any[], query: string): boolean {
    // Check if array searched by query returned any results
    return !!(!arr.length && query);
  }

}
