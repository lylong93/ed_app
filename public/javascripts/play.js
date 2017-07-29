var player = videojs('player');
var p = document.getElementById('p');
var id = p.innerHTML;
player.one('play', function() {
  $.ajax({
    url: '/ajax/que/' + id,
    type: 'post',
    dataType: 'json',
    success: function(data) {
      var ddd = data;
      var ques = ddd.ques;
      var time = ddd.time;
      var i = 0;
      player.on('timeupdate', function() {
        if (this.currentTime() >= time[i] && this.currentTime() <= time[i] + 0.5) {
          console.log(ques[i]);
          var q = ques[i];
          alt(q);
          i++;
        }
      })
    },
    error: function() {
      console.log('err')
    }
  })
});

function alt(q) {
  player.pause();
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
  $('#div1').append("<div class='input2'type='text'></div>")
  $('.input2').css({
    'border': '1px solid black',
    'margin': '20px 9px 10px 9px',
    'height': '30px',
    'line-height': '30px',
    'font-size': '20px',
    'background': 'rgb(69, 145, 15)',
    'color': 'red',
  }).html(q);

  $('#div1').append("<input id='input1'type='text'></input>");
  $('#input1').css({
    'width': '90%',
    'position': 'relative',
    'left': '5px',
    'top': '10px',
    'padding': '10px'
  });

  $('#div1').append("<button id='button1'>确定</button>");
  $('#button1').css({
    'width': '80%',
    'height': '35px',
    'position': 'absolute',
    'left': '25px',
    'bottom': '10px',
  });

  $('#button1').on('click', function() {
    $('#finish').css({
      'display': 'block',
    })
    var answtext = $(input1).val();
    var quetext = q;
    var time = $("<input></input>").attr({
      'name': 'time',
    }).css({}).val(quetext);
    $('#anwsform').append(time);

    var ques = $("<input></input>").attr({
      'name': 'anws',
    }).css({
      'background': 'rgb(167, 197, 218)',
      'padding': '6px',
      'width': '90%',
      'margin': '5px 0'
    }).val(answtext);
    console.log($('#anwsform'))
    $('#anwsform').append(ques);
    $(div1).remove();
    player.play();
  })
}
