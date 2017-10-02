define(['ractive', 'rvc', 'rvc!comp/filter', 'app/components/datePicker'],
  function(Ractive,rvc,filter, datePicker) {
    return filter.extend({
      data: {},
      oninit: function(){
        
      },
      onupdate: function(){
        alert('Update');
      },
      on: {
        
      },
      components: {
      	datePicker: datePicker
      }
    });
});