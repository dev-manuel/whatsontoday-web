define(['ractive', 'rvc', 'rvc!comp/datePicker'],
  function(Ractive,rvc,datePicker) {
    return datePicker.extend({
      data: {
        panelShown: false
      },
      oninit: function(){
        this.observe('date',function(){
          var dateSplit = this.get('date').split("-");
          this.set({
            year: parseInt(dateSplit[0]),
            month: parseInt(dateSplit[1]),
            day: parseInt(dateSplit[2])
          });
          this.updateRows();
        });
      },
      onupdate: function(){
        alert('Update');
      },
      on: {
        setMonth: function(a,nm){
          if(nm>12){
            this.set({
              month: nm-12,
              year: this.get('year')+1
            });
          } else if(nm<1){
            this.set({
              month: nm+12,
              year: this.get('year')-1
            });
          } else {
            this.set('month', nm);
          }
          this.updateRows();
        },
        setDay: function(a,i,j){
          var d = this.getDay(i,j);
          if(d>0){
            this.set('day',d);
            this.set('panelShown', false);
            this.updateDate();
          }
        }
      },
      updateDate: function(){
        var month = this.get('month');
        var day = this.get('day');
        this.set('date',this.get('year') + "-" +
          (month<10 ? "0" + month : month) + "-" + (day<10 ? "0" + day : day));
      },
      getWeeks: function(){
        if(this.get('weeks')==4)
          return [1,2,3,4];
        else if(this.get('weeks')==5)
          return [1,2,3,4,5];
        else
          return [1,2,3,4,5,6];
      },
      updateRows: function(){
        this.set('weeks',this.weekCount(this.get('year'),this.get('month')));
      },
      weekCount: function(year, month_number) {
        var firstOfMonth = new Date(year, month_number-1, 1);
        var lastOfMonth = new Date(year, month_number, 0);
        var used = firstOfMonth.getDay() - 1 + lastOfMonth.getDate();
        return Math.ceil( used / 7);
      },
      getDay: function(week,day) {
        var month = this.get('month');
        var year = this.get('year');
        var fM = new Date(year, month-1, 1);
        var lM = new Date(year, month, 0);
        var r = week*7+day-fM.getDay()+2;
        if(r>lM.getDate())
          r = 0;
        return r;
      },
      renderMonth: function(month){
        switch (month) {
          case 1: return "Januar";
          case 2: return "Februar";
          case 3: return "März";
          case 4: return "April";
          case 5: return "Mai";
          case 6: return "Juni";
          case 7: return "Juli";
          case 8: return "August";
          case 9: return "September";
          case 10: return "Oktober";
          case 11: return "November";
          default: return "Dezember";
        }
      },
      isPicked: function(i,j){
        var day = this.getDay(i,j);
        var month = this.get('month');
        var dateStr = this.get('year') + "-" +
          (month<10 ? "0" + month : month) + "-" + (day<10 ? "0" + day : day);
        return day>0 && (this.get('date') === dateStr);
      }
    });
});
