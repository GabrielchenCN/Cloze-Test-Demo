//模拟服务器获取的数据
var dataModel = {
	paragraph_1 : "It's the first question parents ask when their child is diagnosed with autism (自闭症). Will his future brothers or sisters have a higher risk of 1 ",
	paragraph_2 :" it, too? According to the largest study of siblings (兄弟姐妹) in families with autism, the answer is yes. Among 664 children who had at least one older sibling with the developmental disorder, the 2" ,
	paragraph_3 : "risk of autism was nearly 19%, 3",
	paragraph_4 : "higher than previous sibling-recurrence estimates that were anywhere from 3% to 10%. Kids with more than one older autistic sibling had an even higher risk of the disorder: 32%. The 4 ",
	paragraph_5 : "suggest that genes play a key role in autism risk. But they also hint that other environmental factors 5 ",
	paragraph_6 : " by siblings, like influences in the womb (子宫), may be important as well. On the 6 ",
	paragraph_7 : " of the findings, the researchers recommend that doctors closely 7",
	paragraph_8 :" younger siblings of autistic children to pick up any early signs of the disorder, 8  ",
	paragraph_9 : "an unusually large head or delayed language development and communication skills. Evidence suggests that early 9",
	paragraph_10 : "and diagnosis of autism can help children take advantage of therapies that can treat some of its 10",
	paragraph_11 :""
};

var answerModel = [
'developing',
'average',
'dramatically',
'results',
'shared',
'basis',
'monitor',
'including',
'detection',
'symptoms'
]
// 1. developing
// 2. average
// 3. dramatically
// 4. results
// 5. shared
// 6. basis
// 7. monitor
// 8. including
// 9. detection
// 10. symptoms

var optionsModel =[
'common',
'results',
'consequently',
'basis',
'detection',
'monitor',
'symbols',
'average',
'dramatically',
'symptoms',
'reason',
'distributed',
'including',
'developing',
'shared'
]

optionsModel.sort(function(a,b){return Math.random()>0.5 ? -1 : 1;});

var analysisModel = 
[
'第1题的文字解析 developing\n',
'第2题的文字解析 average',
'第3题的文字解析 dramatically',
'第4题的文字解析 results',
'第5题的文字解析 shared',
'第6题的文字解析 basis',
'第7题的文字解析 monitor',
'第8题的文字解析 including',
'第9题的文字解析 detection',
'第10题的文字解析 symptoms'

];




//初始化各项数据
$(document).ready(function() { 
	for(var i = 0 ; i < 10 ; i ++){
		$('.app-input-answer:eq('+i+')').val(answerModel[i]);
	}
	
}); 


//input按钮绑定事件
$(".app-input,.app-index").on("click",function(){
	//this.val(dataHover);
	var id = this.id - 1;
	var currVal =$(".app-input:eq("+id+")").val();
	if (currVal!=='') {
		var currOpt = $(".app-options table td");
		for(var i = 0 ; i < currOpt.length;i++){
			if ($(".app-options table td:eq("+i+")").html()==currVal) {
				$(".app-options table td:eq("+i+")").removeClass('app-del');
			};

		}
		
	};

// firefox focus bug
	setTimeout(function () {$(".app-input:eq("+id+")").focus(); }, 10);
	$(".app-triangle").removeClass('app-triangle-activate');
	$(".app-screen").addClass('hide');
	$(".app-triangle").addClass('hide');
	
	$(".app-triangle:eq("+id+")").removeClass('hide').addClass('app-triangle-activate');

	//同步解析
	$(".app-analysis").html(analysisModel[id])
});

//hover更新
$(".app-options table td").hover(function(){
$('.app-content input:focus').val($(this).html());
//$('.app-content input:focus').css("color","rgb(111,211,241)")
},function(){
$('.app-content input:focus').val('');
});
//click选中
$(".app-options table td").on("click",function(){
	$(this).addClass('app-del');
	$(".app-screen").removeClass('hide');
	$("div .app-triangle-activate").parent().children('.app-index').addClass('app-index-checked');
    $("div .app-triangle-activate").removeClass('app-triangle-activate');
})

//交卷
//比较input值和model值，并同时设置模态框里面的style和值
//查解析

$('#submit').on('click',function(){
	var perc = 100;
	for(var i = 0 ; i <10 ; i ++){
		if ($('.app-input:eq('+i+')').val()=='') {
			$('.app-input:eq('+i+')').addClass('app-input-wrong').val('  ');
			$('.app-input-answer:eq('+i+')').removeClass('hide');
			//model
			$('.app-answers:eq('+i+')').addClass('app-wrong');
			//number
			$('.app-index:eq('+i+')').addClass('app-index-checked-wrong');
			
			perc=perc -10;
		}else if ($('.app-input:eq('+i+')').val()!=answerModel[i]) {
			$('.app-input:eq('+i+')').addClass('app-input-wrong');
			$('.app-input-answer:eq('+i+')').removeClass('hide');
			//model
			$('.app-answers:eq('+i+')').addClass('app-wrong');
			//number
			$('.app-index:eq('+i+')').addClass('app-index-checked-wrong');
			perc=perc -10;
		}else {
			//model
			//number
			$('.app-index:eq('+i+')').addClass('app-index-checked-right');
			$('.app-answers:eq('+i+')').addClass('app-right');
			continue;
		}
		
	}
	
	//隐藏选项和screen，显示答案，动态绑定解析model,改变文章style
	$('.app-content').addClass('app-content-answer');
	$('.app-options').addClass('hide');
	$('.app-analysis').removeClass('hide');
		//model
	$('.app-correctPercentage').html(perc+'%');

})

//数据绑定
var vm = new Vue({
  // 选项
  el: '.app-content',
  data: {
    paragraph_1: dataModel.paragraph_1,
    paragraph_2: dataModel.paragraph_2,
    paragraph_3: dataModel.paragraph_3,
    paragraph_4: dataModel.paragraph_4,
    paragraph_5: dataModel.paragraph_5,
    paragraph_6: dataModel.paragraph_6,
    paragraph_7: dataModel.paragraph_7,
    paragraph_8: dataModel.paragraph_8,
    paragraph_9: dataModel.paragraph_9,
    paragraph_10: dataModel.paragraph_10,
    paragraph_11: dataModel.paragraph_11

  }
});

var vmB = new Vue({
  // 选项
  el: '.table',
  data: {
    answer_1: optionsModel[0],
    answer_2: optionsModel[1],
    answer_3: optionsModel[2],
    answer_4: optionsModel[3],
    answer_5: optionsModel[4],
    answer_6: optionsModel[5],
    answer_7: optionsModel[6],
    answer_8: optionsModel[7],
    answer_9: optionsModel[8],
    answer_10: optionsModel[9],
    answer_11: optionsModel[10],
    answer_12: optionsModel[11],
    answer_13: optionsModel[12],
    answer_14: optionsModel[13],
    answer_15: optionsModel[14]
  }
});

var vmA = new Vue({
  // 选项
  el: '.app-content',
  data: {
    a1: answerModel[0]
    
  }
});