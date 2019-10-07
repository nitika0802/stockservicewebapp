$(document).ready(function(){
  var url = "http://localhost:8080/api/stocks";
  
  $.get(url, function(data, status){
	  var stocklist=data.stockList;
		if(status=='success'){
			for (i = 0; i < stocklist.length; i++) {
					var id = stocklist[i].id;
					var name = stocklist[i].name;
					var price = stocklist[i].currentPrice;
					$(".data-table tbody").append("<tr data-id='"+id+"' data-name='"+name+"' data-price='"+price+"'><td>"+id+"</td><td>"+name+"</td><td>"+price+"</td><td><button class='btn btn-info btn-xs btn-edit'>Edit</button></td></tr>");
			}
		}
  });
  
	$("form").submit(function(e){
        e.preventDefault();
        var name = $("input[name='name']").val();
        var price = $("input[name='price']").val();
	    var requestData = { name : name,currentPrice:price};
		$.ajax({
			  type: 'POST',
			  url: url,
			  data: JSON.stringify(requestData),
			  dataType : "json",
			  contentType: "application/json; charset=utf-8",
		});
		
		window.location.reload();
    });
    
    $("body").on("click", ".btn-edit", function(){
        var price = $(this).parents("tr").attr('data-price');
    
        $(this).parents("tr").find("td:eq(2)").html('<input name="edit_price" value="'+price+'">');
    
        $(this).parents("tr").find("td:eq(3)").prepend("<button class='btn btn-info btn-xs btn-update'>Update</button><button class='btn btn-warning btn-xs btn-cancel'>Cancel</button>")
        $(this).hide();
    });
   
    $("body").on("click", ".btn-cancel", function(){
        var price = $(this).parents("tr").attr('data-price');
    
        $(this).parents("tr").find("td:eq(2)").text(price);
   
        $(this).parents("tr").find(".btn-edit").show();
        $(this).parents("tr").find(".btn-update").remove();
        $(this).parents("tr").find(".btn-cancel").remove();
    });
   
    $("body").on("click", ".btn-update", function(){
		var id = $(this).parents("tr").attr('data-id');
        var price = $(this).parents("tr").find("input[name='edit_price']").val();
		var requestData = {currentPrice:price};
		$.ajax({
			  type: 'PUT',
			  url: url+"/"+id,
			  data: JSON.stringify(requestData),
			  dataType : "json",
			  contentType: "application/json; charset=utf-8"
		});	
		window.location.reload();
    });
	
	$("body").on("click", ".btn-find", function(){
		   var id = $("input[name='id']").val();
		   if(id){
		   $.get(url+"/"+id, function(data, status){
			   if(data){
							var id = data.id;
							var name = data.name;
							var price = data.currentPrice;
							$("table > tbody").empty();
							$(".data-table tbody").append("<tr data-id='"+id+"' data-name='"+name+"' data-price='"+price+"'><td>"+id+"</td><td>"+name+"</td><td>"+price+"</td><td><button class='btn btn-info btn-xs btn-edit'>Edit</button></td></tr>");
			   }else{
					window.location.reload();
			   }
		  });
		   }else{
			   window.location.reload();
		   }
    });
    
});
