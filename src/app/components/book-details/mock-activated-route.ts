import { convertToParamMap, ParamMap } from '@angular/router';
import { ReplaySubject } from 'rxjs';

export class MockActivatedRoute {
  private paramMapSubject = new ReplaySubject<ParamMap>();
  paramMap = this.paramMapSubject.asObservable();

  constructor(initialParams: { [key: string]: string }) {
    this.setParamMap(initialParams);
  }

  setParamMap(params: { [key: string]: string }): void {
    this.paramMapSubject.next(convertToParamMap(params));
  }
}
