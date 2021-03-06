jQuery(document).ready(function($) {
	'use strict';
	
    $("#loading").ajaxStart(function () {
        $(this).show();
    });

    $("#loading").ajaxStop(function () {
        $(this).hide();
    });
});

function pmaddpost(posttitle, postcontent, postcategory, posttags, poststatus, postpriority, postassignto) {
	"use strict";

	var postCatergoryArray = new Array();
	var postTagsArray = new Array();
	var postStatusArray = new Array();
	var postPriorityArray = new Array();
	var postAssignToArray = new Array();
	
    for ( var i=0; i < postcategory.length; i++ ) {  
        if ( postcategory[i].selected ) {  
            postCatergoryArray[postCatergoryArray.length] = postcategory[i].value;  
        }  
    }

    for ( var i=0; i < posttags.length; i++ ) {  
        if ( posttags[i].selected ) {  
            postTagsArray[postTagsArray.length] = posttags[i].value;  
        }  
    }
    
	 for ( var i=0; i < poststatus.length; i++ ) {  
		if ( poststatus[i].selected ) {
			postStatusArray[postStatusArray.length] = poststatus[i].value;
		}
	}

	 for ( var i=0; i < postpriority.length; i++ ) {  
		if ( postpriority[i].selected ) {
			postPriorityArray[postPriorityArray.length] = postpriority[i].value;
		}
	}
	
	 for ( var i=0; i < pmassignto.length; i++ ) {  
		if ( postassignto[i].selected ) {
			postAssignToArray[postAssignToArray.length] = postassignto[i].value;
		}
	}
    		
	jQuery.ajax({

		type : 'POST',
		url : pmajax.ajaxurl,
		data : {
			action		: 'pm_addpost',
			pmtitle		: posttitle,
			pmcontents	: postcontent,
			pmcategory	: postCatergoryArray,
			pmtags		: postTagsArray,
			pmstatus	: postStatusArray,
			pmpriority	: postPriorityArray,
			pmassignto	: postAssignToArray
		},
		success : function(data, textStatus, XMLHttpRequest) {
			var id = '#pm-response';
			jQuery(id).html('');
			jQuery(id).append(data);

			resetvalues();
		},
		error : function(MLHttpRequest, textStatus, errorThrown) {
			alert(errorThrown);
		}
	});
}

function pmassignuser(postassignto) {
	"use strict";

	var postAssignToArray = new Array();
	
	 for ( var i=0; i < pmassignto.length; i++ ) {  
		if ( postassignto[i].selected ) {
			postAssignToArray[postAssignToArray.length] = postassignto[i].value;
		}
	}
    		
	jQuery.ajax({

		type : 'POST',
		url : pmajax.ajaxurl,
		data : {
			action		: 'pm_addpost',
			pmassignto	: postAssignToArray
		},
		success : function(data, textStatus, XMLHttpRequest) {
			var id = '#pm-response';
			jQuery(id).html('');
			jQuery(id).append(data);
		},
		error : function(MLHttpRequest, textStatus, errorThrown) {
			alert(errorThrown);
		}
	});
}


function resetvalues() {
	"use strict";

	var title			=	document.getElementById("pmtitle"),
		content			=	document.getElementById("pmcontents");
		
	title.value			= '';
	content.value		= '';
	jQuery('#pmcategorycheck').prop('selectedIndex',0);
	jQuery('#pmstatuscheck').prop('selectedIndex',0);
	jQuery('#pmpritoritycheck').prop('selectedIndex',0);
	jQuery('#pmassigntocheck').prop('selectedIndex',0);
	jQuery('#pmtagscheck').prop('selectedIndex',0);	
}