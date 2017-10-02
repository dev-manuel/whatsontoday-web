requirejs.config({
  baseUrl: 'assets/js/lib',
  paths: {
    app: '../app',
    comp: '../components',
    ractive: 'ractive',
    rvc: 'rvc'
  }
});

requirejs(['ractive', 'rvc', 'text',
  'rvc!comp/main','text!comp/overview.html','app/components/datePicker', 'app/components/filter', 'app/components/spinner'],
  function(Ractive,rvc,reqText,Main,ov,datePicker,filt,spinner) {
	Ractive.DEBUG = false;

    var ractive = new Main({
      target: "#content",
      data: {
        page: 'main',
        loading: false,
        events: [{date: "2017-05-10", name: "Test", organizer: "Peter"},
        	{date: "2017-05-10", name: "Test", organizer: "Peter"},
        	{date: "2017-05-10", name: "Test", organizer: "Peter"},
        	{date: "2017-05-10", name: "Test", organizer: "Peter"},
        	{date: "2017-05-10", name: "Test", organizer: "Peter"},
        	{date: "2017-05-10", name: "Test", organizer: "Peter"},
        	{date: "2017-05-10", name: "Test", organizer: "Peter"},
        	{date: "2017-05-10", name: "Test", organizer: "Peter"},
        	{date: "2017-05-10", name: "Test", organizer: "Peter"},
        	{date: "2017-05-10", name: "Test", organizer: "Peter"},
        	{date: "2017-05-10", name: "Test", organizer: "Peter"},
        	{date: "2017-05-10", name: "Test", organizer: "Peter"},
        	{date: "2017-05-10", name: "Test", organizer: "Peter"},
        	{date: "2017-05-10", name: "Test", organizer: "Peter"},
        	{date: "2017-05-10", name: "Test", organizer: "Peter"}],
        filters: {
        	fromDate: "2017-07-18",
        	toDate: "2017-07-18"
        }
      },
      partials: { overview: ov },
      components: {
        datePicker: datePicker,
        filt: filt,
        spinner: spinner
      }
    });
});
