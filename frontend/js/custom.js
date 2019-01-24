function addClassDelayed(jqObj, c, to) {    
    setTimeout(function() { jqObj.addClass(c); }, to);
}

function anim() { 
  addClassDelayed($("#countdown"), "puffer", 600);
  if (currentNum == 0) currentNum = startNum-1; else currentNum--;
  $('#countdown').html(currentNum+1);
  $('#countdown').removeClass("puffer");
}