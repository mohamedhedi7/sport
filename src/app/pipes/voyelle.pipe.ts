import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'voyelle'
})
export class VoyellePipe implements PipeTransform {
  tab: any = ["a", "e", "y", "o", "u", "i"]
  transform(ch: string) {
    var chn = ""
    for (let i = 0; i < ch.length; i++) {
      var x=ch[i]
      for (let j = 0; j < this.tab.length; j++) {        
        if(x == this.tab[j]){
          x="*"
          break
        } 
      }
      chn+=x
    }
    return chn
  }
}
