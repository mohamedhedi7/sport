import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myFilter'
})
export class MyFilterPipe implements PipeTransform {

  transform(tab: any, ch: string) {
    if(!ch) return tab
    return tab.filter((elm: any) => elm.teamOne.toLowerCase().includes(ch.toLowerCase()) || elm.teamTwo.toLowerCase().includes(ch.toLowerCase()))
  }
}
