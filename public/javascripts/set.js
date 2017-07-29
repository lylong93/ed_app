 // window.onload = function() {
 //   console.log('ok')
 // }
 var play = videojs('player', {
   width: "600px"
 })
 var count = 0;
 var time = {};
 var pause = play.pause();
 var add = document.getElementById('adq');
 var queform = document.getElementById('queform')
 add.addEventListener('click', function() {
   if (count >= 5) {
     alert('问题太多')
     return;
   }
   alt();
 })

 function alt() {
   play.pause();
   $(document.body).append("<div id='div1'></div>");
   $('#div1').css({
     'position': 'absolute',
     'width': '390px',
     'height': '180px',
     'top': '30%',
     'left': '40%',
     'background-color': 'rgba(53, 98, 150, 0.92)',
     'z-index': '99'
   })
   $('#div1').append("<input id='input1'type='text'></input>");
   $('#input1').css({
     'width': '80%',
     'position': 'relative',
     'left': '20px',
     'top': '30px',
     'padding': '10px'
   });

   $('#div1').append("<button id='button1'>确定</button>");
   $('#button1').css({
     'width': '100px',
     'height': '35px',
     'position': 'absolute',
     'left': '20px',
     'bottom': '30px',
   });

   $('#button1').on('click', function() {
     $('#finish').css({
       'display': 'block',
     })
     count++;
     var quetext = $(input1).val();
     var quetime = Math.floor(play.currentTime());
     var ques = $("<input></input>").attr({
       'name': 'ques',
     }).css({
       'background': 'rgb(167, 197, 218)',
       'padding': '6px',
       'width': '90%',
       'margin': '5px 0'
     }).val(quetext);
     $('#queform').append(ques);

     var time = $("<input></input>").attr({
       'name': 'time',
     }).css({
       'display': 'none',
     }).val(quetime);
     $('#queform').append(time);

     $(div1).remove();
     play.play();
     console.log(time.val());

   })
 }

 // var ajaxDiv = document.getElementById('ajax');
 // ajaxDiv.addEventListener('click', function() {
 //   $.ajax({
 //     url: '/ajax',
 //     type: 'post',
 //     data: time,
 //     timeout: 3000,
 //     dataType: "json",
 //     success: function() {
 //       console.log('ajax is ok')
 //     },
 //     error: function(XMLHttpRequest, textStatus, errorThrown) {
 //       console.log('err')
 //       console.log(XMLHttpRequest);
 //       console.log(textStatus);
 //       console.log(errorThrown);
 //
 //     }
 //   })
 // })
