
function AppLSAC() {
	// see https://en.wikiversity.org/wiki/AppLSAC
	//--- Navigation -----
	this.nav = {
		"page": function(pid) {
			pid = pid || this.menu.current;
			//console.log("Current Page:"+this.menu.current);
			this.menu.goto_page(pid);
		},
		//---- Menu -----
		"menu":	{
			"current": "home",
			"goto_page": function(pid) {
				pid = pid || this.current;
				if (pid !== this.current) {
					console.log("Goto Page: '"+pid+"' (current page: '"+this.current+"')");
				};
				// store the current page ID in the page-container
				//$('#page-container').attr("currentpage",this.current);

				//this.hide_all_pages();
				$('.pages-app').hide();

				this.current = pid;
				this.hide();
				// use JQuery to show page as DOM element with ID=this.menu.current
				$('#'+this.current).show();
			},
			"hide": function () {
				if ($('ul.opening').is(":visible")) {
  					console.log("MENU: visible > hide menu!");
  					$('ul').toggleClass('opening');
  					$('.menu-toggle').toggleClass('open');
  					this.hide_all_pages();
  					this.goto_page(this.current);
  				} else {
  					//console.log("MENU: is already hidden");
  				};
			},
			"show": function () {
				if ($('ul.opening').is(":visible")) {
  					//console.log("MENU: already visible ");
  				} else {
  					console.log("MENU: is hidden > show menu!");
  					this.hide_all_pages();
  					$('.menu-toggle').toggleClass('open');
  				};
			},
			"toggle": function () {
				$('ul').toggleClass('opening');
  				$('.menu-toggle').toggleClass('open');
  				if ($('ul.opening').is(":visible")) {
  					//console.log("TOGGLE MENU: hide menu ");
  					$('.pages-app').hide();
  				} else {
  					var pageid = $('#page-container').attr("currentpage");
  					//console.log("TOGGLE MENU: hide and show page '" + pageid + "'");
  					$('#'+pageid).show();
  				};
			},
			"hide_all_pages": function () {
				$('.pages-app').hide();
			},
			"show_all_pages": function () {
				$('.pages-app').show();
			}
		},
		//--- Event Handler ----
		"evt" : {
			"show_message": function (pMsg) {
					console.log("CALL: app.evt.show_message(pMsg)");
					if ($('ul.opening').is(":visible")) {
							//console.log("MENU: visible > hide menu!");
							// hide menu
							$('ul').toggleClass('opening');
							// change [X] to Hamburger icon
							$('.menu-toggle').toggleClass('open');
					};
					// hide all pages
					$('.pages-app').hide();
					// show alert message
					alert(pMsg);
					// show page "download"
					$('#download').show();
			} //--close: msg
		}  //--close: evt
	}  //--close: nav

};

var app = new AppLSAC();
