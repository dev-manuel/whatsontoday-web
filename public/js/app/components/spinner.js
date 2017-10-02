define(['ractive', 'rvc', 'rvc!comp/spinner'],
  function(Ractive,rvc,spinner) {
    return spinner.extend({
      data: {
      	panels: [
      		{
      			img: "assets/img/thumbnail.jpg",
      			text: "This is a testtext",
      			header: "Yay, header"
      		},
      		{
      			img: "assets/img/thumbnail.jpg",
      			text: "loool",
      			header: "Yay, header 2"
      		}
      	],
      	current: 0,
      },
      oninit: function(){},
      onupdate: function(){
        alert('Update');
      },
      on: {
        goLeft: function(a){
        	this.animate('current',(this.get('current')-1),{
        	  easing: 'easeInOut'
        	});
        },
        goRight: function(a){
        	this.animate('current',(this.get('current')+1),{
        	  easing: 'easeInOut'
        	});
        }
      }
    });
});