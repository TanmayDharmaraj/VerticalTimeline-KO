function DataModel(data){
	var self = this;
	self.Type = data.Type;
	self.Head = data.Head;
	self.MediaUrl = data.MediaUrl?data.MediaUrl : false;
	self.Content = data.Content;
	self.MoreLink = data.MoreLink? {
						Text : data.MoreLink.Text, 
						Href : data.MoreLink.Href
					}: false;
	self.Date = data.Date;
}

function ViewModel(){
	var self=this;
	
	self.TemplateItems = ko.observableArray([]);
	
	self.addAnimation = function(elements){
		$( elements ).each(function(){
			if($(this).offset().top > $(window).scrollTop()+$(window).height()*0.75) {
				$(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
			}		
		});
		
		//on scolling, show/animate timeline blocks when enter the viewport
		$(window).on('scroll', function(){
			$(elements).each(function(){
				if( $(this).offset().top <= $(window).scrollTop()+$(window).height()*0.75 && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) {
				$(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');	
				}	
			});	
		});
	};
	
	//contructor.
	$.getJSON("data.json")
			.done(function( result ){
					$.map(result,function(item){
						self.TemplateItems.push(new DataModel(item))
					});				
			})
			.fail(function( jqxhr, textStatus, error ) {
					var err = textStatus + ", " + error;
					console.log( "Request Failed: " + err );
			});	
}

jQuery(document).ready(function($){
	var obj = new ViewModel();
	ko.applyBindings(obj);
});