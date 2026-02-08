import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(ch : string){
    var chn =""
    for (let i = 0; i < ch.length; i++) {
      chn=ch[i]+chn
    }
    return chn
  }

}
