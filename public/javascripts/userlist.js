$(function() {
  $('.show').on('click', function() {
    var name = $(this).siblings(1).text();
    var id = $('#id').text();
    anws(id, name);
  })
})

var answId = 1;

function anws(id, name) {
  $.ajax({
    url: '/ajax/anws/' + id,
    type: 'post',
    dataType: 'json',
    success: function(data) {
      console.log('ok')
      data.forEach(function(value, index) {
        if (value.user.name === name) {
          // console.log(value.result);
          var result = value.result;
          var answ = value.answer;
          answId = value._id;
          alt(answ, result);
        }
      })
    },
    error: function() {
      console.log('err');
    }
  })
}

function alt(anws, result) {
  var result = result;
  var anws = anws;
  $(document.body).append("<div id='bg'></div>");
  $('#bg').css({
    'position': 'fixed',
    'top': '0',
    'left': '0',
    'width': '100%',
    'height': '100%',
    'background-color': 'rgba(201, 230, 218,.3)',
  })
  $(document.body).append("<div id='div1'></div>");
  $('#div1').css({
    'position': 'absolute',
    'width': '390px',
    'height': '500px',
    'top': '15%',
    'left': '40%',
    'background-color': 'rgba(53, 98, 150, 0.92)',
    'z-index': '99'
  });

  anws.forEach(function(value, index) {
    $('#div1').append("<div class='d" + index + "'></div>")
    $('.d' + index).css({
      'display': 'block',
      'margin': '20px',
      'font-size': '24px',
      'border': '1px solid red',
    }).append(value);
  });
  $('#div1').append("<input id='go' type='text'></input>");
  if (result != -1) {
    $('#div1').append('<span>你的分数为' + result + '</span>');
  }
  $('#div1').append("<button id='button1'>确定评分</button>");
  $('#button1').css({
    'width': '100px',
    'height': '35px',
    'position': 'absolute',
    'left': '20px',
    'bottom': '30px',
  });
  $('#div1').append("<button id='button2'>取消</button>");
  $('#button2').css({
    'width': '100px',
    'height': '35px',
    'position': 'absolute',
    'right': '20px',
    'bottom': '30px',
  });
  $('#button1').on('click', function() {
    var pinfeng = $('#go').val();
    console.log(pinfeng);
    $("#div1").remove();
    $('#bg').remove();
    console.log(answId);
    pingfeng(answId, pinfeng)
  })
  $('#button2').on('click', function() {
    $("#div1").fadeOut("slow", function() {
      $("#div1").remove();
    });
    $('#bg').fadeOut("slow", function() {
      $('#bg').remove();
    });
  })
}

function pingfeng(answId, pinfeng) {
  var data = {};
  data.pinfeng = pinfeng;
  $.ajax({
    url: '/ajax/pinfeng/' + answId,
    type: 'post',
    data: data,
    dataType: 'json',
    success: function(data) {
      console.log(data)
    },
    error: function() {
      console.log('err');
    }
  })
}
